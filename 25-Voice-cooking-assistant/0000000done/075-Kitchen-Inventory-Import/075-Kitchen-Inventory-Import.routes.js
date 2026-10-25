const express = require('express');
const router = express.Router();
const { importInventoryItem } = require('./core/075-Kitchen-Inventory-Import.controller');
const { validateImport } = require('./core/075-Kitchen-Inventory-Import.validator');

router.post(
    '/import', 
    validateImport,    
    importInventoryItem 
);

module.exports = router;