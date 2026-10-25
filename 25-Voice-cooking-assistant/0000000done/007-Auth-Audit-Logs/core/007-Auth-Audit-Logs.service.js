const Repo = require('../data/007-Auth-Audit-Logs.persistence.repo');

class AuditService {
    static async record(userId, action, severity, ip, meta = {}) {
        try {
            return await Repo.createEntry({ userId, action, severity, ipAddress: ip, details: meta });
        } catch (err) {
            console.error("AUDIT_LOG_FAIL", err);
        }
    }
}
module.exports = AuditService;