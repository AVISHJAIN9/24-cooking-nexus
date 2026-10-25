/**
 * Logic to sync progress with the MERN backend.
 */
export const saveRecipeProgress = async (userId, recipeId, stepIndex) => {
  try {
    // Update the 'UserProgress' collection in MongoDB
    await fetch('/api/user/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, recipeId, currentStep: stepIndex })
    });
  } catch (err) {
    console.error("Failed to sync cooking progress:", err);
  }
};
