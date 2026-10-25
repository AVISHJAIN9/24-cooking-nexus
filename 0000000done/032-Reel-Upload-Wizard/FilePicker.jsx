import React from 'react';

const FilePicker = ({ onFileSelect }) => {
  const handleDrop = (e) => {
    const file = e.target.files;
    
    // Validate size (100MB limit) and type
    if (file && file.size < 100 * 1024 * 1024 && file.type.startsWith('video/')) {
      onFileSelect(file);
    } else {
      alert("Please upload a video file under 100MB.");
    }
  };

  return (
    <div className="upload-drop-zone">
      <input type="file" accept="video/*" onChange={handleDrop} id="video-input" hidden />
      <label htmlFor="video-input" className="drop-label">
        <i className="fas fa-cloud-upload-alt"></i>
        <span>Tap to upload your recipe reel</span>
        <p className="file-hint">MP4, WebM or MOV (Max 100MB)</p>
      </label>
    </div>
  );
};

export default FilePicker;
