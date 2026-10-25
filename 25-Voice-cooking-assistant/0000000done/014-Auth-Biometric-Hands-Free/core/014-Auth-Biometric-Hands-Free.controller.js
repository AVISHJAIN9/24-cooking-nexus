const Service = require('./014-Auth-Biometric-Hands-Free.service');
exports.handleAction = async (req, res) => {
    try {
        const result = await Service.execute(req.body, req.user, req.ip);
        res.status(200).json({ success: true, data: result });
    } catch (e) {
        res.status(500).json({ success: false, error: "014_Auth_Biometric_Hands_Free_FAILED" });
    }
};
