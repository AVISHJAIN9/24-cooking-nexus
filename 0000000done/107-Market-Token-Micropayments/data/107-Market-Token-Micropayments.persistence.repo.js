const Model = require('./107-Market-Token-Micropayments.schema');
class 107MarketTokenMicropaymentsRepo {
    static async logTransaction(data) { return await Model.create(data); }
    static async getBalance(id) { return await Model.findOne({ userId: id }); }
}
module.exports = 107MarketTokenMicropaymentsRepo;
