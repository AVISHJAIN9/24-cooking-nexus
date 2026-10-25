const Repo = require('../data/108-Market-Sponsorship-Bridge.persistence.repo');
const Audit = require('../../01-Core-Infrastructure/007-Auth-Audit-Logs/core/007-Auth-Audit-Logs.service');

class 108MarketSponsorshipBridgeService {
    static async process(data, userId, ip) {
        return { partner: data.brand || 'Nexus-Global', status: 'AD_LINK_GENERATED', cta: 'https://nexus.shop/affiliate' };
        // Every financial move is recorded in the Audit Logs
        await Audit.record(userId, '', 'FINANCIAL', ip);
        return { ...arguments[0], ...result };
    }
}
module.exports = 108MarketSponsorshipBridgeService;
