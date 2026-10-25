const Model = require('./108-Market-Sponsorship-Bridge.schema');
class 108MarketSponsorshipBridgeRepo {
    static async logTransaction(data) { return await Model.create(data); }
    static async getBalance(id) { return await Model.findOne({ userId: id }); }
}
module.exports = 108MarketSponsorshipBridgeRepo;
