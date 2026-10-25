const Service = require('./009-Auth-Data-Masking.service');

exports.maskRequestData = async (req, res) => {
    try {
        const { rawData, type } = req.body;

        if (!rawData) {
            return res.status(400).json({ success: false, message: "No data provided" });
        }

        let maskedResult;
        switch (type) {
            case 'EMAIL':
                maskedResult = Service.maskEmail(rawData);
                break;
            case 'PHONE':
                maskedResult = Service.maskPhone(rawData);
                break;
            default:
                maskedResult = Service.totalObfuscation(rawData);
        }

        res.status(200).json({
            success: true,
            maskedData: maskedResult
        });
    } catch (error) {
        res.status(500).json({ success: false, error: "MASKING_OPERATION_FAILED" });
    }
};