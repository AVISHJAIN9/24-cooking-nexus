const Service = require('./core/006-Auth-Zero-Trust-Wall.service');
const Audit = require('../007-Auth-Audit-Logs/core/007-Auth-Audit-Logs.service');

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        await Audit.record('GUEST', 'UNAUTHORIZED_ACCESS', 'CRITICAL', req.ip);
        return res.status(401).json({ success: false, message: "Zero Trust: Access Denied" });
    }

    const user = Service.verifyToken(token);
    if (!user) {
        await Audit.record('GUEST', 'INVALID_TOKEN_ATTEMPT', 'WARNING', req.ip);
        return res.status(403).json({ success: false, message: "Invalid Security Token" });
    }

    req.user = user;
    next();
};