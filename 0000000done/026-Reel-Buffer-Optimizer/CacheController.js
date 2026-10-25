/**
 * Manages Video Blobs to prevent re-fetching from the MERN server.
 */
const videoCache = new Map();

export const getCachedVideo = async (url) => {
  if (videoCache.has(url)) {
    return videoCache.get(url);
  }

  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    
    // Limit cache size to 10 videos to save device memory
    if (videoCache.size > 10) {
      const firstKey = videoCache.keys().next().value;
      URL.revokeObjectURL(videoCache.get(firstKey));
      videoCache.delete(firstKey);
    }

    videoCache.set(url, blobUrl);
    return blobUrl;
  } catch (err) {
    return url; // Fallback to original URL if caching fails
  }
};
