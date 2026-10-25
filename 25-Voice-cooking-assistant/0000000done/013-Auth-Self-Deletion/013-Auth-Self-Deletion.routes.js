const express = require('express');
const router = express.Router();
const controller = require('./core/013-Auth-Self-Deletion.controller');
router.post('/process', controller.handleAction);
module.exports = router;
