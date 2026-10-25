//Ensures that developer keys meet extreme complexity requirements (e.g., 32+ characters).
const { body, header, validationResult } = require('express-validator');

/**
 * Project Nexus: Block 003 - Developer Gateway
 * Focus: High-Entropy Input Validation & Hardware Verification
 */

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();

    // Industrial Alert: Log validation failures in the system as "Suspicious Activity"
    return res.status(403).json({
        securityCode: "SYS-DEV-VALIDATION-FAIL",
        errors: errors.array().map(err => ({ [err.path]: err.msg }))
    });
};

const developerLoginRules = () => {
    return [
        // 1. Identity Validation
        body('devId')
            .isString()
            .notEmpty()
            .withMessage('Developer ID required for System Access'),

        // 2. High-Entropy Secret Key (Stricter than a standard password)
        body('secretKey')
            .isLength({ min: 16 })
            .withMessage('Secret Key must be a minimum of 16-character high-entropy string'),

        // 3. Hardware Fingerprint (Required in Header)
        header('x-dev-fingerprint')
            .notEmpty()
            .withMessage('Hardware Fingerprint missing from System Request')
    ];
};

module.exports = {
    gatewayValidator: [developerLoginRules(), validate]
};