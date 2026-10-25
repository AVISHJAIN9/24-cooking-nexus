const Service = require('./106-Market-Subscription-Logic.service');
exports.execute = async (req, res) => {
    try {
        const result = await Service.process(req.body, req.user?.id, req.ip);
        res.status(200).json({ success: true, data: result });
    } catch (e) {
        res.status(500).json({ success: false, error: "106_Market_Subscription_Logic_FAILED" });
    }
};
