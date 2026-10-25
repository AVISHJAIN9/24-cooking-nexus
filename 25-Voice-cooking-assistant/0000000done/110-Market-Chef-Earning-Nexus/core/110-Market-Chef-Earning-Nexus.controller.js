const Service = require('./110-Market-Chef-Earning-Nexus.service');
exports.execute = async (req, res) => {
    try {
        const result = await Service.process(req.body, req.user?.id, req.ip);
        res.status(200).json({ success: true, data: result });
    } catch (e) {
        res.status(500).json({ success: false, error: "110_Market_Chef_Earning_Nexus_FAILED" });
    }
};
