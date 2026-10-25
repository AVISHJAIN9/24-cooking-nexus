/**
 * Project Nexus: Feature 071 - The Universal Constant Engine
 * Logic: Multi-Phase Physics Scaling (Solid, Liquid, Gas, and Phase Change)
 */
class KitchenTimerEngine {
    /**
     * UNIVERSAL MATERIAL CONSTANTS
     * These describe the physical behavior of food, not the name of the dish.
     */
    static get PHYSICS_MAP() {
        return {
            // High water content, convection based (Sambar, Ramen, Soup)
            AQUEOUS: { diffusivity: 0.14, viscosity: 1.0, latentHeat: 2260 },
            // High fat/protein, conduction based (Meat, Tandoori, Steaks)
            LIPID_FIBER: { diffusivity: 0.08, viscosity: 5.4, latentHeat: 0 },
            // Starch-heavy, thickening during cooking (Dal, Risotto, Porridge)
            AMYLOID: { diffusivity: 0.11, viscosity: 15.0, latentHeat: 500 },
            // Rapid surface reaction, negligible internal heating (Tadka, Stir-fry)
            KINETIC_SURFACE: { diffusivity: 0.02, viscosity: 0.1, latentHeat: 0 }
        };
    }

    /**
     * The "Nexus-Omega" Scaling Formula
     * @param {number} t_base - Original time (mins)
     * @param {number} m_ratio - Scale factor (e.g., 200x for a wedding)
     * @param {string} material - AQUEOUS | LIPID_FIBER | AMYLOID | KINETIC_SURFACE
     */
    static calculate(t_base, m_ratio, material) {
        if (!t_base || m_ratio === 1) return t_base;

        const p = this.PHYSICS_MAP[material] || this.PHYSICS_MAP.AQUEOUS;
        
        /**
         * 1. VOLUME-SURFACE RATIO (The Square-Cube Law)
         * As volume increases, the surface area relatively decreases.
         * We use p.diffusivity to adjust the curve.
         */
        const scalingExponent = 0.5 + (p.diffusivity * 2); 
        let t_scaled = t_base * Math.pow(m_ratio, scalingExponent);

        /**
         * 2. VISCOSITY DRAG (The "Stirring" Variable)
         * Thick foods (AMYLOID) trap heat. Large batches of thick food take 
         * exponentially longer because heat cannot move via convection.
         */
        if (p.viscosity > 5.0) {
            const dragFactor = Math.log10(m_ratio) * (p.viscosity / 10);
            t_scaled *= (1 + dragFactor);
        }

        /**
         * 3. PHASE CHANGE (The Evaporation Penalty)
         * For "Bhunao" or reductions, the Latent Heat constant accounts 
         * for the energy required to turn water into steam.
         */
        const latentEnergyAdjustment = (p.latentHeat / 2260) * (Math.sqrt(m_ratio) - 1);
        t_scaled += (t_base * 0.15 * latentEnergyAdjustment);

        // 4. THE INDUSTRIAL "HEAVY-POT" OFFSET
        // Accounts for the 20-30 mins it takes to bring a 100L pot to boil.
        const thermalInertia = Math.min(30, Math.log2(m_ratio) * 4);
        
        return Math.round(t_scaled + thermalInertia);
    }
}

module.exports = KitchenTimerEngine;