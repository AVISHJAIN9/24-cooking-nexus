const express = require('express');
const router = express.Router();
const controller = require('./core/020-Auth-Brute-Force-Lockout.controller');
router.post('/process', controller.handleAction);
module.exports = router;
