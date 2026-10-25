/**
 * Syncs user preferences across MERN stack and LocalStorage.
 */
export const updatePrivacySettings = async (updates) => {
  try {
    const response = await fetch('/api/v1/user/settings', {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(updates)
    });
    
    // Optimistic UI/Instant Reflection via LocalStorage
    const current = JSON.parse(localStorage.getItem('chef_prefs') || '{}');
    localStorage.setItem('chef_prefs', JSON.stringify({ ...current, ...updates }));
    
    return response.ok;
  } catch (err) {
    console.error("Settings Sync Failed", err);
  }
};
