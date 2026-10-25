const Model = require('./010-Auth-Multi-Signature.schema');
class 010AuthMultiSignatureRepo {
    static async saveLog(data) { return await Model.create(data); }
    static async checkStatus(id) { return await Model.findOne({ userId: id }); }
}
module.exports = 010AuthMultiSignatureRepo;
