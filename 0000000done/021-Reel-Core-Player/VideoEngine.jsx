import React, { useRef, useEffect } from 'react';
import './player.css';

const VideoEngine = ({ url, isActive, isMuted }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(err => console.log("Autoplay blocked"));
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0; // Reset for next view
      }
    }
  }, [isActive]);

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        src={url}
        className="reel-video-element"
        loop
        muted={isMuted}
        playsInline
        preload="auto"
      />
    </div>
  );
};

export default VideoEngine;
