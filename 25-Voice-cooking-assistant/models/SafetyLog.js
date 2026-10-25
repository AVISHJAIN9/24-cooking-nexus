const mongoose = require('mongoose');
const safetySchema = new mongoose.Schema({
  hazard: { type: String, required: true },
  level: { type: String, default: 'Low' }
}, { timestamps: true });
module.exports = mongoose.model('Safety', safetySchema);