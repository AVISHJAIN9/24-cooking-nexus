const express = require('express');
const router = express.Router();
const { requestLink, verifyLink } = require('../controllers/authController');
router.post('/login', requestLink);
router.get('/verify', verifyLink);
module.exports = router;
