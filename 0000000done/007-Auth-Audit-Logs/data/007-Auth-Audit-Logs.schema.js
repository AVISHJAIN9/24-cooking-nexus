const mongoose = require('mongoose');
const auditSchema = new mongoose.Schema({
    userId: { type: String, default: 'SYSTEM' },
    action: { type: String, required: true },
    severity: { type: String, enum: ['INFO', 'WARNING', 'CRITICAL'] },
    ipAddress: String,
    details: Object
}, { timestamps: true });
module.exports = mongoose.model('AuditLog', auditSchema);