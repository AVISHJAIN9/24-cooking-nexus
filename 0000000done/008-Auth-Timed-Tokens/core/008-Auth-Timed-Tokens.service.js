const Repo = require('../data/008-Auth-Timed-Tokens.persistence.repo');
const Audit = require('../../007-Auth-Audit-Logs/core/007-Auth-Audit-Logs.service');

class TimedTokenService {
    static async validateSession(userId, token, ip) {
        const session = await Repo.findSession(userId, token);

        if (!session) return { valid: false, reason: 'SESSION_NOT_FOUND' };

        // Check if the current time has passed the 'expiresAt' timestamp
        if (new Date() > session.expiresAt) {
            await Repo.terminateSession(userId, token);
            await Audit.record(userId, 'SESSION_TIMEOUT_AUTO', 'INFO', ip);
            return { valid: false, reason: 'SESSION_EXPIRED' };
        }

        return { valid: true, session };
    }

    static async extendSession(userId, token, extraMinutes = 30) {
        const newExpiry = new Date(Date.now() + extraMinutes * 60000);
        return await Repo.updateExpiry(userId, token, newExpiry);
    }
}

module.exports = TimedTokenService;