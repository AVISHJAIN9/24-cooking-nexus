const mongoose = require('mongoose');

/**
 * Project Nexus: Feature 099 - Health Monitor Schema
 * Responsibility: Persisting system vital snapshots for admin auditing.
 */
const healthLogSchema = new mongoose.Schema({
    status: { type: String, required: true },
    uptime: Number,
    memoryUsage: {
        heapUsed: Number,
        heapTotal: Number,
        rss: Number
    },
    loadAverage: [Number],
    timestamp: { type: Date, default: Date.now }
}, { expires: '7d' }); // Auto-purge logs older than 7 days to save space

module.exports = mongoose.model('HealthLog', healthLogSchema);