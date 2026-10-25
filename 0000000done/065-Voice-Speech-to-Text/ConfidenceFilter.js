/**
 * Industry Level Filter:
 * Ensures we don't act on low-quality audio or background noise.
 */
export const validateTranscript = (data, threshold = 0.8) => {
  const { text, confidence, isFinal } = data;

  // We only act on 'Final' results with high AI confidence
  // This prevents 'Ghost Commands' from background kitchen noise
  if (isFinal && confidence >= threshold) {
    return text;
  }
  
  // Return null if the result is just a guess or noise
  return null;
};
