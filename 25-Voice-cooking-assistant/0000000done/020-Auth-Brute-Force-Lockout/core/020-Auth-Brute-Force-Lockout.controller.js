const Service = require('./020-Auth-Brute-Force-Lockout.service');
exports.handleAction = async (req, res) => {
    try {
        const result = await Service.execute(req.body, req.user, req.ip);
        res.status(200).json({ success: true, data: result });
    } catch (e) {
        res.status(500).json({ success: false, error: "020_Auth_Brute_Force_Lockout_FAILED" });
    }
};
