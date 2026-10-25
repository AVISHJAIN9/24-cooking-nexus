import { speak } from '../066-Voice-Text-to-Speech/SpeakerService';

/**
 * Uses the TTS engine to alert the chef.
 */
export const playVoiceAlert = (label) => {
  const messages = [
    `Chef, your ${label} timer is finished.`,
    `Time is up for the ${label}.`,
    `Attention: The ${label} is ready.`
  ];
  
  // Pick a random message for a more "human" feel
  const alert = messages[Math.floor(Math.random() * messages.length)];
  speak(alert);
};
