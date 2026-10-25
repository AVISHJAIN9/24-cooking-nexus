import { useEffect, useContext } from 'react';
import { AIStatusContext } from './StateBridge';
import { shouldExecuteAction, resolveConflict } from './PriorityManager';

/**
 * The Master AI Hook for the MERN Kitchen.
 */
export const useHybridAI = (voiceIntent, gestureIntent, onExecute) => {
  const { setVoiceActive, setGestureActive, setLastAction } = useContext(AIStatusContext);

  useEffect(() => {
    // 1. Resolve which input to trust
    const finalIntent = resolveConflict(voiceIntent, gestureIntent);

    if (finalIntent && shouldExecuteAction(finalIntent)) {
      // 2. Trigger the actual function (e.g., playVideo())
      onExecute(finalIntent);
      
      // 3. Update UI Feedback
      setLastAction(finalIntent);
      setTimeout(() => setLastAction(null), 3000);
    }
  }, [voiceIntent, gestureIntent]);

  // Logic to update active dots based on engine status
  const updateStatus = (v, g) => {
    setVoiceActive(v);
    setGestureActive(g);
  };

  return { updateStatus };
};
