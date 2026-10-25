const Service = require('./048-Nexus-AI-Chat-Interface.service');
const Repo = require('../data/048-Nexus-AI-Chat-Interface.persistence.repo');

exports.sendMessage = async (req, res) => {
    try {
        const { userId, message } = req.body;
        const response = await Service.processMessage(userId, message);
        res.status(200).json({ success: true, data: response });
    } catch (e) {
        res.status(500).json({ success: false, error: "CHAT_FAILED" });
    }
};

exports.getHistory = async (req, res) => {
    try {
        const logs = await Repo.fetchUserLogs(req.params.userId);
        res.status(200).json({ success: true, data: logs });
    } catch (e) {
        res.status(500).json({ success: false, error: "HISTORY_ERROR" });
    }
};