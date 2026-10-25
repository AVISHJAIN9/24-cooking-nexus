// SCHEMA
const mongoose = require('mongoose');
const exportSchema = new mongoose.Schema({
    recipeId: String,
    exportDate: { type: Date, default: Date.now }
});
module.exports = mongoose.model('ExportLog', exportSchema);

// REPO
const ExportLog = require('./074-Kitchen-PDF-Export.schema');
class PDFRepo {
    static async logExport(recipeId) {
        return await ExportLog.create({ recipeId });
    }
}
module.exports = PDFRepo;