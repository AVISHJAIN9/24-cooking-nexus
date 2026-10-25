const Model = require('./018-Auth-SQL-Injection-Prevent.schema');
class 018AuthSQLInjectionPreventRepo {
    static async saveLog(data) { return await Model.create(data); }
    static async checkStatus(id) { return await Model.findOne({ userId: id }); }
}
module.exports = 018AuthSQLInjectionPreventRepo;
