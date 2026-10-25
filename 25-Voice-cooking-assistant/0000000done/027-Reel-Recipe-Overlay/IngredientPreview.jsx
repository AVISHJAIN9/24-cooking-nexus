import React from 'react';

const IngredientPreview = ({ ingredients }) => {
  const visibleIngredients = ingredients.slice(0, 3);
  return (
    <div className="ingredient-chips-container">
      {visibleIngredients.map((item, index) => (
        <div key={index} className="ingredient-chip">
          {item.name}
        </div>
      ))}
      {ingredients.length > 3 && (
        <div className="ingredient-chip more">+ {ingredients.length - 3} more</div>
      )}
    </div>
  );
};

export default IngredientPreview;
