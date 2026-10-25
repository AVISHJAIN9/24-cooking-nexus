/**
 * Simple queue to handle multiple speech requests.
 */
let speechQueue = [];
let isSpeaking = false;

export const addToQueue = (text, speakerInstance, options) => {
  speechQueue.push({ text, options });
  
  if (!isSpeaking) {
    processQueue(speakerInstance);
  }
};

const processQueue = (speakerInstance) => {
  if (speechQueue.length === 0) {
    isSpeaking = false;
    return;
  }

  isSpeaking = true;
  const { text, options } = speechQueue.shift();
  
  speakerInstance.speak(text, options);

  // Monitor when the speech ends to start the next one
  const checkStatus = setInterval(() => {
    if (!window.speechSynthesis.speaking) {
      clearInterval(checkStatus);
      processQueue(speakerInstance);
    }
  }, 200);
};
