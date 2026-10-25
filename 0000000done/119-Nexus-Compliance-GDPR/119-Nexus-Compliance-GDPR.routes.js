const express = require('express');
const router = express.Router();
const controller = require('./core/119-Nexus-Compliance-GDPR.controller');



router.get('/status/:userid',controller.checkMemberStatus);
router.post('/consent',controller.submitConsent);

module.exports = router;