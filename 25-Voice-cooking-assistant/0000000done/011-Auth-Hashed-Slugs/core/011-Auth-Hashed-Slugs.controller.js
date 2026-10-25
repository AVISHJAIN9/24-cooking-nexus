const Service = require('./011-Auth-Hashed-Slugs.service');
exports.handleAction = async (req, res) => {
    try {
        const result = await Service.execute(req.body, req.user, req.ip);
        res.status(200).json({ success: true, data: result });
    } catch (e) {
        res.status(500).json({ success: false, error: "011_Auth_Hashed_Slugs_FAILED" });
    }
};
