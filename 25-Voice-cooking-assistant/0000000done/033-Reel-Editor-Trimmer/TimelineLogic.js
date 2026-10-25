/**
 * Formats time for FFmpeg processing on the backend.
 * Example: 00:00:05.500
 */
export const formatFFmpegTime = (seconds) => {
  const date = new Date(0);
  date.setSeconds(seconds);
  const timeString = date.toISOString().substr(11, 8);
  const ms = (seconds % 1).toFixed(3).substring(2);
  return `${timeString}.${ms}`;
};

export const getTrimMetadata = (range) => {
  return {
    startTime: formatFFmpegTime(range.start),
    duration: (range.end - range.start).toFixed(2),
    rawSeconds: range.end - range.start
  };
};
