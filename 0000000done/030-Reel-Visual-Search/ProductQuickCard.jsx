import React from 'react';

const ProductQuickCard = ({ product, onClose }) => {
  return (
    <div className="product-quick-card">
      <button className="close-card" onClick={onClose}>×</button>
      <img src={product.image} alt={product.name} className="product-thumb" />
      <div className="product-info">
        <h4>{product.name}</h4>
        <p className="price">${product.price}</p>
        <a href={product.affiliateLink} target="_blank" rel="noreferrer" className="buy-btn">
          View Details
        </a>
      </div>
    </div>
  );
};

export default ProductQuickCard;
