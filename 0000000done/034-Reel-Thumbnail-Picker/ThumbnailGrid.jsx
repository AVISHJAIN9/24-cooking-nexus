import React from 'react';

const ThumbnailGrid = ({ frames, selectedIndex, onSelect }) => {
  return (
    <div className="thumbnail-filmstrip">
      {frames.map((frame, index) => (
        <div 
          key={index} 
          className={`thumbnail-option ${selectedIndex === index ? 'active' : ''}`}
          onClick={() => onSelect(index)}
        >
          <img src={frame.dataUrl} alt={`Frame at ${frame.time}s`} />
          <div className="selection-indicator">✓</div>
        </div>
      ))}
    </div>
  );
};

export default ThumbnailGrid;
