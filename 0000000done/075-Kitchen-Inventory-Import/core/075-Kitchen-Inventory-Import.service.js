//Logic for validating imports and initializing batch IDs.
//This service creates a unique Batch ID for every import, which is vital for the 068-Lifecycle feature.

const inventory = require('../data/075-Kitchen-Inventory-Import.db');

class inventoryimportservices{
    static async addingredient(data){
        const{ingredientname,category,quantity,unit,expiredate,storage} = data;

        let item = await inventory.findone({ingredientname});

        if(!item){
            item = new inventory({
                ingredientname,
                category,
                baseunit:unit,
            });
        }
        const newbactch = {
            batchId: `BATCH-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            quantity,
            expiryDate,
            storageZone
        }
        item.batches.push(newBatch);
        item.totalQuantity += quantity; // Feature 062 logic

        return await item.save();
    }
}
module.exports = inventoryimportservices;

