/**
 * Logic to manage shared playback settings across the feed.
 */
export const handleGlobalVolume = (isMuted, setIsMuted) => {
  const newMuteState = !isMuted;
  setIsMuted(newMuteState);
  
  // Save to localStorage so it persists on page refresh
  localStorage.setItem('chef_reel_muted', JSON.stringify(newMuteState));
};

export const getInitialMuteState = () => {
  const saved = localStorage.getItem('chef_reel_muted');
  return saved !== null ? JSON.parse(saved) : true; // Default to muted
};
