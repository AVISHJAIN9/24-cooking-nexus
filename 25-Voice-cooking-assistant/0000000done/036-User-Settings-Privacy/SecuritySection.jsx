import React, { useState } from 'react';

const SecuritySection = () => {
  const [passwordData, setPasswordData] = useState({ old: '', new: '' });

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    // MERN: fetch('/api/v1/auth/update-password', { method: 'POST', ... })
    alert("Security verification required. Check your email.");
  };

  return (
    <div className="settings-section">
      <h4>Security & Login</h4>
      <form onSubmit={handlePasswordChange} className="security-form">
        <div className="form-group">
          <label>Current Password</label>
          <input 
            type="password" 
            required 
            onChange={(e) => setPasswordData({...passwordData, old: e.target.value})} 
          />
        </div>
        
        <div className="form-group">
          <label>New Password</label>
          <input 
            type="password" 
            required 
            onChange={(e) => setPasswordData({...passwordData, new: e.target.value})} 
          />
        </div>
        
        <button type="submit" className="save-btn">Update Password</button>
      </form>
      
      <div className="danger-zone">
        <h4>Danger Zone</h4>
        <p className="helper-text">Permanently delete your account and all recipe reels.</p>
        <button className="delete-btn">Delete Account</button>
      </div>
    </div>
  );
};

export default SecuritySection;
