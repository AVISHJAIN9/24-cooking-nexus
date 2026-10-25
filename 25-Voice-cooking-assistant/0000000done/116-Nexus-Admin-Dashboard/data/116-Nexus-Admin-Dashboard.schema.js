const mongoose = require('mongoose');

const dashboardSnapshotSchema = new mongoose.Schema({
    snapshotDate: { type: Date, default: Date.now },
    totalUserCount: Number,
    systemUptime: String,
    activeAlerts: [String]
}, { timestamps: true });

module.exports = mongoose.model('AdminDashboardSnapshot', dashboardSnapshotSchema);