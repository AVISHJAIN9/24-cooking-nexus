const Compliance = require('../data/119-Nexus-Compliance-GDPR.schema');

class ComplianceService {
    static async recordConsent(userId, ip) {
        // Logic to update or create a legal record for the member
        return await Compliance.findOneAndUpdate(
            { userId },
            { hasAcceptedTerms: true, ipAddress: ip, consentTimestamp: new Date() },
            { upsert: true, new: true }
        );
    }
}

module.exports = ComplianceService;