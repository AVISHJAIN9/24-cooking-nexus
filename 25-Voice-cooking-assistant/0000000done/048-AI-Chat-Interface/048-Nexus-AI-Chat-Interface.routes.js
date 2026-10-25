const express = require('express');
const router = express.Router();
const controler = require('./core/048-AI-Chat-Interface.controller');

router.post('./mesage', controler.handleMessage);
router.get('./history', controler.getChatHistory);

module.exports = router;
