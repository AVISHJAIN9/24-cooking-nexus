import { parseTimeToMs } from './DurationParser';
import { createTimerObject } from './TimerManager';
import { playVoiceAlert } from './VoiceAlarm';

/**
 * Main Controller for Voice-Activated Timers
 */
export const handleTimerVoiceCommand = (transcript, currentTimers, setTimers) => {
  const text = transcript.toLowerCase();

  // 1. Logic for "Set Timer"
  if (text.includes("set") || text.includes("start")) {
    const ms = parseTimeToMs(text);
    const newTimer = createTimerObject(text, ms);
    
    // Update React State / Redux
    setTimers([...currentTimers, newTimer]);
    return `Started a ${ms / 60000} minute timer for ${newTimer.label}.`;
  }

  // 2. Logic for "Stop Timer"
  if (text.includes("stop") || text.includes("cancel")) {
    setTimers([]); // Industry simplification: stops all timers
    return "All timers have been cancelled.";
  }

  return null;
};
