const mongoose = require('mongoose');
const groceryItemSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    unit: String,
    category: { type: String, default: 'Pantry' }
});

const basketSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [groceryItemSchema]
}, { timestamps: true });

module.exports = mongoose.model('GroceryBasket', basketSchema);