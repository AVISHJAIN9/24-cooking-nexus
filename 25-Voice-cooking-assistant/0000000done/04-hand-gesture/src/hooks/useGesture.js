import { useEffect, useRef } from "react";
import GestureService from "../services/GestureService";

export const useGesture = (videoElement, onGesture) => {
  const requestRef = useRef();

  const detect = async (recognizer, webcam) => {
    if (webcam.readyState === 4) {
      const results = recognizer.recognizeVideo(webcam, Date.now());
      if (results.gestures.length > 0) {
        onGesture(results.gestures[0][0].categoryName);
      }
    }
    requestRef.current = requestAnimationFrame(() => detect(recognizer, webcam));
  };

  return { detect, requestRef };
};