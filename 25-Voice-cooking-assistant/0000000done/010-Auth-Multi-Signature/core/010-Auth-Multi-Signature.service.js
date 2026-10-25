const Repo = require('../data/010-Auth-Multi-Signature.persistence.repo');
const Audit = require('../../007-Auth-Audit-Logs/core/007-Auth-Audit-Logs.service');

class 010AuthMultiSignatureService {
    static async execute(data, user, ip) {
        return { status: 'AWAITING_SECOND_SIGNATURE', requestId: Math.random().toString(36).substring(7) };
    }
}
module.exports = 010AuthMultiSignatureService;
