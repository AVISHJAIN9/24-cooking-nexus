const Repo = require('../data/051-Member-Personalized-Dashboard.repo');

class MemberDashboardService {
  /**
   * Returns personalized dashboard payload for a user
   * - aggregates recipe counts, recent activity, simple recommendations
   */
  static async getDashboardForUser(userId) {
    // 1. Fetch profile and related data from repo
    const profile = await Repo.getProfile(userId);
    const recipes = await Repo.getRecipesByUser(userId);
    const saved = await Repo.getSavedCount(userId);

    // 2. Compute basic stats
    const stats = {
      recipeCount: recipes.length,
      savedCount: saved,
      lastLogin: profile?.lastLogin || null
    };

    // 3. Lightweight recommendations (placeholder for ML/AI)
    const recommended = await Repo.getRecommendedForUser(userId, { limit: 5 });

    // 4. Recent activity: last 5 recipes created or saved
    const recent = (recipes || []).slice(0, 5).map(r => ({
      id: r._id || r.id,
      title: r.title,
      createdAt: r.createdAt
    }));

    return {
      profile: {
        id: profile?._id || profile?.id,
        name: profile?.username || profile?.name,
        avatar: profile?.avatar || null,
        bio: profile?.bio || ''
      },
      stats,
      recommended,
      recent
    };
  }
}

module.exports = MemberDashboardService;
