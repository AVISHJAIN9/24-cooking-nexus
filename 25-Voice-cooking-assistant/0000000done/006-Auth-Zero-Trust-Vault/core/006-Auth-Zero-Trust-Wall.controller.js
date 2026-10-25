const Service = require('./006-Auth-Zero-Trust-Wall.service');

exports.validateSession = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ success: false });

        const isBlacklisted = await Service.isTokenBlacklisted(token);
        if (isBlacklisted) return res.status(403).json({ message: "Token Revoked" });

        const user = Service.verifyToken(token);
        res.status(200).json({ success: !!user, user });
    } catch (e) {
        res.status(500).json({ error: "AUTH_SERVER_ERROR" });
    }
};