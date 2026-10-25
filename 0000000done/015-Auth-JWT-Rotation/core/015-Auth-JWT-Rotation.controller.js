const Service = require('./015-Auth-JWT-Rotation.service');
exports.handleAction = async (req, res) => {
    try {
        const result = await Service.execute(req.body, req.user, req.ip);
        res.status(200).json({ success: true, data: result });
    } catch (e) {
        res.status(500).json({ success: false, error: "015_Auth_JWT_Rotation_FAILED" });
    }
};
