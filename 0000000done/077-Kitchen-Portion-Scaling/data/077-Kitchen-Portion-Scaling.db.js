const ScaledRecipe = require('./077-Kitchen-Portion-Scaling.schema');

class PortionScalingDB {
    // Save a scaled version for a specific member
    static async saveScaledVersion(data) {
        return await ScaledRecipe.findOneAndUpdate(
            { originalRecipeId: data.originalRecipeId, userId: data.userId, targetPortions: data.targetPortions },
            data,
            { upsert: true, new: true }
        );
    }

    // Retrieve if already exists
    static async getExistingScale(recipeId, userId, portions) {
        return await ScaledRecipe.findOne({ originalRecipeId: recipeId, userId, targetPortions: portions });
    }
}

module.exports = PortionScalingDB;