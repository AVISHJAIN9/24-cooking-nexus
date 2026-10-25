/**
 * Adjusts the 'Strictness' of the AI based on environmental volume.
 */
export const calculateRequiredConfidence = (ambientNoiseLevel) => {
  // If the room is very loud (high ambient level), 
  // we increase the threshold to 0.92 to avoid false triggers.
  if (ambientNoiseLevel > 70) return 0.92; 
  
  // Standard quiet room threshold
  return 0.80;
};
