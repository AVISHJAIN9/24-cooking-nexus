/**
 * Filters out high-frequency background noise patterns.
 */
export const isBackgroundNoise = (transcript) => {
  const noisePatterns = ["shhhhh", "sssss", "ffffff"]; // Common steam/fan sounds
  const text = transcript.toLowerCase();

  // If the transcript is just a long string of sibilant sounds, it's noise
  return noisePatterns.some(pattern => text.includes(pattern) && text.length > 5);
};

export const stripFillerWords = (text) => {
  // Remove "Um", "Uh", and background chatter fillers
  return text.replace(/\b(um|uh|err|ah)\b/g, "").trim();
};
