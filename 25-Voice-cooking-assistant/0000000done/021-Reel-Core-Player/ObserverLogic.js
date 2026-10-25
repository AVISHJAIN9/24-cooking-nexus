/**
 * Industry Standard: Intersection Observer
 * Detects which Reel is currently visible to the user.
 */
export const createVideoObserver = (setActiveReelId) => {
  return new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          // Trigger the play logic for the visible reel
          setActiveReelId(entry.target.dataset.id);
        }
      });
    },
    { threshold: 0.6 } // Must be 60% visible to play
  );
};
