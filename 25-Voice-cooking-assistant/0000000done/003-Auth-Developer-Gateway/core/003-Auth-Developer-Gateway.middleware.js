//3 Critical. This file checks if the request is coming from a known developer IP or a recognized hardware fingerprint.

const developerGuard = (req, res, next) => {
    const incomingIp = req.ip;
    const deviceFingerprint = req.headers['x-dev-fingerprint'];
    const APPROVED_IP = process.env.DEV_STAGING_IP;
    const APPROVED_DEVICE = process.env.DEV_MACBOOK_ID;

    if (incomingIp !== APPROVED_IP || deviceFingerprint !== APPROVED_DEVICE) {
        return res.status(403).json({
            error: "Access Denied: Environment Not Recognized",
            alert: "Security Incident Logged"
        });
    }

    next();
};

module.exports = developerGuard;