/**
 * Captures a thumbnail frame from the video file using Canvas.
 */
export const generateThumbnail = (file) => {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    video.src = URL.createObjectURL(file);
    
    video.onloadeddata = () => {
      video.currentTime = 1; // Seek to 1 second to avoid black frames
    };

    video.onseeked = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      const dataUrl = canvas.toDataURL('image/jpeg');
      URL.revokeObjectURL(video.src); // Cleanup memory
      resolve(dataUrl);
    };
  });
};
