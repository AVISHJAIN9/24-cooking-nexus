const express = require('express');
const router = express.Router();
const controller = require('./core/015-Auth-JWT-Rotation.controller');
router.post('/process', controller.handleAction);
module.exports = router;
