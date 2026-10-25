import { CONVERSION_MAP } from '../data/072-Kitchen-Unit-Converter.types';

class UnitConverterService {
    /**
     * @param {number} amount - The value to convert
     * @param {string} fromUnit - Current unit (e.g., 'kg')
     * @param {string} toUnit - Target unit (e.g., 'g')
     */
    static convert(amount, fromUnit, toUnit) {
        // Find the unit family (mass or volume)
        const family = Object.keys(CONVERSION_MAP).find(f => 
            CONVERSION_MAP[f][fromUnit] && CONVERSION_MAP[f][toUnit]
        );

        if (!family) {
            throw new Error(`Incompatible units: Cannot convert ${fromUnit} to ${toUnit}`);
        }

        // Standardize to base unit (grams or milliliters)
        const baseAmount = amount * CONVERSION_MAP[family][fromUnit];
        
        // Convert from base to target
        const convertedAmount = baseAmount / CONVERSION_MAP[family][toUnit];

        return {
            original: { amount, unit: fromUnit },
            converted: { amount: parseFloat(convertedAmount.toFixed(3)), unit: toUnit },
            family
        };
    }
}

export default UnitConverterService;