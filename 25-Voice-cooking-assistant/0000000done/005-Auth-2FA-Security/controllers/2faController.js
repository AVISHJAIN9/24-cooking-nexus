const { generate2FASecret, verify2FAToken } = require('../services/2fa.services');
const User = require('../models/user.model');

exports.setup2FA = async (req, res) => {
  const secret = generate2FASecret(req.user.username);
  await User.findByIdAndUpdate(req.user._id, { twoFactorSecret: secret.base32 });
  res.json({ qrCodeUrl: secret.otpauth_url, secret: secret.base32 });
};

exports.verifyAndEnable2FA = async (req, res) => {
  const { token } = req.body;
  const user = await User.findById(req.user._id);
  const verified = verify2FAToken(token, user.twoFactorSecret);
  
  if (verified) {
    user.isTwoFactorEnabled = true;
    await user.save();
    res.json({ message: "2FA Enabled Successfully" });
  } else {
    res.status(400).json({ message: "Invalid Token" });
  }
};
