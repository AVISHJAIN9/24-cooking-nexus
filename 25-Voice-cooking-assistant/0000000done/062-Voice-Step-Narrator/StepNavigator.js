/**
 * Logic for moving through the recipe steps.
 */
export const calculateNewStep = (currentIdx, totalSteps, direction) => {
  if (direction === "NEXT") {
    // Return next index, but cap it at the last step
    return Math.min(currentIdx + 1, totalSteps - 1);
  }
  if (direction === "BACK") {
    // Return previous index, but cap it at zero
    return Math.max(currentIdx - 1, 0);
  }
  return currentIdx;
};
