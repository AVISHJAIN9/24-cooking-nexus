import React, { useRef, useEffect } from 'react';

const VideoPreviewer = ({ file, range }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      // Loop the preview within the selected trim range
      if (video.currentTime >= range.end) {
        video.currentTime = range.start;
      }
      if (video.currentTime < range.start) {
        video.currentTime = range.start;
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [range]);

  return (
    <div className="trim-preview-window">
      <video 
        ref={videoRef}
        src={URL.createObjectURL(file)} 
        controls={false}
        autoPlay
        muted
        playsInline
        className="editor-video"
      />
      <div className="time-display">
        <span>{range.start.toFixed(1)}s</span> — <span>{range.end.toFixed(1)}s</span>
        <div className="duration-pill">{(range.end - range.start).toFixed(1)}s total</div>
      </div>
    </div>
  );
};

export default VideoPreviewer;
