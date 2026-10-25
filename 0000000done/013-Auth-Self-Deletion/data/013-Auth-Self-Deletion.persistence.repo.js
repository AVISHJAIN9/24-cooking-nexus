const Model = require('./013-Auth-Self-Deletion.schema');
class 013AuthSelfDeletionRepo {
    static async saveLog(data) { return await Model.create(data); }
    static async checkStatus(id) { return await Model.findOne({ userId: id }); }
}
module.exports = 013AuthSelfDeletionRepo;
