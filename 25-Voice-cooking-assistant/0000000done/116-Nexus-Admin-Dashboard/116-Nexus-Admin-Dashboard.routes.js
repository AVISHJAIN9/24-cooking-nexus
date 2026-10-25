const express = require('express');
const router = express.Router();
const controller = require('./core/119-Nexus-Compliance-GDPR.controller');


router.get('/compliance/gdpr', controller.getGDPRComplianceStatus);

module.exports = router;