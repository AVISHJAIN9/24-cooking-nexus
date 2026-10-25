// Utility: parse minutes/seconds/hours into milliseconds
exports.parseToMs = (text) => {
  if (!text || typeof text !== 'string') return 5 * 60 * 1000;
  const lower = text.toLowerCase();
  const num = Number((text.match(/\d+/) || [5])[0]);
  if (lower.includes('hour') || lower.includes('hr')) return num * 3600 * 1000;
  if (lower.includes('second') || lower.includes('sec')) return num * 1000;
  return num * 60 * 1000;
};
