const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    userId: { type: String, default: 'GUEST' },
    eventData: Object,
    actionType: { type: String, default: '018-Auth-SQL-Injection-Prevent' }
}, { timestamps: true });
module.exports = mongoose.model('018AuthSQLInjectionPreventModel', schema);
