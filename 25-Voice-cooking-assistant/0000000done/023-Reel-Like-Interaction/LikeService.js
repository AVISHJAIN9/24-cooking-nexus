/**
 * API Service to sync likes with MongoDB via Express.
 */
export const toggleLikeApi = async (reelId, shouldLike) => {
  try {
    const response = await fetch(`/api/v1/reels/${reelId}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: shouldLike ? 'like' : 'unlike' })
    });

    return response.ok; // Returns true if 200/201 OK
  } catch (error) {
    console.error("MERN Like Sync Error:", error);
    return false;
  }
};
