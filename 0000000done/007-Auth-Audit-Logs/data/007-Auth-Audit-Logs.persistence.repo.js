const Model = require('./007-Auth-Audit-Logs.schema');

class AuditRepo {
    static async createEntry(data) {
        return await Model.create(data);
    }
    static async getAllLogs() {
        return await Model.find().sort({ createdAt: -1 });
    }
}
module.exports = AuditRepo;