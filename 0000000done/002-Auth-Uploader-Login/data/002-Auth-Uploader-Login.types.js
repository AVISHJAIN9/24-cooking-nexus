const mongoose = require('mongoose');

/**
 * Project Nexus: Phase 2 Security & Identity
 * Focus: Professional Chef Identity & Monetization
 */
const uploaderSchema = new mongoose.Schema({
    // Hashed ID Slug for professional privacy and indexing
    nexusId: {
        type: String,
        unique: true,
        required: true,
        index: true 
    },
    chefName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    // select: false prevents password leakage in analytics or logs
    password: {
        type: String,
        required: true,
        select: false 
    },
    // Role-Based Access Control (RBAC)
    role: {
        type: String,
        enum: ['verified-chef', 'admin'],
        default: 'verified-chef',
    },
    // Trust Layer: Required for "Verified" badge and uploader tools
    verificationStatus: {
        isVerified: { type: Boolean, default: false },
        certifiedAt: Date,
        licenseId: String
    },
    // Financial Layer: Persistence for chef earnings
    revenueMetadata: {
        totalEarnings: { type: Number, default: 0 },
        currency: { type: String, default: 'INR' }
    },
    // Security Layer: Consistent with Block 001 for shared logic
    securityMetadata: {
        lastLoginIp: String,
        deviceFingerprint: String,
        failedAttempts: {
            type: Number,
            default: 0
        },
        auditTrail: [{
            action: String,
            timestamp: { type: Date, default: Date.now }
        }]
    }
}, { timestamps: true });

module.exports = mongoose.model('Uploader', uploaderSchema);