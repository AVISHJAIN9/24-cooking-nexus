const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    userId: { type: String, default: 'GUEST' },
    eventData: Object,
    actionType: { type: String, default: '013-Auth-Self-Deletion' }
}, { timestamps: true });
module.exports = mongoose.model('013AuthSelfDeletionModel', schema);
