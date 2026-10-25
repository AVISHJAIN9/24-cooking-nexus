const express = require('express');
const router = express.Router();
const controller = require('./core/109-Market-Affiliate-Link-Sync.controller');
router.get('/track', controller.execute);
module.exports = router;
