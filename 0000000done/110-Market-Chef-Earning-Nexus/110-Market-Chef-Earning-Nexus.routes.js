const express = require('express');
const router = express.Router();
const controller = require('./core/110-Market-Chef-Earning-Nexus.controller');
router.post('/transaction', controller.execute);
module.exports = router;
