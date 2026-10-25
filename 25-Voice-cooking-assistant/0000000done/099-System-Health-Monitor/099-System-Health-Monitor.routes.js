const express = require('express');
const router = express.Router();
const controller = require('./core/099-System-Health-Monitor.controller');

// Main endpoint for Admin dashboard to check server health
router.get('/heartbeat', controller.getHeartbeat);

module.exports = router;