/**
 * Communicates with the MERN Backend to fetch user profiles.
 */
export const fetchProfileData = async (userId) => {
  try {
    const response = await fetch(`/api/v1/users/${userId}/profile`);
    return await response.json();
  } catch (err) {
    console.error("Profile Fetch Failed", err);
    return null;
  }
};

export const fetchUserReels = async (userId, type = 'posts') => {
  try {
    // type: 'posts' (creator's own) or 'saved' (bookmarked)
    const response = await fetch(`/api/v1/users/${userId}/reels?type=${type}`);
    const result = await response.json();
    return result.data || [];
  } catch (err) {
    console.error("Reel Grid Fetch Failed", err);
    return [];
  }
};
