const Model = require('./110-Market-Chef-Earning-Nexus.schema');
class 110MarketChefEarningNexusRepo {
    static async logTransaction(data) { return await Model.create(data); }
    static async getBalance(id) { return await Model.findOne({ userId: id }); }
}
module.exports = 110MarketChefEarningNexusRepo;
