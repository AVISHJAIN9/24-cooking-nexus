const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    userId: { type: String, default: 'GUEST' },
    eventData: Object,
    actionType: { type: String, default: '010-Auth-Multi-Signature' }
}, { timestamps: true });
module.exports = mongoose.model('010AuthMultiSignatureModel', schema);
