const Compliance = require('../data/119-Nexus-Compliance-GDPR.schema');

/**
 * Project Nexus: Feature 119 Controller
 */
exports.checkMemberStatus = async (req, res) => {
    try {
        const status = await Compliance.findOne({ userId: req.params.userId });
        
        if (!status || !status.hasAcceptedTerms) {
            return res.status(200).json({ 
                compliant: false, 
                message: "Member must accept the Nexus Privacy Policy to proceed." 
            });
        }

        res.status(200).json({ compliant: true });
    } catch (error) {
        res.status(500).json({ error: "COMPLIANCE_CHECK_FAILED" });
    }
};