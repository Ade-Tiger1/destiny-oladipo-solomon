const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ProcessedMessage = sequelize.define('ProcessedMessage', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  messageId: { type: DataTypes.STRING, allowNull: false, field: 'message_id' },
  type: { type: DataTypes.STRING, allowNull: false },
  processedAt: { type: DataTypes.DATE, field: 'processed_at', defaultValue: DataTypes.NOW },
  result: { type: DataTypes.JSON, allowNull: true }
}, {
  tableName: 'processed_messages',
  timestamps: false,
  indexes: [{ unique: true, fields: ['message_id', 'type'] }]
});


module.exports = ProcessedMessage;