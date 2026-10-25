const ChatModel = require('./048-Nexus-AI-Chat-Interface.schema');

class ChatRepo {
    static async saveMessage(userId, role, content) {
        return await ChatModel.create({ userId, role, content });
    }
    static async fetchUserLogs(userId) {
        return await ChatModel.find({ userId }).sort({ createdAt: 1 });
    }
}
module.exports = ChatRepo;