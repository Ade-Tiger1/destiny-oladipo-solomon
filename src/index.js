require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');
const producer = require('./queues/producer');

const PORT = process.env.PORT || 3000;

async function boot() {
  try {
    await sequelize.authenticate();
    console.log('DB connected');
  } catch (err) {
    console.error('Failed to connect to DB:', err.message);
    process.exit(1);
  }

  // Ensure producer connects early (optional)
  try {
    await producer.connect();
    console.log('RabbitMQ producer connected');
  } catch (err) {
    console.warn('RabbitMQ not available (producer) — start it when ready', err.message);
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

boot();