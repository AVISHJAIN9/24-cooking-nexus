const Service = require('./074-Kitchen-PDF-Export.service');
const Repo = require('../data/074-Kitchen-PDF-Export.persistence.repo');

exports.generateDownload = async (req, res) => {
    try {
        // Mock data - in production, fetch this from Feature 062/077
        const recipeData = {
            title: "Project Nexus Signature Curry",
            servings: 4,
            ingredients: [
                { name: "Onion", quantity: 2, unit: "pcs" },
                { name: "Tomato", quantity: 3, unit: "pcs" }
            ],
            instructions: "1. Chop vegetables. 2. Sauté until golden. 3. Add spices."
        };

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=Nexus-Recipe.pdf');

        Service.buildRecipeDoc(recipeData, res);
        
        // Log the export event
        await Repo.logExport(req.params.recipeId);
        
    } catch (error) {
        res.status(500).json({ success: false, error: "PDF_GEN_ERROR" });
    }
};