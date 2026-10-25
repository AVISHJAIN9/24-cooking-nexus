/**
 * Filters hotspots based on the current timestamp of the video.
 */
export const getActiveHotspots = (allHotspots, currentTime) => {
  if (!allHotspots) return [];
  return allHotspots.filter(spot => 
    currentTime >= spot.startTime && currentTime <= spot.endTime
  );
};

export const formatCoordinate = (rawX, rawY, containerRect) => {
  // Converts pixel clicks to percentage for responsive TV/Mobile layouts
  return {
    x: (rawX / containerRect.width) * 100,
    y: (rawY / containerRect.height) * 100
  };
};
