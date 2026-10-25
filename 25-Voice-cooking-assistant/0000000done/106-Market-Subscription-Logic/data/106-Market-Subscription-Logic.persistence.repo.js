const Model = require('./106-Market-Subscription-Logic.schema');
class 106MarketSubscriptionLogicRepo {
    static async logTransaction(data) { return await Model.create(data); }
    static async getBalance(id) { return await Model.findOne({ userId: id }); }
}
module.exports = 106MarketSubscriptionLogicRepo;
