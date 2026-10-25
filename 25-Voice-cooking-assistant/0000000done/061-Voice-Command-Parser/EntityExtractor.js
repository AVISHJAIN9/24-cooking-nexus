/**
 * Pulls variables (entities) out of the spoken string.
 */
export const extractEntities = (text, intent) => {
  const entities = {};

  if (intent === "SET_TIMER") {
    // Regex to find numbers in the string
    const numbers = text.match(/\d+/);
    entities.duration = numbers ? parseInt(numbers[0]) : 5; // Default to 5 mins
    entities.unit = text.includes("hour") ? "hours" : "minutes";
  }

  if (intent === "CHECKLIST_UPDATE") {
    // Basic logic to pull the ingredient name mentioned after "added" or "done"
    const keywords = ["added", "done", "check off"];
    for (const word of keywords) {
      if (text.includes(word)) {
        entities.item = text.split(word)[1]?.trim();
        break;
      }
    }
  }

  return entities;
};