const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Request Magic Link
const requestLink = async (req, res) => {
  const { email } = req.body;
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '15m' });
  const magicLink = `http://localhost:5000/api/auth/verify?token=${token}`;

  // Log it for now (Since SMTP requires setup)
  console.log("Magic Link Generated:", magicLink);
  
  res.status(200).json({ message: "Check your console for the magic link!" });
};

// Verify Magic Link
const verifyLink = async (req, res) => {
  const { token } = req.query;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.findOne({ email: decoded.email });
    if (!user) user = await User.create({ email: decoded.email });
    
    res.status(200).json({ message: "Login Successful", user });
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { requestLink, verifyLink };
