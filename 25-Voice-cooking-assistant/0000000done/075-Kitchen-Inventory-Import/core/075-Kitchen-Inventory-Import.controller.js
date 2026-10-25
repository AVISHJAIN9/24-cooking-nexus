//The orchestrator managing the API requests.
const InventoryService = require('./075-Kitchen-Inventory-Import.service');

/**
 * Project Nexus: Feature 075 Controller
 */
const importInventoryItem = async (req, res) => {
    try {
        // Data comes from the validated body
        const result = await InventoryService.addIngredient(req.body);

        res.status(201).json({
            status: "SUCCESS_IMPORT",
            message: `Successfully imported ${req.body.quantity} ${req.body.unit} of ${req.body.ingredientName}`,
            data: {
                batchId: result.batches[result.batches.length - 1].batchId,
                currentTotalStock: result.totalQuantity
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "LOGISTICS_ERROR",
            message: error.message
        });
    }
};

module.exports = { importInventoryItem };