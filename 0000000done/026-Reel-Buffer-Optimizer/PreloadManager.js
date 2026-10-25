/**
 * Industry Logic: Look-ahead Preloader
 * Downloads the next few videos in the background.
 */
export const preloadNextReels = (currentIndex, reelArray) => {
  const PRELOAD_LIMIT = 2; // Preload 2 videos ahead
  
  for (let i = 1; i <= PRELOAD_LIMIT; i++) {
    const nextIndex = currentIndex + i;
    if (nextIndex < reelArray.length) {
      const videoUrl = reelArray[nextIndex].videoUrl;
      
      // Create a hidden link element to trigger browser prefetch
      const prefetchLink = document.createElement('link');
      prefetchLink.rel = 'prefetch';
      prefetchLink.as = 'video';
      prefetchLink.href = videoUrl;
      document.head.appendChild(prefetchLink);
    }
  }
};
