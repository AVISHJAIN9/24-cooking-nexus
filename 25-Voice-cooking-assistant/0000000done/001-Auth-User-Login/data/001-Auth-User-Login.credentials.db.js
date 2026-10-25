const User = require('./001-Auth-User-Login.schema');

/**
 * Project Nexus: Phase 2 Security & Identity
 * Logic: Secure Data Access Layer (DAL) for User Credentials
 */
class UserCredentialsDB {
    /**
     * Finds a user by email for the login flow.
     * Includes sensitive fields like password for verification.
     */
    static async findByEmail(email) {
        // We explicitly select '+password' because the schema masks it by default
        return await User.findOne({ email: email.toLowerCase() }).select('+password');
    }

    /**
     * Find by Nexus ID Slug.
     * Prevents exposing internal Mongo IDs to the frontend.
     */
    static async findByNexusId(nexusId) {
        return await User.findOne({ nexusId });
    }

    /**
     * Brute Force Detection: Increment failed attempts.
     * Industrial logic to track and eventually lockout suspicious IPs[cite: 57].
     */
    static async recordFailedAttempt(userId) {
        return await User.findByIdAndUpdate(userId, {
            $inc: { 'securityMetadata.failedAttempts': 1 },
            $push: { 
                'securityMetadata.auditTrail': { 
                    action: 'FAILED_LOGIN_ATTEMPT', 
                    timestamp: new Date() 
                } 
            }
        });
    }

    /**
     * Device-Aware Login: Update last login metadata[cite: 48].
     */
    static async updateLoginMetadata(userId, ip, fingerprint) {
        return await User.findByIdAndUpdate(userId, {
            'securityMetadata.lastLoginIP': ip,
            'securityMetadata.deviceFingerprint': fingerprint,
            'securityMetadata.failedAttempts': 0, // Reset on success
            $push: { 
                'securityMetadata.auditTrail': { 
                    action: 'SUCCESSFUL_LOGIN', 
                    timestamp: new Date() 
                } 
            }
        });
    }
}

module.exports = UserCredentialsDB;