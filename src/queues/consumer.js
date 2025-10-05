const amqp = require('amqplib');
const leaveService = require('../services/leaveService');
const { getRetryQueues } = require('../utils/retryStrategy');

const EXCHANGE = 'leave.exchange';
const EXCHANGE_RETRY = 'leave.retry.exchange';
const DLX = 'leave.dead';
const QUEUE = 'leave.requested';
const RETRY_QUEUE_BASE = 'leave.requested.retry';

async function createChannelAndQueues(url) {
  const conn = await amqp.connect(url);
  const ch = await conn.createChannel();

  await ch.assertExchange(EXCHANGE, 'direct', { durable: true });
  await ch.assertExchange(EXCHANGE_RETRY, 'direct', { durable: true });
  await ch.assertExchange(DLX, 'direct', { durable: true });

  await ch.assertQueue(QUEUE, { durable: true, deadLetterExchange: DLX });
  await ch.bindQueue(QUEUE, EXCHANGE, 'leave.requested');

  await ch.assertQueue('leave.dead.queue', { durable: true });
  await ch.bindQueue('leave.dead.queue', DLX, 'dead');

  // create retry queues with TTLs
  const ttls = getRetryQueues();
  for (let i = 0; i < ttls.length; i++) {
    const ttl = ttls[i];
    const qName = `${RETRY_QUEUE_BASE}.${i}`;
    await ch.assertQueue(qName, {
      durable: true,
      deadLetterExchange: EXCHANGE,
      messageTtl: ttl
    });
    await ch.bindQueue(qName, EXCHANGE_RETRY, `${i}`);
  }

  return ch;
}

function parseMsg(msg) {
  try { return JSON.parse(msg.content.toString()); } catch (e) { return null; }
}

async function handleMessage(ch, msg) {
  const body = parseMsg(msg);
  if (!body) { ch.ack(msg); return; }

  const { messageId, leaveRequestId } = body;
  try {
    await leaveService.processLeaveMessage({ messageId, leaveRequestId });
    ch.ack(msg);
  } catch (err) {
    // Retry logic: use header x-attempts
    const headers = msg.properties.headers || {};
    const attempts = (headers['x-attempts'] || 0) + 1;
    const retryLimit = getRetryQueues().length;

    if (attempts > retryLimit) {
      console.error('Exceeded retries; sending to DLQ', err);
      ch.reject(msg, false); // reject without requeue -> goes to DLX
    } else {
      // publish to corresponding retry queue via retry exchange
      const routingKey = String(attempts - 1);
      const newHeaders = { ...headers, 'x-attempts': attempts };
      ch.publish(EXCHANGE_RETRY, routingKey, msg.content, { headers: newHeaders, persistent: true });
      ch.ack(msg);
    }
  }
}

async function start() {
  const url = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';
  const ch = await createChannelAndQueues(url);
  console.log('Consumer connected and awaiting messages...');
  await ch.consume(QUEUE, (msg) => handleMessage(ch, msg), { noAck: false });
}

if (require.main === module) {
  start().catch(err => { console.error(err); process.exit(1); });
}

module.exports = { start };