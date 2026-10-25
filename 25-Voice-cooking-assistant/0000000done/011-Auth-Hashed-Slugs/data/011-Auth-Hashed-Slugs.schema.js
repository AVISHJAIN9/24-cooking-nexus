const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    userId: { type: String, default: 'GUEST' },
    eventData: Object,
    actionType: { type: String, default: '011-Auth-Hashed-Slugs' }
}, { timestamps: true });
module.exports = mongoose.model('011AuthHashedSlugsModel', schema);
