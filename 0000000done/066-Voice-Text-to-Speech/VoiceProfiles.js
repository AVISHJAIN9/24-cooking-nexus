/**
 * Manages different voice personas.
 */
export const getPreferredVoice = (lang = 'en-US') => {
  const voices = window.speechSynthesis.getVoices();
  
  // Try to find a high-quality "Natural" voice first
  const preferred = voices.find(v => v.lang === lang && v.name.includes('Google'));
  
  // Fallback to the first available voice for that language
  return preferred || voices.find(v => v.lang === lang) || voices;
};

export const CHEF_PROFILE = {
  rate: 0.85,  // Slower for instructions
  pitch: 1.1   // Slightly higher for "Friendly Assistant" feel
};
