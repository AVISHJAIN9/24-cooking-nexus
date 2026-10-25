const Model = require('./014-Auth-Biometric-Hands-Free.schema');
class 014AuthBiometricHandsFreeRepo {
    static async saveLog(data) { return await Model.create(data); }
    static async checkStatus(id) { return await Model.findOne({ userId: id }); }
}
module.exports = 014AuthBiometricHandsFreeRepo;
