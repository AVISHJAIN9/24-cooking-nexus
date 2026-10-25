import { isBackgroundNoise, stripFillerWords } from './FrequencyFilter';
import { calculateRequiredConfidence } from './GainController';

/**
 * Main Environmental Filter
 * @param {object} rawData - { text, confidence } from 065-STT
 * @returns {string|null} - Cleaned text or null if noise
 */
export const filterKitchenNoise = (rawData) => {
  const { text, confidence } = rawData;

  // 1. Check if the text is just "Fan Hiss" or "Steam"
  if (isBackgroundNoise(text)) return null;

  // 2. Apply a dynamic confidence threshold
  // (In a real app, you'd measure ambientNoiseLevel via Web Audio API)
  const threshold = calculateRequiredConfidence(40); 
  
  if (confidence < threshold) {
    console.warn("Noise filtered: Low confidence result.");
    return null;
  }

  // 3. Strip fillers like "Um... play video" -> "play video"
  return stripFillerWords(text);
};
