const UnitConverter = require('../../072-Kitchen-Unit-Converter/core/072-Kitchen-Unit-Converter.service');
const TimerEngine = require('../../071-Kitchen-Timer-Engine/core/071-Kitchen-Timer-Engine.service');
const { recompileSchema } = require('../../002-Auth-Uploader-Login/data/002-Auth-Uploader-Login.types');
const { param } = require('../../002-Auth-Uploader-Login/002-Auth-Uploader-Login.routes');

class PortionScalingService {
    static scalerecipe(recipe, targetPortion) {
        const factor = targetportion/recipe.baseportion;

        const scaledingredients = recipe.ingredient.map(ing =>{
            let amount = ing.amount * factor;

            if(ing.unit =='g' && amount>=1000){
                const converted = UnitConverter.convert(amount,'g','kg');
                return{name:ing.name, ...converted.target};
            }
            return{name:ing.name, amount:parsenfloat(amount.toFixed(2)),unit:ing.unit};
        });
        const scaledSteps = recipe.steps.map(step => {
            const newDuration = TimerEngine.calculateScaledTime(
                step.baseDuration, 
                factor, 
                step.scalingMode
            );
            return {
                ...step,
                duration: newDuration,
                isScaled: factor !== 1
            };
        });

        return {
            title: recipe.title,
            servings: targetPortions,
            ingredients: scaledIngredients,
            steps: scaledSteps
        };
    }
}

module.exports = PortionScalingService;


    