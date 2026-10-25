import React, { useState } from 'react';
import { scaleIngredients } from '../core/portion.scaler';

const PortionScalerUI = ({ ingredients = [], onScale = () => {} }) => {
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(2);

  const handleScale = () => {
    const scaled = scaleIngredients(ingredients, Number(from), Number(to));
    onScale(scaled);
  };

  return (
    <div className="portion-scaler">
      <div>
        <label>From</label>
        <input type="number" value={from} onChange={e => setFrom(e.target.value)} />
      </div>
      <div>
        <label>To</label>
        <input type="number" value={to} onChange={e => setTo(e.target.value)} />
      </div>
      <button onClick={handleScale}>Scale</button>
    </div>
  );
};

export default PortionScalerUI;
