const express = require('express');
const router = express.Router();
const controller = require('./core/073-Kitchen-Grocery-Generator.controller');

router.post('/add-items', controller.addToBasket);
router.get('/view/:userId', controller.getBasket);
router.delete('/clear/:userId', controller.clearBasket);

module.exports = router;