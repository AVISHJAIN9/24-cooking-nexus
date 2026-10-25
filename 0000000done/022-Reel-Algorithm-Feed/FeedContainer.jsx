import React, { useState, useEffect } from 'react';
import { ReelPlayer, createVideoObserver } from '../021-Reel-Core-Player';
import { fetchRecommendedReels } from './PaginationService';
import './feedStyles.css';

const FeedContainer = ({ userId }) => {
  const [reels, setReels] = useState([]);
  const [activeReelId, setActiveReelId] = useState(null);

  useEffect(() => {
    // Initial fetch of the personalized feed
    const loadInitialFeed = async () => {
      const data = await fetchRecommendedReels(userId, 1);
      setReels(data);
      if (data.length > 0) setActiveReelId(data._id);
    };
    loadInitialFeed();
  }, [userId]);

  useEffect(() => {
    const observer = createVideoObserver(setActiveReelId);
    const elements = document.querySelectorAll('.reel-wrapper');
    elements.forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, [reels]);

  return (
    <div className="feed-scroll-container">
      {reels.map((reel) => (
        <div key={reel._id} data-id={reel._id} className="reel-wrapper">
          <ReelPlayer 
            url={reel.videoUrl} 
            isActive={activeReelId === reel._id} 
          />
        </div>
      ))}
    </div>
  );
};

export default FeedContainer;
