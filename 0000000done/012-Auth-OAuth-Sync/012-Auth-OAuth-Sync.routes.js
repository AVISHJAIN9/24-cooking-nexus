const express = require('express');
const router = express.Router();
const controller = require('./core/012-Auth-OAuth-Sync.controller');
router.post('/process', controller.handleAction);
module.exports = router;
