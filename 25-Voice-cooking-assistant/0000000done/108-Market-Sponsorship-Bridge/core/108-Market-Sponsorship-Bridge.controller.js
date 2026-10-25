const Service = require('./108-Market-Sponsorship-Bridge.service');
exports.execute = async (req, res) => {
    try {
        const result = await Service.process(req.body, req.user?.id, req.ip);
        res.status(200).json({ success: true, data: result });
    } catch (e) {
        res.status(500).json({ success: false, error: "108_Market_Sponsorship_Bridge_FAILED" });
    }
};
