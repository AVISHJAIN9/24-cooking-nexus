const express = require('express');
const router = express.Router();
const controller = require('./core/011-Auth-Hashed-Slugs.controller');
router.post('/process', controller.handleAction);
module.exports = router;
