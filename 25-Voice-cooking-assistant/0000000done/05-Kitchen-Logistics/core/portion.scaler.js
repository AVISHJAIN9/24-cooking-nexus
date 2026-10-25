// Portion scaling utilities

class PortionScaler {
  /**
   * Scale ingredient quantities by factor
   * ingredients: [{ name, qty, unit }]
   */
  static scaleIngredients(ingredients = [], fromServings = 1, toServings = 1) {
    const factor = toServings / (fromServings || 1);
    return (ingredients || []).map(i => ({
      name: i.name,
      qty: (Number(i.qty) || 0) * factor,
      unit: i.unit || ''
    }));
  }
}

module.exports = PortionScaler;
