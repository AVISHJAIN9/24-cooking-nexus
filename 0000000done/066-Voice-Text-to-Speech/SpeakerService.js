/**
 * Core Speaker Service.
 * Interfaces with the Web Speech Synthesis API.
 */
export class SpeakerService {
  constructor() {
    this.synth = window.speechSynthesis;
  }

  /**
   * Performs the actual speech.
   * @param {string} text - The words to say.
   * @param {object} options - Pitch, rate, and voice settings.
   */
  speak(text, options = {}) {
    // Stop any current speech so messages don't blur together
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Industry Standards for "Chef Voice": Slightly slower for clarity
    utterance.rate = options.rate || 0.9; 
    utterance.pitch = options.pitch || 1.0;
    utterance.volume = options.volume || 1.0;
    
    if (options.voice) {
      utterance.voice = options.voice;
    }

    this.synth.speak(utterance);
  }

  stop() {
    this.synth.cancel();
  }
}
