const Repo = require('../data/055-AI-Ghost-Chef-Comparison.persistence.repo');
const Audit = require('../../01-Core-Infrastructure/007-Auth-Audit-Logs/core/007-Auth-Audit-Logs.service');

class AIComparisonService {
    static async compare(prompt, chefs, userId, ip) {
        // Simulating parallel AI calls to different 'Ghost Chef' personas
        const comparisons = chefs.map(chef => ({
            chefName: chef,
            advice: `AI Generated advice for ${chef} regarding ${prompt}`,
            score: Math.floor(Math.random() * 100)
        }));

        await Repo.saveComparison({ userId, prompt, results: comparisons });
        await Audit.record(userId, 'AI_GHOST_COMPARISON_RUN', 'INFO', ip);
        
        return comparisons;
    }
}
module.exports = AIComparisonService;
