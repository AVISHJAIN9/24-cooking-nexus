const mongoose = require('mongoose');
const reportSchema = new mongoose.Schema({
    userId: String,
    reelId: String,
    result: Object,
}, { timestamps: true });
module.exports = mongoose.model('CopyrightReport', reportSchema);
