const express = require('express');
const router = express.Router();
const controller = require('./core/108-Market-Sponsorship-Bridge.controller');
router.post('/transaction', controller.execute);
module.exports = router;
