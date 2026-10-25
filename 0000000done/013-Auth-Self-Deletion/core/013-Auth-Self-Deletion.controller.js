const Service = require('./013-Auth-Self-Deletion.service');
exports.handleAction = async (req, res) => {
    try {
        const result = await Service.execute(req.body, req.user, req.ip);
        res.status(200).json({ success: true, data: result });
    } catch (e) {
        res.status(500).json({ success: false, error: "013_Auth_Self_Deletion_FAILED" });
    }
};
