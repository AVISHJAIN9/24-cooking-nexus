const Model = require('./020-Auth-Brute-Force-Lockout.schema');
class 020AuthBruteForceLockoutRepo {
    static async saveLog(data) { return await Model.create(data); }
    static async checkStatus(id) { return await Model.findOne({ userId: id }); }
}
module.exports = 020AuthBruteForceLockoutRepo;
