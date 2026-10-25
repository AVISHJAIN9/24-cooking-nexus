const mongoose = require('mongoose');

/**
 * Project Nexus: Feature 071 - Kitchen Timer Engine Schema
 * Purpose: Cloud-persisted, physics-aware timer states.
 */
const timerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
    
    // The "Nexus-Omega" Physics Profile
    materialProfile: { 
        type: String, 
        enum: ['AQUEOUS', 'LIPID_FIBER', 'AMYLOID', 'KINETIC_SURFACE'],
        required: true 
    },

    // Time Tracking (Stored in Milliseconds for high precision)
    durationMs: { type: Number, required: true },
    startTime: { type: Date, default: Date.now },
    remainingMs: { type: Number },
    
    status: { 
        type: String, 
        enum: ['RUNNING', 'PAUSED', 'SYNCING', 'COMPLETED'], 
        default: 'RUNNING' 
    },

    // Scaling Metadata for Feature 077
    meta: {
        scaleFactor: { type: Number, default: 1 },
        originalBaseTime: Number,
        thermalInertiaAdded: Number // Lag time for heavy industrial pots
    }
}, { timestamps: true });

module.exports = mongoose.model('KitchenTimer', timerSchema);