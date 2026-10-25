import { STTEngine } from './WebSpeechAPI';
import { validateTranscript } from './ConfidenceFilter';
import { getMicrophonePermission } from './AudioStream';

let engine = null;

/**
 * Initializes the 'Chef Ears'
 * @param {function} onCommandDetected - Callback for clean text strings
 */
export const initChefEars = async (onCommandDetected) => {
  const hasPermission = await getMicrophonePermission();
  
  if (hasPermission) {
    engine = new STTEngine();
    
    engine.start(
      (data) => {
        const cleanText = validateTranscript(data);
        if (cleanText) {
          onCommandDetected(cleanText);
        }
      },
      (error) => console.error("Speech Engine Error:", error)
    );
  }
};

export const stopChefEars = () => {
  if (engine) engine.stop();
};
