//Orchestrates the secure login and generates "Super-Tokens" for admin access.
const DevIdentityService = require('./003-Auth-Developer-Gateway.identity.service');

const loginToGateway = async (req, res) => {
    try {
        const { devId, secretKey } = req.body;
        const dev = await DevIdentityService.verifyGatewayAccess(devId, secretKey);
        
        res.status(200).json({
            status: "GOD_MODE_ACTIVE",
            clearance: dev.clearanceLevel,
            sessionHash: Buffer.from(devId + Date.now()).toString('base64') 
        });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

module.exports = { loginToGateway };