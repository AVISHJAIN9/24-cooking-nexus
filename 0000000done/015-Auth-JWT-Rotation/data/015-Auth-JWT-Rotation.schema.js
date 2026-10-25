const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    userId: { type: String, default: 'GUEST' },
    eventData: Object,
    actionType: { type: String, default: '015-Auth-JWT-Rotation' }
}, { timestamps: true });
module.exports = mongoose.model('015AuthJWTRotationModel', schema);
