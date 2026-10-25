const Model = require('./012-Auth-OAuth-Sync.schema');
class 012AuthOAuthSyncRepo {
    static async saveLog(data) { return await Model.create(data); }
    static async checkStatus(id) { return await Model.findOne({ userId: id }); }
}
module.exports = 012AuthOAuthSyncRepo;
