const Model = require('./006-Auth-Zero-Trust-Wall.schema');

class ZeroTrustRepo {
    static async checkBlacklist(token) {
        return await Model.exists({ token });
    }
}
module.exports = ZeroTrustRepo;