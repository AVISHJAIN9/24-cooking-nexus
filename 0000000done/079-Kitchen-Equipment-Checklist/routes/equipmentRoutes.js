const express = require('express');
const router = express.Router();
const { getEquipment, addEquipment } = require('../controllers/equipmentController');
router.route('/').get(getEquipment).post(addEquipment);
module.exports = router;
