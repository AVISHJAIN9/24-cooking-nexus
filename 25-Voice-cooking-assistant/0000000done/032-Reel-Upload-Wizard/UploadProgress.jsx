import React from 'react';

const UploadProgress = ({ percent }) => {
  return (
    <div className="progress-container">
      <div className="progress-circle-wrapper">
        <svg viewBox="0 0 36 36" className="circular-chart">
          <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          <path className="circle" strokeDasharray={`${percent}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
        </svg>
        <div className="percentage">{percent}%</div>
      </div>
      <p>Baking your reel... Please stay on this page.</p>
    </div>
  );
};

export default UploadProgress;
