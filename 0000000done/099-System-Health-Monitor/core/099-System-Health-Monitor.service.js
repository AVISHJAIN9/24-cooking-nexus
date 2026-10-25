const os = require('os');
const Repo = require('../data/099-System-Health-Monitor.persistence.repo');

class HealthMonitorService {
    static async getSystemVitals() {
        const stats = {
            status: 'OPERATIONAL',
            uptime: Math.floor(process.uptime()),
            memoryUsage: process.memoryUsage(),
            loadAverage: os.loadavg(),
            timestamp: new Date()
        };

        // Fire and forget logging (doesn't slow down the response)
        Repo.logSystemStatus(stats);

        return stats;
    }
}

module.exports = HealthMonitorService;