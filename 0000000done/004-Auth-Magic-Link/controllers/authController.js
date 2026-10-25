const User = require('../models/User');
const jwt = require('jsonwebtoken');

const requestLink = async (req, res) => {
  const { email } = req.body;
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '15m' });
  const magicLink = `http://localhost:5000/api/auth/verify?token=${token}`;
  console.log("Magic Link:", magicLink);
  res.status(200).json({ message: "Check terminal for link!" });
};

const verifyLink = async (req, res) => {
  const { token } = req.query;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.findOne({ email: decoded.email });
    if (!user) user = await User.create({ email: decoded.email });
    res.status(200).json({ message: "Login Successful", user });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
module.exports = { requestLink, verifyLink };
