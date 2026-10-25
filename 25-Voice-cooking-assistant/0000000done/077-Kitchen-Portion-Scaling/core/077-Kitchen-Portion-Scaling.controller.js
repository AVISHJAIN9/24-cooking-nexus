const ScalingService = require('./077-Kitchen-Portion-Scaling.service');

const processScaling = async (req, res) => {
    try {
        const { recipeData, targetPortions } = req.body;

        if (!recipeData || !targetPortions) {
            return res.status(400).json({ error: "Missing Recipe or Portion Data" });
        }

        const result = ScalingService.scaleRecipe(recipeData, targetPortions);

        res.status(200).json({
            status: "SUCCESS",
            message: `Recipe scaled for ${targetPortions} members`,
            data: result
        });
    } catch (error) {
        res.status(500).json({ error: "Scaling Logic Failed", details: error.message });
    }
};

module.exports = { processScaling };