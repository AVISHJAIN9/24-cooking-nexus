const express = require('express');
const router = express.Router();
const controller = require('./core/014-Auth-Biometric-Hands-Free.controller');
router.post('/process', controller.handleAction);
module.exports = router;
