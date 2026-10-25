const express = require('express');
const router = express.Router();
const { getScaledRecipe } = require('./core/077-Kitchen-Portion-Scaling.controller');

// Endpoint: POST /api/v1/logistics/scale
router.post('/scale', getScaledRecipe);

module.exports = router;