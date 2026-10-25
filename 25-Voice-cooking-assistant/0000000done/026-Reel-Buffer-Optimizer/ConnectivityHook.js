import { useState, useEffect } from 'react';

/**
 * Custom hook to detect Network Quality.
 */
export const useNetworkSpeed = () => {
  const [isSlowConnection, setIsSlowConnection] = useState(false);

  useEffect(() => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    if (connection) {
      const updateConnectionStatus = () => {
        // 'saveData' mode or '2g'/'3g' triggers slow mode
        setIsSlowConnection(connection.saveData || ['2g', '3g'].includes(connection.effectiveType));
      };

      connection.addEventListener('change', updateConnectionStatus);
      updateConnectionStatus();
      
      return () => connection.removeEventListener('change', updateConnectionStatus);
    }
  }, []);

  return isSlowConnection;
};
