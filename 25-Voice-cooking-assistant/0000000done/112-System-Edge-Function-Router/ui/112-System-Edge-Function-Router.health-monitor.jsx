import React, { useEffect, useState } from 'react';
import './112-System-Edge-Function-Router.styles.css';

export const HealthMonitor = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    // dummy fetch - in real app call backend
    setRoutes(window.edgeRoutes || []);
  }, []);

  return (
    <div className="edge-monitor">
      <h3>Edge Function Router</h3>
      <ul>
        {routes.map((r, idx) => (
          <li key={idx}>{r.fn.name} (registered {new Date(r.registeredAt).toLocaleTimeString()})</li>
        ))}
      </ul>
    </div>
  );
};

export default HealthMonitor;
