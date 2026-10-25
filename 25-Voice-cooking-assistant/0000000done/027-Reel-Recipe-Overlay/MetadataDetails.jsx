import React from 'react';

const MetadataDetails = ({ chefName, title, audioName }) => {
  return (
    <div className="metadata-section">
      <h3 className="chef-handle">@{chefName}</h3>
      <p className="recipe-description">{title}</p>
      
      <div className="audio-ticker">
        <i className="fas fa-music"></i>
        <div className="marquee">
          <span>{audioName || 'Original Audio'}</span>
        </div>
      </div>
    </div>
  );
};

export default MetadataDetails;
