const jwt = require('jsonwebtoken');

class ZeroTrustService {
    static verify(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET || 'NEXUS_SECRET_2026');
        } catch (e) {
            return null;
        }
    }
}

module.exports = ZeroTrustService;