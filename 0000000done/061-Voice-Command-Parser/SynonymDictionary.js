/**
 * A lookup table for common kitchen variations.
 */
export const synonyms = {
  "continue": "play",
  "hold on": "pause",
  "jump ahead": "next",
  "go back": "back",
  "countdown": "timer",
  "finished": "done"
};

export const normalizeText = (text) => {
  let normalized = text.toLowerCase();
  Object.keys(synonyms).forEach(key => {
    if (normalized.includes(key)) {
      normalized = normalized.replace(key, synonyms[key]);
    }
  });
  return normalized;
};