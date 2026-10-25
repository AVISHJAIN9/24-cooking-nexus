import { checkForTrigger } from './WakeWordDetector';
import { getPlatformConfig } from './SensitivityConfig';
import { playWakeSound } from './VisualFeedback';

let sessionTimer = null;

/**
 * Main Controller for the Wake Word Logic.
 * @param {string} transcript - From 065-STT
 * @param {boolean} currentStatus - Is the app already awake?
 * @param {function} setStatus - React state setter
 */
export const processWakeLogic = (transcript, currentStatus, setStatus) => {
  const config = getPlatformConfig();

  if (!currentStatus && checkForTrigger(transcript)) {
    // 1. Wake the system up
    setStatus(true);
    playWakeSound();

    // 2. Set a "Sleep Timer"
    // If no command is given within X seconds, go back to sleep.
    if (sessionTimer) clearTimeout(sessionTimer);
    sessionTimer = setTimeout(() => {
      setStatus(false);
    }, config.timeoutMs);

    return true; // System just woke up
  }

  return currentStatus; // Return current state
};
