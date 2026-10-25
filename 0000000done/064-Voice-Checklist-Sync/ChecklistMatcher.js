/**
 * Matches a spoken string to an item in the ingredient list.
 */
export const findMatch = (transcript, ingredients) => {
  const text = transcript.toLowerCase();
  
  // Look for keywords like "checked," "done," or "added"
  const actionKeywords = ["added", "done", "check off", "got the"];
  
  // Extract the potential item name
  let targetItem = text;
  actionKeywords.forEach(kw => {
    if (text.includes(kw)) {
      const parts = text.split(kw);
      targetItem = parts ? parts.trim() : text;
    }
  });

  // Find the closest match in the ingredients array
  return ingredients.find(ing => 
    targetItem.includes(ing.name.toLowerCase()) || 
    ing.name.toLowerCase().includes(targetItem)
  );
};
