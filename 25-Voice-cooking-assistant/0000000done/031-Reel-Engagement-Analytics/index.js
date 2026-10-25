import { startHeartbeat } from './HeartbeatTracker';
import { dispatchEvent } from './EventDispatcher';
import { trackExitPoint } from './RetentionMapper';

/**
 * Main Analytics Hook/Controller
 */
export const initReelAnalytics = (videoRef, reelId) => {
  // 1. Record the "View" start
  dispatchEvent({ reelId, type: 'VIEW_START', timestamp: Date.now() });

  // 2. Start the heartbeat pulse
  const stopHeartbeat = startHeartbeat(videoRef, reelId, (data) => {
    dispatchEvent({ ...data, type: 'WATCH_PROGRESS' });
  });

  // 3. Cleanup/Exit logic
  return () => {
    stopHeartbeat();
    const exitData = trackExitPoint(videoRef, reelId);
    if (exitData) dispatchEvent(exitData);
  };
};
