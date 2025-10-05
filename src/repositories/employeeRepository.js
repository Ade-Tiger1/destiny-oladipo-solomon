const { Employee, LeaveRequest } = require('../models');

class EmployeeRepository {
  async create(data) { return Employee.create(data); }
  async findById(id) {
    return Employee.findByPk(id, {
      include: [{ model: LeaveRequest, as: 'leaveRequests', order: [['created_at','DESC']] }]
    });
  }
  async findByEmail(email) { return Employee.findOne({ where: { email } }); }
}

module.exports = new EmployeeRepository();