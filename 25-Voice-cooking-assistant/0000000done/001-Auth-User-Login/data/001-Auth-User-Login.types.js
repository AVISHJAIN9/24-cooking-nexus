/**
 * Project Nexus: Phase 2 Security & Identity
 * Source of Truth for User Data Structures
 */

/**
 * @typedef {Object} SecurityMetadata
 * @property {string} lastLoginIp - Industrial tracking for Device-Aware Login
 * @property {string} deviceFingerprint - Unique ID for the hardware used to login
 * @property {number} failedAttempts - Counter for Brute Force Detection logic
 * @property {Array<{action: string, timestamp: Date}>} auditTrail - Immutable history for Audit Logs
 */

/**
 * @typedef {Object} UIPreferences
 * @property {string} theme - 'light' or 'dark' persistence for multi-device sync
 * @property {boolean} sentimentMode - Cognitive UI controller for mood-based adaptation
 */

/**
 * @typedef {Object} UserIdentity
 * @property {string} nexusId - Hashed ID Slug for Zero-Trust URL privacy
 * @property {string} fullName - The cook's verified display name
 * @property {string} email - Unique login identifier (sanitized)
 * @property {string} role - RBAC tier: 'home-cook' | 'verified-chef' | 'admin'
 * @property {UIPreferences} uiPreferences - Persisted workspace configuration
 * @property {SecurityMetadata} securityMetadata - Critical safety and audit data
 */

// Global Constants for Roles to prevent typos across the 120 features
export const USER_ROLES = {
    HOME_COOK: 'home-cook',
    VERIFIED_CHEF: 'verified-chef',
    ADMIN: 'admin'
};

export const UI_THEMES = {
    DARK: 'dark',
    LIGHT: 'light'
};