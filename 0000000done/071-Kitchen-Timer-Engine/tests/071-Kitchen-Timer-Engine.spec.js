const { expect } = require('chai');
const TimerEngine = require('../core/071-Kitchen-Timer-Engine.service');
const { PHYSICS_MODELS } = require('../data/071-Kitchen-Timer-Engine.types');

describe('Feature 071: Universal Kitchen Timer Engine (The Blast Test)', () => {

    it('Should correctly scale AMYLOID (Dal) using Viscosity Drag', () => {
        const baseTime = 20; // 20 mins for 4 people
        const scale = 25;    // Scaling for 100 people
        
        const result = TimerEngine.calculate(baseTime, scale, PHYSICS_MODELS.AMYLOID);
        
        // Linear would be 500 mins. Our engine should calculate ~90-120 mins
        // due to thermal penetration physics.
        expect(result).to.be.below(150);
        expect(result).to.be.above(60);
    });

    it('Should keep KINETIC_SURFACE (Tadka) nearly fixed', () => {
        const baseTime = 2; // 2 mins for 4 people
        const scale = 50;   // Scaling for 200 people
        
        const result = TimerEngine.calculate(baseTime, scale, PHYSICS_MODELS.KINETIC_SURFACE);
        
        // It shouldn't be 100 mins. It should be ~3-5 mins (just oil heat-up time).
        expect(result).to.be.below(6);
    });
});