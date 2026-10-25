import React from 'react';

const GroceryList = ({ items = [] }) => {
  if (!items.length) return <div className="grocery-empty">No items</div>;
  return (
    <ul className="grocery-list">
      {items.map((it, i) => (
        <li key={i}>{it.name} — {it.qty} {it.unit}</li>
      ))}
    </ul>
  );
};

export default GroceryList;
