const mongoose = require('mongoose');
const comparisonSchema = new mongoose.Schema({
    userId: String,
    prompt: String,
    results: Array
}, { timestamps: true });
module.exports = mongoose.model('GhostComparison', comparisonSchema);
