const Service = require('./116-Nexus-Admin-Dashboard.service');

exports.getDashboardStats = async (req, res) => {
    try {
        const stats = await Service.aggregateSystemStats();
        res.status(200).json({
            success: true,
            feature: "116-Admin-Dashboard",
            data: stats
        });
    } catch (error) {
        res.status(500).json({ success: false, error: "DASHBOARD_AGGREGATION_FAILED" });
    }
};