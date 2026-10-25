const Service = require('./008-Auth-Timed-Tokens.service');

exports.checkStatus = async (req, res) => {
    try {
        const { userId, token } = req.body;
        const result = await Service.validateSession(userId, token, req.ip);
        
        if (!result.valid) {
            return res.status(401).json({ success: false, message: result.reason });
        }
        res.status(200).json({ success: true, message: "Session Active" });
    } catch (e) {
        res.status(500).json({ success: false, error: "TIMED_TOKEN_CHECK_ERROR" });
    }
};