import React from 'react';

/**
 * The "Heads-Up Display" for the Laptop/TV.
 */
export const HybridUIOverlay = ({ voiceActive, gestureActive, lastAction }) => {
  return (
    <div className="ai-hud-container" style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999 }}>
      {/* Voice Status Dot */}
      <div style={{ display: 'inline-block', marginRight: '10px' }} className={`status-dot voice ${voiceActive ? 'pulsing' : ''}`}>
        <span style={{ color: voiceActive ? '#00ff00' : '#555' }}>🎤</span>
      </div>

      {/* Gesture Status Dot */}
      <div style={{ display: 'inline-block' }} className={`status-dot gesture ${gestureActive ? 'active' : ''}`}>
        <span style={{ color: gestureActive ? '#00ff00' : '#555' }}>✋</span>
      </div>

      {/* Toast Notification for Actions */}
      {lastAction && (
        <div style={{ background: 'rgba(0,0,0,0.8)', color: 'white', padding: '10px', marginTop: '10px', borderRadius: '8px' }}>
          Action: {lastAction.replace('_', ' ')}
        </div>
      )}
    </div>
  );
};
