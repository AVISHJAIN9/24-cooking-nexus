import { mapIntent } from './IntentMapper';
import { extractEntities } from './EntityExtractor';
import { normalizeText } from './SynonymDictionary';

/**
 * Main Parser Function
 * @param {string} rawTranscript - The raw text from Speech-to-Text
 * @returns {object} - Structured command for the UI
 */
export const parseVoiceCommand = (rawTranscript) => {
  // 1. Clean the text
  const cleanText = normalizeText(rawTranscript);

  // 2. Determine what they want to do
  const intent = mapIntent(cleanText);

  // 3. Get the details (time, ingredient names, etc)
  const entities = extractEntities(cleanText, intent);

  // 4. Return the "Command Object"
  return {
    intent,
    entities,
    timestamp: Date.now(),
    raw: rawTranscript
  };
};