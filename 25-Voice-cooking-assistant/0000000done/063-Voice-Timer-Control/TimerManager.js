/**
 * Logic to interface with the 071-Kitchen-Timer-Engine.
 */
export const createTimerObject = (text, durationMs) => {
  // Try to find a label (e.g., "timer for PASTA")
  const words = text.split(" ");
  const forIndex = words.indexOf("for");
  const label = forIndex !== -1 ? words[forIndex + 1] : "Kitchen";

  return {
    id: `timer-${Date.now()}`,
    label: label.charAt(0).toUpperCase() + label.slice(1),
    duration: durationMs,
    remaining: durationMs,
    status: "RUNNING",
    createdAt: new Date()
  };
};
