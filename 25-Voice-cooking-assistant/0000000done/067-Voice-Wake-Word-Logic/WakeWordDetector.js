/**
 * Logic to identify the wake word.
 */
export const WAKE_WORD = "hey chef";

export const checkForTrigger = (transcript) => {
  const cleanText = transcript.toLowerCase().trim();
  
  // We use .includes() to catch the wake word even if 
  // the chef says "Hey Chef, what's next?" in one breath.
  return cleanText.includes(WAKE_WORD);
};
