import React, { createContext, useState } from 'react';

export const AIStatusContext = createContext();

export const AIProvider = ({ children }) => {
  const [voiceActive, setVoiceActive] = useState(false);   // Is 'Hey Chef' heard?
  const [gestureActive, setGestureActive] = useState(false); // Is a hand in frame?
  const [lastAction, setLastAction] = useState(null);

  return (
    <AIStatusContext.Provider value={{ 
      voiceActive, setVoiceActive, 
      gestureActive, setGestureActive,
      lastAction, setLastAction 
    }}>
      {children}
    </AIStatusContext.Provider>
  );
};
