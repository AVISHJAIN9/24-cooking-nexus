const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    userId: { type: String, default: 'GUEST' },
    eventData: Object,
    actionType: { type: String, default: '014-Auth-Biometric-Hands-Free' }
}, { timestamps: true });
module.exports = mongoose.model('014AuthBiometricHandsFreeModel', schema);
