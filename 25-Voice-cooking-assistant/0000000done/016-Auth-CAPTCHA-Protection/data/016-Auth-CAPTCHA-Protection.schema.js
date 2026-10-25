const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    userId: { type: String, default: 'GUEST' },
    eventData: Object,
    actionType: { type: String, default: '016-Auth-CAPTCHA-Protection' }
}, { timestamps: true });
module.exports = mongoose.model('016AuthCAPTCHAProtectionModel', schema);
