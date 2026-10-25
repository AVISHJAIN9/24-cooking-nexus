import { speak } from '../066-Voice-Text-to-Speech/SpeakerService';

/**
 * Formats the instruction and sends it to the TTS engine.
 */
export const announceStep = (stepNumber, instruction) => {
  // We add "Step X" prefix so the chef knows exactly where they are
  const formattedText = `Step ${stepNumber + 1}. ${instruction}`;
  
  // Use the TTS service from module 066
  speak(formattedText);
};

export const repeatStep = (instruction) => {
  speak(`Repeating: ${instruction}`);
};
