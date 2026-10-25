const Repo = require('../data/106-Market-Subscription-Logic.persistence.repo');
const Audit = require('../../01-Core-Infrastructure/007-Auth-Audit-Logs/core/007-Auth-Audit-Logs.service');

class 106MarketSubscriptionLogicService {
    static async process(data, userId, ip) {
        const status = data.plan === 'PRO' ? 'ACTIVE' : 'FREE'; return { plan: data.plan, status, accessLevel: status === 'ACTIVE' ? 2 : 1 };
        // Every financial move is recorded in the Audit Logs
        await Audit.record(userId, '', 'FINANCIAL', ip);
        return { ...arguments[0], ...result };
    }
}
module.exports = 106MarketSubscriptionLogicService;
