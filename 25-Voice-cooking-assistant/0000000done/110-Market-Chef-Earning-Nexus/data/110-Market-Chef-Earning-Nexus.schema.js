const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    userId: { type: String, required: true },
    amount: { type: Number, default: 0 },
    type: { type: String, default: '110-Market-Chef-Earning-Nexus' },
    meta: Object
}, { timestamps: true });
module.exports = mongoose.model('110MarketChefEarningNexusModel', schema);
