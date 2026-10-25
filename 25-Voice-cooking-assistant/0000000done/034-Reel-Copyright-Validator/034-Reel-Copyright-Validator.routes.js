const express = require('express');
const router = express.Router();
const controller = require('./core/034-Reel-Copyright-Validator.controller');
router.post('/scan', controller.scanReel);
module.exports = router;
