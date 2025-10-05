const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Department = require('./department');

const Employee = sequelize.define('Employee', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  departmentId: { type: DataTypes.INTEGER, field: 'department_id', allowNull: true },
  createdAt: { type: DataTypes.DATE, field: 'created_at', defaultValue: DataTypes.NOW }
}, {
  tableName: 'employees',
  timestamps: false
});

Employee.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' });
Department.hasMany(Employee, { foreignKey: 'departmentId', as: 'employees' });

module.exports = Employee;