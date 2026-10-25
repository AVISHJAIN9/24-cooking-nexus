/**
 * Prevents overlapping commands from Voice and Gesture.
 */
let lastTriggerTime = 0;
const COOLDOWN_MS = 1500; // 1.5 seconds ignore window

export const shouldExecuteAction = (actionType) => {
  const now = Date.now();
  if (now - lastTriggerTime < COOLDOWN_MS) {
    console.warn(`Ignoring ${actionType}: System in cooldown.`);
    return false;
  }
  
  lastTriggerTime = now;
  return true;
};

// Priority Logic: Voice usually overrules Gesture if both are detected
export const resolveConflict = (voiceIntent, gestureIntent) => {
  if (voiceIntent && voiceIntent !== 'UNKNOWN') return voiceIntent;
  return gestureIntent;
};
