import React from 'react';

const ProfileHeader = ({ user }) => {
  const formatStat = (num) => {
    if (!num) return '0';
    return num >= 1000 ? (num / 1000).toFixed(1) + 'k' : num;
  };

  return (
    <div className="profile-header">
      <div className="avatar-wrapper">
        <div className="avatar-circle">
          <img src={user.avatar || 'https://via.placeholder.com/150'} alt={user.username} />
        </div>
        <button className="edit-profile-btn">Edit Profile</button>
      </div>
      
      <div className="user-info">
        <h2 className="username">@{user.username}</h2>
        <div className="stats-bar">
          <div className="stat-item"><strong>{formatStat(user.following)}</strong> Following</div>
          <div className="stat-item"><strong>{formatStat(user.followers)}</strong> Followers</div>
          <div className="stat-item"><strong>{formatStat(user.totalLikes)}</strong> Likes</div>
        </div>
        <p className="bio">{user.bio || "No bio yet. Keep cooking! 👨‍🍳"}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
