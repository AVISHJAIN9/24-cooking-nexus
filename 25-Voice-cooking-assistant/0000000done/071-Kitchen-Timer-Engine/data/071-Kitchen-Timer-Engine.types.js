/**
 * Project Nexus: Feature 071 - Universal Physics Constants
 */
module.exports = {
    // These constants drive the Scaling Service (077)
    PHYSICS_MODELS: {
        // High water content (Sambar, Ramen) -> Power 0.55
        AQUEOUS: 'AQUEOUS',
        // High fat/protein (Steaks, Tandoori) -> Power 0.72
        LIPID_FIBER: 'LIPID_FIBER',
        // Starch-heavy/Thick (Dal, Risotto) -> Power 0.85
        AMYLOID: 'AMYLOID',
        // Rapid surface pop (Tadka, Searing) -> Power 0.15
        KINETIC_SURFACE: 'KINETIC_SURFACE'
    },

    // Industrial Pot Heat-Up Times (Thermal Lag)
    THERMAL_LAG_COEFFICIENT: 1.25, // Minutes per log10(mass_ratio)
    
    STATUS: {
        RUNNING: 'RUNNING',
        PAUSED: 'PAUSED',
        SYNC: 'SYNCING',
        DONE: 'COMPLETED'
    }
};