const Service = require('./055-AI-Ghost-Chef-Comparison.service');

exports.compare = async (req, res) => {
    try {
        const { prompt, chefs } = req.body;
        const result = await Service.compare(prompt, chefs, req.user?.id, req.ip);
        res.status(200).json({ success: true, comparisons: result });
    } catch (e) {
        res.status(500).json({ success: false, error: 'COMPARISON_ENGINE_FAILED' });
    }
};
