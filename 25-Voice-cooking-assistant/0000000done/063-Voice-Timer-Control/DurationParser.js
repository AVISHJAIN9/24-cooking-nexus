/**
 * Converts natural language time into milliseconds.
 */
export const parseTimeToMs = (text) => {
  const numbers = text.match(/\d+/g); // Finds numbers in string
  if (!numbers) return 60000 * 5; // Default to 5 minutes if no number found

  const value = parseInt(numbers);
  
  if (text.includes("hour")) return value * 3600000;
  if (text.includes("second")) return value * 1000;
  
  // Default to minutes
  return value * 60000;
};
