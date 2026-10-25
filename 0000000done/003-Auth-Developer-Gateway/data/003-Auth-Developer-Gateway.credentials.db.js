const Developer = require('./003-Auth-Developer-Gateway.schema');

/**
 * Project Nexus: Block 003 - Developer Gateway
 * Focus: Secure Data Access & Audit Persistence
 */
class DevCredentialsDB {
    
    /**
     * Specialized lookup for God-Mode access.
     * Explicitly selects the hidden secretKey for verification.
     */
    static async findByDevId(devId) {
        return await Developer.findOne({ devId })
            .select('+secretKey') // Bypasses the 'select: false' security in the schema
            .lean();              // Improves performance by returning plain JS objects
    }

    /**
     * Immutable Audit Logger.
     * Records every administrative command for Phase 4 compliance.
     */
    static async logDevAction(devId, action, impact) {
        return await Developer.findOneAndUpdate(
            { devId },
            { 
                $push: { 
                    actionHistory: { 
                        command: action, 
                        impact: impact, 
                        timestamp: new Date() 
                    } 
                } 
            },
            { new: true, runValidators: true }
        );
    }

    /**
     * Environmental Sync.
     * Updates the last known IP and device ID upon successful gateway entry.
     */
    static async updateSessionMetadata(devId, ip, deviceId) {
        return await Developer.updateOne(
            { devId },
            { 
                $set: { 
                    "authorizedEnvironment.staticIp": ip,
                    "authorizedEnvironment.lastUsedDevice": deviceId 
                }
            }
        );
    }
}

module.exports = DevCredentialsDB;