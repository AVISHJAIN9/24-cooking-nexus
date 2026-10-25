const Service = require('./051-Member-Personalized-Dashboard.service');

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user?.id || req.params.userId || req.query.userId;
    if (!userId) return res.status(400).json({ error: 'USER_ID_REQUIRED' });

    const payload = await Service.getDashboardForUser(userId);
    res.status(200).json({ success: true, data: payload });
  } catch (err) {
    console.error('Dashboard controller error', err);
    res.status(500).json({ success: false, error: 'DASHBOARD_ERROR' });
  }
};
exports.getDashboard = async (req, res) => {
  // Best practice: Only return necessary data to the UI
  const { username, recipes } = req.user;
  res.status(200).json({
    status: 'success',
    data: { name: username, recipeCount: recipes?.length || 0 }
  });
};
