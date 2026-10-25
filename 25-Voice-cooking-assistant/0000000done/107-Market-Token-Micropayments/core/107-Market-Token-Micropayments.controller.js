const Service = require('./107-Market-Token-Micropayments.service');
exports.execute = async (req, res) => {
    try {
        const result = await Service.process(req.body, req.user?.id, req.ip);
        res.status(200).json({ success: true, data: result });
    } catch (e) {
        res.status(500).json({ success: false, error: "107_Market_Token_Micropayments_FAILED" });
    }
};
