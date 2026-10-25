/**
 * VAD (Voice Activity Detection) - Simplified
 */
let silenceTimer = null;

export const monitorSilence = (onSilence) => {
  if (silenceTimer) clearTimeout(silenceTimer);

  // If no audio event occurs for 30 seconds, we pause the listener
  silenceTimer = setTimeout(() => {
    onSilence();
  }, 30000);
};
