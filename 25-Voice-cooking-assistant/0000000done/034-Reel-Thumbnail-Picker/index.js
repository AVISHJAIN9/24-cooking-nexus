import React, { useState, useEffect } from 'react';
import { extractFrames } from './FrameExtractor';
import ThumbnailGrid from './ThumbnailGrid';
import HeroPreview from './HeroPreview';
import './thumbnailStyles.css';

const ThumbnailPicker = ({ videoFile, onSelectionComplete }) => {
  const [frames, setFrames] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (videoFile) {
       extractFrames(videoFile).then(setFrames);
    }
  }, [videoFile]);

  const handleComplete = () => {
    if (frames[selectedIndex]) {
      onSelectionComplete(frames[selectedIndex]);
    }
  };

  return (
    <div className="thumbnail-picker-wizard">
      <h3>Set Cover Photo</h3>
      <p className="hint">Choose a frame that makes your recipe look irresistible.</p>
      
      <HeroPreview frameData={frames[selectedIndex]} />
      
      <ThumbnailGrid 
        frames={frames} 
        selectedIndex={selectedIndex} 
        onSelect={setSelectedIndex} 
      />

      <button 
        className="confirm-btn"
        disabled={frames.length === 0}
        onClick={handleComplete}
      >
        Save Cover & Publish
      </button>
    </div>
  );
};

export default ThumbnailPicker;
