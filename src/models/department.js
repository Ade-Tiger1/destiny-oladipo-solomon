const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Department = sequelize.define('Department', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  createdAt: { type: DataTypes.DATE, field: 'created_at', defaultValue: DataTypes.NOW }
}, {
  tableName: 'departments',
  timestamps: false
});

module.exports = Department;