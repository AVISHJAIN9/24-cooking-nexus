import { calculateNewStep } from './StepNavigator';
import { announceStep, repeatStep } from './StepSpeaker';
import { saveRecipeProgress } from './ProgressTracker';

/**
 * The Master Narrator Function
 */
export const handleStepNavigation = (action, state, recipeSteps, userId) => {
  const { currentStepIdx, recipeId } = state;
  let newIdx = currentStepIdx;

  switch (action) {
    case "STEP_NEXT":
      newIdx = calculateNewStep(currentStepIdx, recipeSteps.length, "NEXT");
      announceStep(newIdx, recipeSteps[newIdx].text);
      break;
    
    case "STEP_BACK":
      newIdx = calculateNewStep(currentStepIdx, recipeSteps.length, "BACK");
      announceStep(newIdx, recipeSteps[newIdx].text);
      break;

    case "STEP_REPEAT":
      repeatStep(recipeSteps[currentStepIdx].text);
      break;

    default:
      break;
  }

  // Auto-sync to MongoDB in the background
  if (newIdx !== currentStepIdx) {
    saveRecipeProgress(userId, recipeId, newIdx);
  }

  return newIdx; // Return to update React State
};
