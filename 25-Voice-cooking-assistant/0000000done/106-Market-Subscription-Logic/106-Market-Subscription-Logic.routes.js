const express = require('express');
const router = express.Router();
const controller = require('./core/106-Market-Subscription-Logic.controller');
router.post('/transaction', controller.execute);
module.exports = router;
