import React, { useEffect, useRef, useState } from "react";
import GestureManager from "../services/GestureManager";

const ChefVideoPlayer = ({ videoSrc }) => {
  const videoRef = useRef(null);      // The Recipe Video
  const hiddenCamRef = useRef(null);  // The invisible camera feed
  const lastActionTime = useRef(0);   // To prevent double-clicks (Debounce)

  useEffect(() => {
    const setup = async () => {
      await GestureManager.initialize();
      const hasAccess = await GestureManager.startCamera(hiddenCamRef.current);
      if (hasAccess) requestAnimationFrame(predictLoop);
    };
    setup();
    return () => GestureManager.stop();
  }, []);

  const predictLoop = () => {
    if (GestureManager.recognizer && hiddenCamRef.current?.readyState === 4) {
      const results = GestureManager.recognizer.recognizeVideo(hiddenCamRef.current, Date.now());
      
      if (results.gestures.length > 0) {
        const gesture = results.gestures[0][0].categoryName;
        const score = results.gestures[0][0].score;
        
        // BETTERMENT: Only act if confidence is > 75% and 1.5s have passed
        if (score > 0.75 && Date.now() - lastActionTime.current > 1500) {
          executeCommand(gesture);
          lastActionTime.current = Date.now();
        }
      }
    }
    requestAnimationFrame(predictLoop);
  };

  const executeCommand = (gesture) => {
    const video = videoRef.current;
    switch (gesture) {
      case "Open_Palm": video.paused ? video.play() : video.pause(); break;
      case "Pointing_Up": video.currentTime += 10; break;   // Forward
      case "Victory": video.currentTime -= 10; break;      // Backward
      case "Thumb_Up": video.style.transform = "scale(1.3)"; break; // Zoom In
      case "Thumb_Down": video.style.transform = "scale(1)"; break; // Zoom Out
    }
  };

  return (
    <div className="video-container" style={{ position: 'relative' }}>
      {/* 1. The Recipe Video (What the chef sees) */}
      <video ref={videoRef} src={videoSrc} controls width="100%" />

      {/* 2. Hidden Camera (Industry secret: Keep it 1px/hidden) */}
      <video ref={hiddenCamRef} autoPlay style={{ display: 'none' }} />
      
      {/* 3. Small UI Indicator for the Chef */}
      <div className="gesture-indicator">Hand Control Active ✅</div>
    </div>
  );
};