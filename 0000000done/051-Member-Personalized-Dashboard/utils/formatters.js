exports.truncate = (text, len = 120) => {
  if (!text) return '';
  return text.length > len ? text.slice(0, len - 1) + '…' : text;
};
