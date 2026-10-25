import React, { useState, useEffect } from 'react';
import ProfileHeader from './ProfileHeader';
import TabSwitcher from './TabSwitcher';
import ReelGrid from './ReelGrid';
import { fetchProfileData, fetchUserReels } from './UserProfileService';
import './profileStyles.css';

const UserProfileDashboard = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('posts');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial profile load
    fetchProfileData(userId).then(data => {
      if (data) setUser(data);
    });
  }, [userId]);

  useEffect(() => {
    // Load reels whenever tab changes
    setLoading(true);
    fetchUserReels(userId, activeTab).then(data => {
      setItems(data);
      setLoading(false);
    });
  }, [userId, activeTab]);

  if (!user) return <div className="loading-screen">Preparing the kitchen...</div>;

  return (
    <div className="profile-dashboard-root">
      <ProfileHeader user={user} />
      <TabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />
      <ReelGrid items={items} loading={loading} />
    </div>
  );
};

export default UserProfileDashboard;
