/**
 * Tracks "Watch Time" without overwhelming the network.
 */
export const startHeartbeat = (videoRef, reelId, onPulse) => {
  let watchTime = 0;
  
  const interval = setInterval(() => {
    if (videoRef.current && !videoRef.current.paused) {
      watchTime += 5;
      onPulse({
        reelId,
        duration: 5,
        totalTime: watchTime,
        timestamp: Date.now()
      });
    }
  }, 5000);

  return () => clearInterval(interval);
};
