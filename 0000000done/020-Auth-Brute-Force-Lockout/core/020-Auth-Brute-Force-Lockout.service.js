const Repo = require('../data/020-Auth-Brute-Force-Lockout.persistence.repo');
const Audit = require('../../007-Auth-Audit-Logs/core/007-Auth-Audit-Logs.service');

class 020AuthBruteForceLockoutService {
    static async execute(data, user, ip) {
        if(data.attempts > 5) return { locked: true, cooldown: '30m' }; return { locked: false };
    }
}
module.exports = 020AuthBruteForceLockoutService;
