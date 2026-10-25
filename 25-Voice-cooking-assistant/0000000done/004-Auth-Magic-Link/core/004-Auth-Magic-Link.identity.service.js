const crypto = require('crypto');
// Best practice: Use cryptographically secure random tokens
exports.createSecureToken = () => crypto.randomBytes(32).toString('hex');
