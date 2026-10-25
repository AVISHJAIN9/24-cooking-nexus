import React, { useState } from 'react';
import { toggleLikeApi } from './LikeService';
import './likeStyles.css';

const LikeButton = ({ reelId, initialLiked, initialCount }) => {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLike = async () => {
    // 1. Optimistic UI Update
    const newLikedStatus = !isLiked;
    setIsLiked(newLikedStatus);
    setCount(prev => newLikedStatus ? prev + 1 : prev - 1);
    setIsAnimating(true);

    // 2. Trigger Haptic (if on mobile/tablet)
    if (navigator.vibrate) navigator.vibrate(10);

    // 3. Background Sync with MERN Backend
    const success = await toggleLikeApi(reelId, newLikedStatus);
    
    // 4. Rollback if server fails
    if (!success) {
      setIsLiked(!newLikedStatus);
      setCount(prev => !newLikedStatus ? prev + 1 : prev - 1);
    }
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="like-action-wrapper" onClick={handleLike}>
      <div className={}>
        {isLiked ? '❤️' : '🤍'}
      </div>
      <span className="like-count">{count.toLocaleString()}</span>
    </div>
  );
};

export default LikeButton;
