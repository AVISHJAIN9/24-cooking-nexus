const express = require('express');
const router = express.Router();
const controller = require('./core/107-Market-Token-Micropayments.controller');
router.post('/transaction', controller.execute);
module.exports = router;
