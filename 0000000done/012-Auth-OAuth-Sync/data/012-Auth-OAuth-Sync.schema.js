const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    userId: { type: String, default: 'GUEST' },
    eventData: Object,
    actionType: { type: String, default: '012-Auth-OAuth-Sync' }
}, { timestamps: true });
module.exports = mongoose.model('012AuthOAuthSyncModel', schema);
