const mongoose = require('mongoose');

const scaledRecipeSchema = new mongoose.Schema({
    originalRecipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
    targetPortions: { type: Number, required: true },
    scalingFactor: { type: Number, required: true },

    // The result of our Thermal and Unit conversions
    scaledIngredients: [{
        name: String,
        amount: Number,
        unit: String
    }],
    scaledSteps: [{
        instruction: String,
        duration: Number, // Scaled minutes
        scalingMode: String
    }]
}, { timestamps: true });

module.exports = mongoose.model('ScaledRecipe', scaledRecipeSchema);