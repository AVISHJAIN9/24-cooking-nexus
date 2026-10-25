import React, { useState } from 'react';
import ProductQuickCard from './ProductQuickCard';
import './visualSearch.css';

const DetectionOverlay = ({ hotspots }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="detection-layer">
      {hotspots.map((spot) => (
        <div
          key={spot.id}
          className="search-hotspot"
          style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
          onClick={() => setSelectedProduct(spot)}
        >
          <div className="hotspot-pulse" />
        </div>
      ))}

      {selectedProduct && (
        <ProductQuickCard 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

export default DetectionOverlay;
