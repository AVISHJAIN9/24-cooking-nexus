/**
 * Maps raw text to a specific system action.
 */
export const mapIntent = (transcript) => {
  const text = transcript.toLowerCase();

  // Video Navigation Intents
  if (text.includes("pause") || text.includes("stop") || text.includes("wait")) {
    return "VIDEO_PAUSE";
  }
  if (text.includes("play") || text.includes("resume") || text.includes("go")) {
    return "VIDEO_PLAY";
  }
  if (text.includes("next") || text.includes("forward") || text.includes("skip")) {
    return "VIDEO_FORWARD";
  }
  if (text.includes("back") || text.includes("previous") || text.includes("rewind")) {
    return "VIDEO_BACKWARD";
  }

  // Kitchen Utility Intents
  if (text.includes("timer") || text.includes("alarm") || text.includes("remind")) {
    return "SET_TIMER";
  }
  if (text.includes("check") || text.includes("done") || text.includes("added")) {
    return "CHECKLIST_UPDATE";
  }

  return "UNKNOWN_INTENT";
};