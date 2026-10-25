/**
 * Industry Logic: Weighted Ranking Algorithm
 * Calculates which reels should appear at the top of the MERN feed.
 */
export const rankReels = (reels, userPreferences) => {
  return reels.sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;

    // 1. Tag Matching (e.g., if user likes 'Vegan')
    if (a.tags.some(tag => userPreferences.favoriteTags.includes(tag))) scoreA += 10;
    if (b.tags.some(tag => userPreferences.favoriteTags.includes(tag))) scoreB += 10;

    // 2. Trending Weight (Views and Likes)
    scoreA += (a.likes * 0.5) + (a.views * 0.1);
    scoreB += (b.likes * 0.5) + (b.views * 0.1);

    // 3. Newness Factor (Fresh content gets a boost)
    const now = new Date();
    scoreA += (1 / (now - new Date(a.createdAt))) * 1000000;
    scoreB += (1 / (now - new Date(b.createdAt))) * 1000000;

    return scoreB - scoreA;
  });
};
