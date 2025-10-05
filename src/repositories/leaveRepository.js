const { LeaveRequest } = require('../models');

class LeaveRepository {
  async create(data, tx) {
    return LeaveRequest.create(data, { transaction: tx });
  }
  async updateStatus(id, status, tx) {
    return LeaveRequest.update({ status }, { where: { id }, transaction: tx });
  }
  async findById(id) { return LeaveRequest.findByPk(id); }
}

module.exports = new LeaveRepository();