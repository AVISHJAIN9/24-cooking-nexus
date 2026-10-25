const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    userId: { type: String, default: 'GUEST' },
    eventData: Object,
    actionType: { type: String, default: '020-Auth-Brute-Force-Lockout' }
}, { timestamps: true });
module.exports = mongoose.model('020AuthBruteForceLockoutModel', schema);
