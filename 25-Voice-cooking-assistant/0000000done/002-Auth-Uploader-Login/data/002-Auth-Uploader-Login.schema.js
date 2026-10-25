/**
 * Project Nexus: Phase 2 Security & Identity
 * Source of Truth for Professional Uploader Data
 */

/**
 * @typedef {Object} VerificationMetadata
 * @property {boolean} isVerified - Status for unlocking Pro-Uploader tools
 * @property {Date} certifiedAt - Timestamp of professional verification
 * @property {string} licenseId - Culinary license or certification ID
 */

/**
 * @typedef {Object} RevenueMetadata
 * @property {number} totalEarnings - Cumulative revenue from Recipes/Reels
 * @property {string} currency - Default: 'INR'
 */

/**
 * @typedef {Object} UploaderIdentity
 * @property {string} nexusId - Hashed ID Slug for professional privacy
 * @property {string} chefName - Verified display name for the creator
 * @property {string} email - Unique login identifier (lowercase)
 * @property {string} role - 'verified-chef' | 'admin'
 * @property {VerificationMetadata} verificationStatus - Trust-layer data
 * @property {RevenueMetadata} revenueMetadata - Financial-layer data
 */

// Industrial Constants to prevent typos across the 120 features
export const UPLOADER_ROLES = {
    VERIFIED_CHEF: 'verified-chef',
    ADMIN: 'admin'
};

export const VERIFICATION_STATES = {
    PENDING: 'pending',
    VERIFIED: 'verified',
    REJECTED: 'rejected'
};