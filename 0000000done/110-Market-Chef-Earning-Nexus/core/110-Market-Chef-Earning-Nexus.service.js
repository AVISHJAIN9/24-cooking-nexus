const Repo = require('../data/110-Market-Chef-Earning-Nexus.persistence.repo');
const Audit = require('../../01-Core-Infrastructure/007-Auth-Audit-Logs/core/007-Auth-Audit-Logs.service');

class 110MarketChefEarningNexusService {
    static async process(data, userId, ip) {
        const commission = (data.gross || 0) * 0.2; return { netEarning: (data.gross || 0) - commission, platformFee: commission, currency: 'NEXUS_TOKEN' };
        // Every financial move is recorded in the Audit Logs
        await Audit.record(userId, '', 'FINANCIAL', ip);
        return { ...arguments[0], ...result };
    }
}
module.exports = 110MarketChefEarningNexusService;
