/**
 * Configuration for different hardware environments.
 */
export const GESTURE_SENSITIVITY = {
  LAPTOP: {
    confidenceThreshold: 0.7, // Closer mic, can be stricter
    timeoutMs: 5000           // Stay active for 5s after wake
  },
  SMART_TV: {
    confidenceThreshold: 0.5, // Distant mic, needs to be more lenient
    timeoutMs: 8000           // Stay active longer for distance
  }
};

export const getPlatformConfig = () => {
  // Simple check for TV-sized screens vs Laptops
  return window.innerWidth > 1200 ? GESTURE_SENSITIVITY.SMART_TV : GESTURE_SENSITIVITY.LAPTOP;
};
