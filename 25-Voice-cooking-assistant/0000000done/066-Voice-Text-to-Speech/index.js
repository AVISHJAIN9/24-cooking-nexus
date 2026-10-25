import { SpeakerService } from './SpeakerService';
import { getPreferredVoice, CHEF_PROFILE } from './VoiceProfiles';
import { addToQueue } from './QueuingLogic';

const speaker = new SpeakerService();

/**
 * Main Speak Function
 * @param {string} text - Text to read aloud
 * @param {boolean} immediate - If true, cancels queue and speaks now
 */
export const speakToChef = (text, immediate = true) => {
  const voice = getPreferredVoice();
  const options = { ...CHEF_PROFILE, voice };

  if (immediate) {
    speaker.speak(text, options);
  } else {
    addToQueue(text, speaker, options);
  }
};

export const shutUpChef = () => speaker.stop();
