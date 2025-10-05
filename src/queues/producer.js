const amqp = require('amqplib');
const { v4: uuidv4 } = require('uuid');
let channel = null;

async function connect() {
  if (channel) return channel;
  const url = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';
  const conn = await amqp.connect(url);
  channel = await conn.createChannel();
  return channel;
}

async function publishLeaveRequested(payload) {
  const ch = await connect();
  const exchange = 'leave.exchange';
  const routingKey = 'leave.requested';
  const messageId = uuidv4();
  await ch.assertExchange(exchange, 'direct', { durable: true });
  const msg = { messageId, ...payload };
  ch.publish(exchange, routingKey, Buffer.from(JSON.stringify(msg)), { persistent: true, messageId });
  return messageId;
}

module.exports = { publishLeaveRequested, connect };