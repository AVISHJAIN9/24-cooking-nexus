const express = require('express');
const router = express.Router();
const controller = require('./core/055-AI-Ghost-Chef-Comparison.controller');
router.post('/compare-recipes', controller.compare);
module.exports = router;
