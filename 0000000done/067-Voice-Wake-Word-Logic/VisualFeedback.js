/**
 * CSS-in-JS or Class togglers for the UI.
 */
export const getStatusStyles = (isActive) => {
  return {
    ringColor: isActive ? '#00ff00' : '#555', // Green when listening
    glowIntensity: isActive ? '0 0 20px #00ff00' : 'none',
    label: isActive ? 'Listening...' : 'Say "Hey Chef"'
  };
};

export const playWakeSound = () => {
  // A small "ping" sound to confirm activation
  const audio = new Audio('/assets/sounds/wake_notification.mp3');
  audio.volume = 0.5;
  audio.play().catch(() => {}); // Browser policy might block auto-play
};
