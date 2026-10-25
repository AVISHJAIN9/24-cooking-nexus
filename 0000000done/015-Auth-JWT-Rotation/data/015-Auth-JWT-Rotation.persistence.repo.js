const Model = require('./015-Auth-JWT-Rotation.schema');
class 015AuthJWTRotationRepo {
    static async saveLog(data) { return await Model.create(data); }
    static async checkStatus(id) { return await Model.findOne({ userId: id }); }
}
module.exports = 015AuthJWTRotationRepo;
