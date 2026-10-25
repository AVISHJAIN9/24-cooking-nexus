/**
 * Extracts multiple frames from a video file to act as thumbnail options.
 */
export const extractFrames = (file, count = 8) => {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.src = URL.createObjectURL(file);
    video.muted = true;

    video.onloadedmetadata = async () => {
      const frames = [];
      // Calculate intervals to spread frames across the whole video
      const interval = video.duration / (count + 1);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      for (let i = 1; i <= count; i++) {
        video.currentTime = i * interval;
        // Wait for the video to seek to the frame
        await new Promise(r => video.onseeked = r);
        
        // Industry Standard: Downscale for UI performance
        canvas.width = video.videoWidth / 4; 
        canvas.height = video.videoHeight / 4;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        frames.push({
          time: video.currentTime,
          dataUrl: canvas.toDataURL('image/jpeg', 0.7)
        });
      }
      URL.revokeObjectURL(video.src); // Cleanup
      resolve(frames);
    };
  });
};
