/**
 * Buffers analytics events to save server resources.
 */
const EVENT_BUFFER = [];
const BUFFER_THRESHOLD = 3;

export const dispatchEvent = async (eventData) => {
  EVENT_BUFFER.push(eventData);

  // Buffer pattern: Only send to MERN backend when we hit the threshold
  if (EVENT_BUFFER.length >= BUFFER_THRESHOLD) {
    const payload = [...EVENT_BUFFER];
    EVENT_BUFFER.length = 0; 

    try {
      await fetch('/api/v1/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ events: payload })
      });
    } catch (err) {
      console.error("Analytics Sync Failed", err);
      // Optional: Restore buffer if failed to retry later
    }
  }
};
