import React, { useState, useEffect } from 'react';
import { updatePrivacySettings } from './PreferenceService';

const PrivacyToggles = () => {
  const [settings, setSettings] = useState({
    isPrivate: false,
    showLikes: true,
    allowDuets: true
  });

  const handleToggle = async (key) => {
    const newValue = !settings[key];
    setSettings(prev => ({ ...prev, [key]: newValue }));
    
    // MERN Sync
    await updatePrivacySettings({ [key]: newValue });
  };

  return (
    <div className="settings-section">
      <h4>Privacy Discovery</h4>
      <div className="setting-row">
        <div className="setting-label">
           <span>Private Account</span>
           <p className="helper-text">Only approved followers can see your recipes.</p>
        </div>
        <input 
          type="checkbox" 
          className="ios-toggle"
          checked={settings.isPrivate} 
          onChange={() => handleToggle('isPrivate')} 
        />
      </div>
      <div className="setting-row">
        <div className="setting-label">
           <span>Show Liked Videos</span>
           <p className="helper-text">Allow others to see the recipes you've liked.</p>
        </div>
        <input 
          type="checkbox" 
          className="ios-toggle"
          checked={settings.showLikes} 
          onChange={() => handleToggle('showLikes')} 
        />
      </div>
    </div>
  );
};

export default PrivacyToggles;
