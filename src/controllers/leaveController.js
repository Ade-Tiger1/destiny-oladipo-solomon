const leaveService = require('../services/leaveService');
const producer = require('../queues/producer');

class LeaveController {
  async create(req, res) {
    try {
      const { employeeId, startDate, endDate } = req.body;
      const leave = await leaveService.createLeave({ employeeId, startDate, endDate });

      // publish to queue
      const msgId = await producer.publishLeaveRequested({
        leaveRequestId: leave.id
      });

      return res.ok({ leave, messageId: msgId });
    } catch (err) {
      return res.error(err.message, 400);
    }
  }
}

module.exports = new LeaveController();