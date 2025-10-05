const sequelize = require('../config/db');
const leaveRepo = require('../repositories/leaveRepository');
const processedRepo = require('../repositories/processedMessageRepository');
const { Op } = require('sequelize');

class LeaveService {
  async createLeave({ employeeId, startDate, endDate }) {
    const leave = await leaveRepo.create({ employeeId, startDate, endDate, status: 'PENDING' });
    return leave;
  }

  daysBetween(startDate, endDate) {
    const s = new Date(startDate);
    const e = new Date(endDate);
    // inclusive days
    const diff = Math.floor((e - s) / (24 * 3600 * 1000)) + 1;
    return diff;
  }

  shouldAutoApprove(startDate, endDate) {
    return this.daysBetween(startDate, endDate) <= 2;
  }

  async processLeaveMessage({ messageId, leaveRequestId }) {
    // Idempotency check
    const existing = await processedRepo.findByMessageIdAndType(messageId, 'leave.requested');
    if (existing) return { status: 'ALREADY_PROCESSED' };

    return sequelize.transaction(async (tx) => {
      const leave = await leaveRepo.findById(leaveRequestId);
      if (!leave) {
        await processedRepo.save(messageId, 'leave.requested', { error: 'leave_not_found' }, tx);
        return { status: 'LEAVE_NOT_FOUND' };
      }

      const days = this.daysBetween(leave.startDate, leave.endDate);
      const decision = days <= 2 ? 'APPROVED' : 'PENDING_APPROVAL';

      await leaveRepo.updateStatus(leave.id, decision, tx);
      await processedRepo.save(messageId, 'leave.requested', { decision, days }, tx);

      return { status: 'PROCESSED', decision, days };
    });
  }
}

module.exports = new LeaveService();