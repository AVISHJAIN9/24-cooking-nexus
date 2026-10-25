const Repo = require('../data/007-Auth-Audit-Logs.persistence.repo');

exports.getLogs = async (req, res) => {
    try {
        const logs = await Repo.getAllLogs();
        res.status(200).json({ success: true, data: logs });
    } catch (e) {
        res.status(500).json({ error: "FETCH_LOGS_FAILED" });
    }
};