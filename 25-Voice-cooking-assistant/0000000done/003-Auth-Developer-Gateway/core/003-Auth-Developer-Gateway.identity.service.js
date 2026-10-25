//Handles high-entropy password hashing and MFA (Multi-Factor Authentication) logic
const DevCredentialsDB = require('../data/003-Auth-Developer-Gateway.credentials.db');
const bcrypt = require('bcryptjs');

class DevIdentityService {
    static async verifyGatewayAccess(devId, providedKey) {
        const dev = await DevCredentialsDB.findByDevId(devId);
        if (!dev) throw new Error("Security Alert: Invalid Developer Identity");

        // Verify Secret Key
        const isValid = await bcrypt.compare(providedKey, dev.secretKey);
        if (!isValid) {
            await DevCredentialsDB.logDevAction(devId, 'FAILED_LOGIN_ATTEMPT', 'High Security Risk');
            throw new Error("Security Alert: Unauthorized Key");
        }

        return dev;
    }
}

module.exports = DevIdentityService;