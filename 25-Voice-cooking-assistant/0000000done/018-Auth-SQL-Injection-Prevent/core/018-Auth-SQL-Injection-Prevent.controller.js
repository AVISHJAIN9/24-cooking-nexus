const Service = require('./018-Auth-SQL-Injection-Prevent.service');
exports.handleAction = async (req, res) => {
    try {
        const result = await Service.execute(req.body, req.user, req.ip);
        res.status(200).json({ success: true, data: result });
    } catch (e) {
        res.status(500).json({ success: false, error: "018_Auth_SQL_Injection_Prevent_FAILED" });
    }
};
