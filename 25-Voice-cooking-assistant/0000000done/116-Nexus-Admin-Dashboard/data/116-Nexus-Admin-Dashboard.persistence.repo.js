const DashboardSchema = require('./116-Nexus-Admin-Dashboard.schema');

class AdminPersistenceRepo {
    static async saveSnapshot(data) {
        return await DashboardSchema.create(data);
    }

    static async getLatest() {
        return await DashboardSchema.findOne().sort({ createdAt: -1 });
    }
}

module.exports = AdminPersistenceRepo;