//: The Mongoose model defining ingredients, batches, and storage zones.
const mongoose = require('mongoose');
const inventoryschema = new mongoose.Schema({
    ingredientname:{
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['produce', 'dairy', 'protein', 'pantry', 'frozen'],
        required: true
    },
    baseunit: {
        type: String,
        enum: ['kg', 'g', 'ltr', 'ml', 'pcs'],
        required: true
    },
    totalquantity: {
        type: Number,
        required: true
    },
    batches:[{
        batchid:{
            type:String,
            required:true,
        },
        quantity:{
            type:Number,
            required :true,
        },
        procuredat:{
            type:Date,
            dafault:Date.now
        },
        expiryDate: {
             type: Date, 
             required: true
             },
        storageZone: { 
            type: String,
             required: true 
            },
        isOpened: { type: Boolean, 
            default: false 
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventoryschema);