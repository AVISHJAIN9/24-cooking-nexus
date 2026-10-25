const express = require('express');
const router = express.Router();
const controller = require('./core/007-Auth-Audit-Logs.controller');

router.get('/all', controller.getLogs);

module.exports = router;