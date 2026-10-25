const express = require('express');
const router = express.Router();
const controller = require('./core/010-Auth-Multi-Signature.controller');
router.post('/process', controller.handleAction);
module.exports = router;
