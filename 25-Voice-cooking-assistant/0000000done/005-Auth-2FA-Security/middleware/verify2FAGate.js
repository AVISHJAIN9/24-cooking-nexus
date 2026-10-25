module.exports = (req, res, next) => {
  if (req.user && req.user.isTwoFactorEnabled) {
    if (!req.session.is2FAVerified) {
      return res.status(403).json({ message: "2FA Verification Required", code: "2FA_REQUIRED" });
    }
  }
  next();
};
