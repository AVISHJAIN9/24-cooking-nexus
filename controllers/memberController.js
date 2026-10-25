const memberService = require('../services/memberService');
const getProfile = async (req, res) => {
  try {
    const data = await memberService.getMemberData(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = { getProfile };
