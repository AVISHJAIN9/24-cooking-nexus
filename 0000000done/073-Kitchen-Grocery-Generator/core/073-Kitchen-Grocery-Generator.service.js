const Repo = require('../data/073-Kitchen-Grocery-Generator.persistence.repo');

class GroceryService {
    static async processIngredients(userId, newItems) {
        let basket = await Repo.findOrCreateBasket(userId);
        
        newItems.forEach(newItem => {
            // Check if item with same name and unit already exists
            const existingIndex = basket.items.findIndex(
                i => i.name.toLowerCase() === newItem.name.toLowerCase() && i.unit === newItem.unit
            );

            if (existingIndex > -1) {
                basket.items[existingIndex].quantity += newItem.quantity;
            } else {
                basket.items.push(newItem);
            }
        });

        return await Repo.updateBasket(userId, basket.items);
    }
}

module.exports = GroceryService;