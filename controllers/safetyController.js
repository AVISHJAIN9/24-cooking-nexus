const vision = require('../services/visionService');
const detect = async (req, res) => {
  try {
    const result = await vision.analyze(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = { detect };