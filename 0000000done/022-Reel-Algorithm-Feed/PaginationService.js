/**
 * Fetches paginated data from the MongoDB/Express API.
 */
export const fetchRecommendedReels = async (userId, page = 1) => {
  try {
    const response = await fetch(`/api/v1/reels/feed?userId=${userId}&page=${page}&limit=5`);
    const result = await response.json();
    
    // In an industry-level app, we would shuffle or rank here if 
    // the backend hasn't already done it.
    return result.data; 
  } catch (error) {
    console.error("Algorithm Feed Error: Failed to fetch reels", error);
    return [];
  }
};
