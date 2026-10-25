const Model = require('./034-Reel-Copyright-Validator.schema');
class CopyrightRepo {
    static async saveReport(data) { return await Model.create(data); }
}
module.exports = CopyrightRepo;
