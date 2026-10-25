const express = require('express');
const router = express.Router();
const controller = require('./core/018-Auth-SQL-Injection-Prevent.controller');
router.post('/process', controller.handleAction);
module.exports = router;
