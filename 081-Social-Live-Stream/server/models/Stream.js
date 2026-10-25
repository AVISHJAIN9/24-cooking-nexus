const mongoose = require('mongoose');
const StreamSchema = new mongoose.Schema({
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true },
  roomID: { type: String, required: true, unique: true },
  status: { type: String, enum: ['live', 'ended'], default: 'live' },
  viewerCount: { type: Number, default: 0 },
  startedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Stream', StreamSchema);
