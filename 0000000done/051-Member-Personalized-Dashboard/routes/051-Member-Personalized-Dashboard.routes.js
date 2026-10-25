const express = require('express');
const router = express.Router();
const Controller = require('../core/051-Member-Personalized-Dashboard.controller');

// GET /api/v1/dashboard/:userId
router.get('/:userId', Controller.getDashboard);

// GET /api/v1/dashboard (uses req.user)
router.get('/', Controller.getDashboard);

module.exports = router;
