const Service = require('./034-Reel-Copyright-Validator.service');

exports.scanReel = async (req, res) => {
    try {
        const { reelId, contentHash } = req.body;
        const result = await Service.validateContent({ id: reelId, hash: contentHash }, req.user?.id, req.ip);
        
        res.status(200).json({ 
            success: true, 
            report: result,
            nexus_action: result.status === 'CLEARED' ? 'PROCEED_TO_PUBLISH' : 'BLOCK_UPLOAD'
        });
    } catch (e) {
        res.status(500).json({ success: false, error: 'COPYRIGHT_SCAN_FAILED' });
    }
};
