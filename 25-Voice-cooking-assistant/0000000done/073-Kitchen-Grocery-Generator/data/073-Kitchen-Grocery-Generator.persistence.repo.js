const Model = require('./073-Kitchen-Grocery-Generator.schema');

class GroceryRepo {
    static async findOrCreateBasket(userId) {
        let basket = await Model.findOne({ userId });
        if (!basket) basket = await Model.create({ userId, items: [] });
        return basket;
    }
    static async updateBasket(userId, items) {
        return await Model.findOneAndUpdate({ userId }, { items }, { new: true });
    }
    static async clearAll(userId) {
        return await Model.findOneAndUpdate({ userId }, { items: [] });
    }
}
module.exports = GroceryRepo;