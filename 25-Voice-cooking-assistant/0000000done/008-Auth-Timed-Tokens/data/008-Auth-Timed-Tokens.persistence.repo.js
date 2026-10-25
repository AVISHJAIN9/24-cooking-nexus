const Model = require('./008-Auth-Timed-Tokens.schema');

class TimedTokenRepo {
    static async findSession(userId, token) {
        return await Model.findOne({ userId, token });
    }
    static async updateExpiry(userId, token, newDate) {
        return await Model.findOneAndUpdate({ userId, token }, { expiresAt: newDate }, { new: true });
    }
    static async terminateSession(userId, token) {
        return await Model.deleteOne({ userId, token });
    }
}
module.exports = TimedTokenRepo;