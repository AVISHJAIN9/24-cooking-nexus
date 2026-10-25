import React from 'react';

const ReelGrid = ({ items, loading }) => {
  if (loading) return (
    <div className="grid-skeleton">
      {[...Array(6)].map((_, i) => <div key={i} className="skeleton-box" />)}
    </div>
  );
  
  if (!items || items.length === 0) return (
    <div className="empty-state">
      <i className="fas fa-utensils"></i>
      <p>No recipes found yet.</p>
    </div>
  );

  return (
    <div className="reel-grid">
      {items.map((reel) => (
        <div key={reel._id} className="grid-item">
          <img 
            src={reel.thumbnailUrl} 
            alt={reel.title} 
            loading="lazy" 
          />
          <div className="grid-overlay">
            <span><i className="fas fa-play"></i> {reel.views || 0}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReelGrid;
