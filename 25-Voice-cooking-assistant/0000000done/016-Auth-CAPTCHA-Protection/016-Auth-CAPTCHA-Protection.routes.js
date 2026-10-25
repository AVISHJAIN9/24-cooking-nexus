const express = require('express');
const router = express.Router();
const controller = require('./core/016-Auth-CAPTCHA-Protection.controller');
router.post('/process', controller.handleAction);
module.exports = router;
