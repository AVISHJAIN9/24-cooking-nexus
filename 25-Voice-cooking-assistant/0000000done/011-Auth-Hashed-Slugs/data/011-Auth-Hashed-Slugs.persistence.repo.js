const Model = require('./011-Auth-Hashed-Slugs.schema');
class 011AuthHashedSlugsRepo {
    static async saveLog(data) { return await Model.create(data); }
    static async checkStatus(id) { return await Model.findOne({ userId: id }); }
}
module.exports = 011AuthHashedSlugsRepo;
