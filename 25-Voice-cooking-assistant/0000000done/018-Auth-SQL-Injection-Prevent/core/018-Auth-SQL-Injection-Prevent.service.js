const Repo = require('../data/018-Auth-SQL-Injection-Prevent.persistence.repo');
const Audit = require('../../007-Auth-Audit-Logs/core/007-Auth-Audit-Logs.service');

class 018AuthSQLInjectionPreventService {
    static async execute(data, user, ip) {
        const clean = JSON.stringify(data).replace(/[<>$]/g, ''); return { sanitized: JSON.parse(clean) };
    }
}
module.exports = 018AuthSQLInjectionPreventService;
