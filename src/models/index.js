const sequelize = require('../config/db');
const Department = require('./department');
const Employee = require('./employee');
const LeaveRequest = require('./leaveRequest');
const ProcessedMessage = require('./processedMessage');

module.exports = {
  sequelize,
  Department,
  Employee,
  LeaveRequest,
  ProcessedMessage
};