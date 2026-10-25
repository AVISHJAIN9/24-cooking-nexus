const { expect } = require('chai');
const ScalingService = require('../core/077-Kitchen-Portion-Scaling.service');

describe('Feature 077: Portion Scaling Logic', () => {
    
    const mockDalRecipe = {
        title: "Dal Tadka",
        basePortions: 4,
        ingredients: [{ name: "Lentils", amount: 200, unit: "g" }],
        steps: [{ instruction: "Boil Dal", baseDuration: 15, scalingMode: "THERMAL" }]
    };

    it('Should scale ingredients linearly (4 to 40 people = 10x)', () => {
        const result = ScalingService.scaleRecipe(mockDalRecipe, 40);
        const lentils = result.ingredients.find(i => i.name === "Lentils");
        
        // 200g * 10 = 2000g, but Feature 072 should make it 2kg
        expect(lentils.amount).to.equal(2);
        expect(lentils.unit).to.equal("kg");
    });

    it('Should scale cooking time NON-linearly for THERMAL mode', () => {
        const result = ScalingService.scaleRecipe(mockDalRecipe, 40);
        const boilStep = result.steps[0];

        // Linear would be 150 mins. Thermal should be significantly less (~60 mins).
        expect(boilStep.duration).to.be.below(100); 
        expect(boilStep.duration).to.be.above(15);
    });
});