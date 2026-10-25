import React from 'react';

const HeroPreview = ({ frameData }) => {
  if (!frameData) return (
    <div className="preview-placeholder">
       <div className="spinner"></div>
       <p>Extracting delicious frames...</p>
    </div>
  );

  return (
    <div className="hero-preview-container">
      <img src={frameData.dataUrl} className="hero-img" alt="Selected Thumbnail" />
      <div className="preview-badge">Cover Preview</div>
    </div>
  );
};

export default HeroPreview;
