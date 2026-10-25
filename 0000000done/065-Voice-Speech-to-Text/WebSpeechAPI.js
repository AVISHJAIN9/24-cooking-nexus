/**
 * The primary Speech-to-Text Engine.
 * Uses window.SpeechRecognition for real-time processing.
 */
export class STTEngine {
  constructor(lang = 'en-US') {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      throw new Error("Speech Recognition not supported in this browser.");
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;     // Stay active while cooking
    this.recognition.interimResults = true; // Show results while the chef speaks
    this.recognition.lang = lang;
  }

  start(onTranscript, onError) {
    this.recognition.onresult = (event) => {
      // Get the most recent phrase spoken
      const resultIndex = event.resultIndex;
      const transcript = event.results[resultIndex].transcript;
      const confidence = event.results[resultIndex].confidence;
      const isFinal = event.results[resultIndex].isFinal;

      // Send to the filter to check for accuracy
      onTranscript({ 
        text: transcript.toLowerCase().trim(), 
        confidence, 
        isFinal 
      });
    };

    this.recognition.onerror = (event) => onError(event.error);
    this.recognition.start();
  }

  stop() {
    this.recognition.stop();
  }
}
