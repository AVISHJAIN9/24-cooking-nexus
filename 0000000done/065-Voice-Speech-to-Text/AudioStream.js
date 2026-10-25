/**
 * Manages the Microphone hardware stream.
 * Checks if the browser supports MediaDevices before listening.
 */
export const getMicrophonePermission = async () => {
  try {
    // Standard web API to request audio access
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return !!stream; 
  } catch (err) {
    console.error("Chef denied microphone access or no mic found:", err);
    return false;
  }
};
