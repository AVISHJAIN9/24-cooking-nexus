import React, { useEffect, useState } from 'react';
import './113-System-Vector-DB-Cluster.styles.css';

export const HealthMonitor = () => {
  const [nodes, setNodes] = useState([]);
  useEffect(() => setNodes(window.vectorNodes || []), []);
  return (
    <div className="vector-monitor">
      <h3>Vector DB Cluster</h3>
      <ul>{nodes.map((n,i)=><li key={i}>{n.name} - {n.status}</li>)}</ul>
    </div>
  );
};
export default HealthMonitor;
