const TimerModel = require('./071-Kitchen-Timer-Engine.schema');

class TimerDB {
    static async saveActiveTimer(userId, recipeId, endTime) {
        return await TimerModel.findOneAndUpdate(
            { userId, recipeId },
            { endTime, status: 'RUNNING' },
            { upsert: true, new: true }
        );
    }
}

module.exports = TimerDB;