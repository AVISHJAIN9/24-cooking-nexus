//This file provides the "Save" logic that the service uses to store the data we just defined.
const HealthLog = require('./099-System-Health-Monitor.schema');

class HealthPersistenceRepo {
    static async logSystemStatus(stats) {
        try {
            const entry = new HealthLog(stats);
            return await entry.save();
        } catch (error) {
            console.error("[Nexus-099] Failed to persist health log:", error);
        }
    }
    static async getRecentLogs() {
        return await HealthLog.find().sort({ timestamp: -1 }).limit(100);
    }
}

module.exports = HealthPersistenceRepo;