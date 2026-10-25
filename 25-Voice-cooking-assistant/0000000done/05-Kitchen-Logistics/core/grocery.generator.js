// Generates a grocery list from an array of recipe ingredient lists
const normalize = (name) => name.toLowerCase().trim();

class GroceryGenerator {
  /**
   * recipes: [{ ingredients: [{name, qty, unit}] }]
   */
  static generate(recipes = []) {
    const map = new Map();

    recipes.forEach(r => {
      (r.ingredients || []).forEach(i => {
        const key = normalize(i.name);
        if (!map.has(key)) map.set(key, { name: i.name, qty: 0, units: i.unit || '' });
        const existing = map.get(key);
        const addQty = Number(i.qty) || 1;
        existing.qty += addQty;
      });
    });

    return Array.from(map.values());
  }
}

module.exports = GroceryGenerator;
