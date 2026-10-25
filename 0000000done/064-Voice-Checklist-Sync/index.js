import { findMatch } from './ChecklistMatcher';
import { updateBackendChecklist } from './SyncService';
import { toggleItemUI } from './StateManager';
import { speak } from '../066-Voice-Text-to-Speech/SpeakerService';

/**
 * Main function to handle voice-activated checklist syncing.
 */
export const handleChecklistVoice = async (transcript, ingredients, recipeId, setIngredients) => {
  const match = findMatch(transcript, ingredients);

  if (match) {
    // 1. Update UI immediately for "Instant Feel"
    const updatedList = toggleItemUI(ingredients, match._id, true);
    setIngredients(updatedList);

    // 2. Give Voice Feedback
    speak(`Checked off ${match.name}.`);

    // 3. Sync with MongoDB in the background
    await updateBackendChecklist(recipeId, match._id, true);
    
    return true;
  }

  return false;
};
