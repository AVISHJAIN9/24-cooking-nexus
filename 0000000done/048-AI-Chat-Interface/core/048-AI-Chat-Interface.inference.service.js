const Repo = require('../data/048-Nexus-AI-Chat-Interface.persistence.repo');
const personality = require('../data/048-Nexus-AI-Chat-Interface.nexus.data');

class ChatService {
    static async processMessage(userId, text) {
        // Save User Message
        await Repo.saveMessage(userId, 'user', text);

        // MOCK AI RESPONSE (Replace with Gemini API later)
        const reply = `${personality.CHEF_NAME}: I received "${text}". I'm analyzing your kitchen inventory now!`;

        // Save AI Response
        return await Repo.saveMessage(userId, 'assistant', reply);
    }
}

module.exports = ChatService;