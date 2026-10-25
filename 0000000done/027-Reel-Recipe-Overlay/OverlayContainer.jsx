import React from 'react';
import MetadataDetails from './MetadataDetails';
import IngredientPreview from './IngredientPreview';
import './overlayStyles.css';

const OverlayContainer = ({ reelData }) => {
  return (
    <div className="reel-overlay-root">
      {/* Bottom-weighted gradient for text readability */}
      <div className="overlay-scrim" />
      
      <div className="overlay-content-wrapper">
        <MetadataDetails 
          chefName={reelData.author.username} 
          title={reelData.title} 
          audioName={reelData.audioTrackName}
        />
        
        <IngredientPreview 
          ingredients={reelData.ingredients} 
        />
      </div>
    </div>
  );
};

export default OverlayContainer;
