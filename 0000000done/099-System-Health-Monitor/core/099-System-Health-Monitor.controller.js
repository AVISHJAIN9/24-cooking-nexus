const HealthService = require('./099-System-Health-Monitor.service');

exports.getHeartbeat = (req, res) => {
    try {
        const vitals = HealthService.getSystemVitals();
        res.status(200).json({
            success: true,
            feature: "099-Health-Monitor",
            timestamp: new Date().toISOString(),
            data: vitals
        });
    } catch (error) {
        res.status(500).json({ success: false, error: "HEALTH_CHECK_FAILED" });
    }
};