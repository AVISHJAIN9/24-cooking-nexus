import React, { useState } from 'react';
import './trimmerStyles.css';

const TrimSlider = ({ duration, onRangeChange }) => {
  const [range, setRange] = useState({ start: 0, end: duration > 60 ? 60 : duration });

  const handleInput = (e, type) => {
    const value = parseFloat(e.target.value);
    const newRange = { ...range, [type]: value };
    
    // Logic: Prevent handles from crossing or being too close (3s minimum)
    if (type === 'start' && value < range.end - 3) {
      setRange(newRange);
      onRangeChange(newRange);
    } else if (type === 'end' && value > range.start + 3) {
      setRange(newRange);
      onRangeChange(newRange);
    }
  };

  return (
    <div className="trim-slider-container">
      <input 
        type="range" min="0" max={duration} step="0.1"
        value={range.start} onChange={(e) => handleInput(e, 'start')}
        className="thumb thumb-left"
      />
      <input 
        type="range" min="0" max={duration} step="0.1"
        value={range.end} onChange={(e) => handleInput(e, 'end')}
        className="thumb thumb-right"
      />
      <div className="slider-track" />
      <div className="slider-range-highlight" 
           style={{ 
             left: `${(range.start / duration) * 100}%`, 
             width: `${((range.end - range.start) / duration) * 100}%` 
           }} />
    </div>
  );
};

export default TrimSlider;
