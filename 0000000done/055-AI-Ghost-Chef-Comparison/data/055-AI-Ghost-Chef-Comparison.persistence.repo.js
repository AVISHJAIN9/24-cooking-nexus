const Model = require('./055-AI-Ghost-Chef-Comparison.schema');
class ComparisonRepo {
    static async saveComparison(data) { return await Model.create(data); }
}
module.exports = ComparisonRepo;
