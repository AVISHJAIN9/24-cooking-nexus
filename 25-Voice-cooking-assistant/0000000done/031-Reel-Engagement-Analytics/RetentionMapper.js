/**
 * Maps the exit point of a user within the video duration.
 */
export const trackExitPoint = (videoRef, reelId) => {
  if (!videoRef.current) return null;
  
  const exitSecond = Math.floor(videoRef.current.currentTime);
  const totalDuration = Math.floor(videoRef.current.duration) || 1;

  return {
    reelId,
    type: 'EXIT_WATCH',
    percentComplete: (exitSecond / totalDuration) * 100,
    stoppedAt: exitSecond
  };
};
