const speakeasy = require('speakeasy');
// Best practice: Keep business logic independent of the web framework
exports.generateSecret = (username) => speakeasy.generateSecret({ name: "ChefApp:" + username });
exports.verifyToken = (token, secret) => speakeasy.totp.verify({ secret, encoding: 'base32', token });
