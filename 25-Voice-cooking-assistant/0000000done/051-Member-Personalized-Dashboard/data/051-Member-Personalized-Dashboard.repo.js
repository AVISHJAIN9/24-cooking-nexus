const Profile = require('./051-Member-Personalized-Dashboard.schema');

// Lightweight repository that centralizes DB access. Replace or extend as needed.
class MemberRepo {
  static async getProfile(userId) {
    if (!userId) return null;
    return await Profile.findOne({ _id: userId }).lean();
  }

  static async getRecipesByUser(userId) {
    // In a real system this would query the Recipe model; here we return array placeholder
    const p = await Profile.findById(userId).populate({ path: 'recipes', options: { sort: { createdAt: -1 }, limit: 50 } }).lean();
    return p?.recipes || [];
  }

  static async getSavedCount(userId) {
    const p = await Profile.findById(userId).lean();
    return (p?.savedRecipes || []).length;
  }

  static async getRecommendedForUser(userId, { limit = 5 } = {}) {
    // Placeholder for recommendation engine - return mock data
    return Array.from({ length: limit }).map((_, i) => ({ id: `rec-${i}`, title: `Recommended Recipe ${i+1}` }));
  }
}

module.exports = MemberRepo;
