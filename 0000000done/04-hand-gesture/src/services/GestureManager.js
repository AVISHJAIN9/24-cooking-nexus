import { GestureRecognizer, FilesetResolver } from "@mediapipe/tasks-vision";

class GestureManager {
  constructor() {
    this.recognizer = null;
    this.stream = null;
  }

  async initialize() {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );
    
    this.recognizer = await GestureRecognizer.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
        delegate: "GPU" // Uses graphics card for smoothness
      },
      runningMode: "VIDEO",
      numHands: 1,
      minHandDetectionConfidence: 0.7, // High threshold = fewer false pauses
      minTrackingConfidence: 0.7
    });
  }

  async startCamera(videoElement) {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480, facingMode: "user" } 
      });
      videoElement.srcObject = this.stream;
      return true;
    } catch (err) {
      console.error("Chef denied camera access:", err);
      return false;
    }
  }

  stop() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }
  }
}

export default new GestureManager();