import React, { useState } from 'react';
import PrivacyToggles from './PrivacyToggles';
import SecuritySection from './SecuritySection';
import './settingsStyles.css';

const SettingsMenu = () => {
  const [activeTab, setActiveTab] = useState('privacy');

  return (
    <div className="settings-layout">
      <aside className="settings-sidebar">
        <h3>Settings</h3>
        <button 
          onClick={() => setActiveTab('privacy')} 
          className={activeTab === 'privacy' ? 'active' : ''}
        >
          <i className="fas fa-lock"></i> Privacy
        </button>
        <button 
          onClick={() => setActiveTab('security')} 
          className={activeTab === 'security' ? 'active' : ''}
        >
          <i className="fas fa-shield-alt"></i> Security
        </button>
        <button 
          onClick={() => setActiveTab('account')} 
          className={activeTab === 'account' ? 'active' : ''}
        >
          <i className="fas fa-user-cog"></i> Account Info
        </button>
      </aside>

      <main className="settings-content">
        {activeTab === 'privacy' && <PrivacyToggles />}
        {activeTab === 'security' && <SecuritySection />}
        {activeTab === 'account' && (
           <div className="settings-section">
             <h4>Account Information</h4>
             <p className="helper-text">Manage your email and phone number verification.</p>
           </div>
        )}
      </main>
    </div>
  );
};

export default SettingsMenu;
