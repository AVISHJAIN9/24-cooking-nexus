import React, { useState } from 'react';
import TrimSlider from './TrimSlider';
import VideoPreviewer from './VideoPreviewer';
import { getTrimMetadata } from './TimelineLogic';

const ReelEditor = ({ file, onComplete, onCancel }) => {
  const [range, setRange] = useState({ start: 0, end: 10 });
  const [duration, setDuration] = useState(0);

  const handleMetadata = (e) => {
    const d = e.target.duration;
    setDuration(d);
    setRange({ start: 0, end: d > 60 ? 60 : d });
  };

  return (
    <div className="editor-modal">
      <div className="editor-header">
        <button onClick={onCancel} className="cancel-btn">Cancel</button>
        <h3>Trim Reel</h3>
        <button 
          className="save-btn" 
          onClick={() => onComplete(getTrimMetadata(range))}
        >
          Done
        </button>
      </div>

      <VideoPreviewer file={file} range={range} />
      
      <video 
        onLoadedMetadata={handleMetadata}
        src={URL.createObjectURL(file)} 
        hidden 
      />

      <div className="trim-controls">
        <p className="hint">Drag handles to select the best part (max 60s)</p>
        <TrimSlider duration={duration} onRangeChange={setRange} />
      </div>
    </div>
  );
};

export default ReelEditor;
