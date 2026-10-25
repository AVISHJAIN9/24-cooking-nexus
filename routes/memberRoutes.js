const express = require('express');
const router = express.Router();
const { getProfile } = require('../controllers/memberController');
router.get('/:id', getProfile);
module.exports = router;
