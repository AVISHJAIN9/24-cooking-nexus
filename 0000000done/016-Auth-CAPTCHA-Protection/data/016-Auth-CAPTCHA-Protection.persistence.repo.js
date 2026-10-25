const Model = require('./016-Auth-CAPTCHA-Protection.schema');
class 016AuthCAPTCHAProtectionRepo {
    static async saveLog(data) { return await Model.create(data); }
    static async checkStatus(id) { return await Model.findOne({ userId: id }); }
}
module.exports = 016AuthCAPTCHAProtectionRepo;
