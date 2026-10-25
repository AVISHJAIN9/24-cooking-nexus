const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: String,
  avatar: String,
  bio: String,
  preferences: Object,
  recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
  savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
  lastLogin: Date
}, { timestamps: true });

module.exports = mongoose.model('MemberProfile', ProfileSchema);
