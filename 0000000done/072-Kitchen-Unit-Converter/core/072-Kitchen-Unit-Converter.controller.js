import UnitConverterService from './072-Kitchen-Unit-Converter.service';

const performConversion = async (req, res) => {
    try {
        const { amount, fromUnit, toUnit } = req.body;
        
        if (!amount || !fromUnit || !toUnit) {
            return res.status(400).json({ error: "Missing conversion parameters" });
        }

        const result = UnitConverterService.convert(amount, fromUnit, toUnit);
        
        res.status(200).json({
            status: "CONVERSION_SUCCESS",
            data: result
        });
    } catch (error) {
        res.status(400).json({ status: "CONVERSION_ERROR", message: error.message });
    }
};

export { performConversion };