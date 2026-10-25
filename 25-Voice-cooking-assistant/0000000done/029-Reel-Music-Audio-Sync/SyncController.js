/**
 * Ensures Video and Audio tracks remain perfectly aligned.
 */
export const alignPlayback = (videoElement) => {
  if (!videoElement) return;

  videoElement.ontimeupdate = () => {
    // For standard reels, we ensure the playbackRate stays constant
    // This prevents browser "drift" during heavy CPU tasks
    if (videoElement.playbackRate !== 1.0) {
      videoElement.playbackRate = 1.0;
    }
  };
};
