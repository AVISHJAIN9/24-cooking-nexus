const mongoose = require('mongoose');

const maskingPolicySchema = new mongoose.Schema({
    resourceName: { type: String, required: true, unique: true }, // e.g., 'User', 'Order'
    sensitiveFields: [{
        fieldName: String,
        maskType: { type: String, enum: ['EMAIL', 'PHONE', 'FULL', 'TOKEN'], default: 'FULL' },
        accessLevelRequired: { type: Number, default: 2 } // Only Admins see unmasked
    }],
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('MaskingPolicy', maskingPolicySchema);