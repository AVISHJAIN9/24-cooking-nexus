const Service = require('./073-Kitchen-Grocery-Generator.service');
const Repo = require('../data/073-Kitchen-Grocery-Generator.persistence.repo');

exports.addToBasket = async (req, res) => {
    try {
        const { userId, ingredients } = req.body;
        const updatedBasket = await Service.processIngredients(userId, ingredients);
        res.status(200).json({ success: true, data: updatedBasket });
    } catch (e) {
        res.status(500).json({ success: false, error: "BASKET_UPDATE_FAILED" });
    }
};

exports.getBasket = async (req, res) => {
    try {
        const basket = await Repo.findOrCreateBasket(req.params.userId);
        res.status(200).json({ success: true, data: basket });
    } catch (e) {
        res.status(500).json({ success: false, error: "FETCH_FAILED" });
    }
};

exports.clearBasket = async (req, res) => {
    try {
        await Repo.clearAll(req.params.userId);
        res.status(200).json({ success: true, message: "Basket emptied" });
    } catch (e) {
        res.status(500).json({ success: false, error: "CLEAR_FAILED" });
    }
};