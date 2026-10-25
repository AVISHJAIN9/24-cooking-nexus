/**
 * Communicates with the Express API to persist checklist changes.
 */
export const updateBackendChecklist = async (recipeId, ingredientId, isCompleted) => {
  try {
    const response = await fetch(`/api/v1/recipes/${recipeId}/checklist`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredientId, isCompleted })
    });
    return await response.json();
  } catch (error) {
    console.error("MERN Sync Error: Could not save checklist state", error);
    return null;
  }
};
