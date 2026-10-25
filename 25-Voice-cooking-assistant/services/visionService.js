const Safety = require('../models/SafetyLog');
const analyze = async (data) => {
  return await Safety.create({ hazard: 'Smoke Detected', level: 'High' });
};
module.exports = { analyze };