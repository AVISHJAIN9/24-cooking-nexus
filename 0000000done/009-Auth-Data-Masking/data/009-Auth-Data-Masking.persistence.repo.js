const PolicyModel = require('./009-Auth-Data-Masking.schema');

class MaskingRepo {
    /**
     * Fetches the masking rules for a specific part of the app
     */
    static async getPolicyForResource(resource) {
        return await PolicyModel.findOne({ resourceName: resource, isActive: true });
    }

    /**
     * Global utility to fetch all active masking patterns
     */
    static async getAllActivePolicies() {
        return await PolicyModel.find({ isActive: true });
    }
    
    /**
     * Seed a new policy (e.g., during System Setup)
     */
    static async createPolicy(data) {
        return await PolicyModel.create(data);
    }
}

module.exports = MaskingRepo;