const mongoose = require('mongoose');
const chatSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    role: { type: String, enum: ['user', 'assistant'] },
    content: String
}, { timestamps: true });
module.exports = mongoose.model('ChatHistory', chatSchema);