/**
 * Updates the local UI state before/after the backend syncs.
 */
export const toggleItemUI = (currentList, itemId, status) => {
  return currentList.map(item => 
    item._id === itemId ? { ...item, isCompleted: status } : item
  );
};
