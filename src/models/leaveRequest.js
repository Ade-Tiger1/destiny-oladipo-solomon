const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Employee = require('./employee');

const LeaveRequest = sequelize.define('LeaveRequest', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  employeeId: { type: DataTypes.INTEGER, allowNull: false, field: 'employee_id' },
  startDate: { type: DataTypes.DATEONLY, allowNull: false, field: 'start_date' },
  endDate: { type: DataTypes.DATEONLY, allowNull: false, field: 'end_date' },
  status: { type: DataTypes.ENUM('PENDING','APPROVED','REJECTED','PENDING_APPROVAL'), allowNull: false, defaultValue: 'PENDING' },
  createdAt: { type: DataTypes.DATE, field: 'created_at', defaultValue: DataTypes.NOW }
}, {
  tableName: 'leave_requests',
  timestamps: false
});

LeaveRequest.belongsTo(Employee, { foreignKey: 'employeeId', as: 'employee' });
Employee.hasMany(LeaveRequest, { foreignKey: 'employeeId', as: 'leaveRequests' });

module.exports = LeaveRequest;
