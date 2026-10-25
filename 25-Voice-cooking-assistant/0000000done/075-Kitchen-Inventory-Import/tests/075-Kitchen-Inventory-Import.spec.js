//Unit tests for inventory calculations.
const { expect } = require('chai');
const InventoryService = require('../core/075-Kitchen-Inventory-Import.service');

describe('Feature 075: Kitchen Inventory Import', () => {
    it('Should correctly increment totalQuantity when a new batch is added', async () => {
        const mockData = {
            ingredientName: "Basmati Rice",
            category: "Pantry",
            quantity: 5,
            unit: "kg",
            expiryDate: new Date('2027-01-01'),
            storageZone: "ambient"
        };

        const result = await InventoryService.addIngredient(mockData);
        
        // Assertions
        expect(result.ingredientName).to.equal("Basmati Rice");
        expect(result.totalQuantity).to.be.at.least(5);
        expect(result.batches).to.have.lengthOf.at.least(1);
    });
});