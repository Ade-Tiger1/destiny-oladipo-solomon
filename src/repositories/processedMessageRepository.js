const { ProcessedMessage } = require('../models');

class ProcessedMessageRepository {
  async findByMessageIdAndType(messageId, type) {
    return ProcessedMessage.findOne({ where: { messageId, type } });
  }
  async save(messageId, type, result = {}, tx) {
    // Will fail if duplicate (unique constraint), caller should handle
    return ProcessedMessage.create({ messageId, type, result }, { transaction: tx });
  }
}

module.exports = new ProcessedMessageRepository();