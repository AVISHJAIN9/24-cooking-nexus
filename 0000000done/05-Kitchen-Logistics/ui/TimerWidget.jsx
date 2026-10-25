import React, { useEffect, useState } from 'react';

const TimerWidget = ({ timer, onStop = () => {} }) => {
  const [remaining, setRemaining] = useState(timer ? timer.remainingMs : 0);

  useEffect(() => {
    if (!timer) return;
    setRemaining(timer.remainingMs);
    const tick = setInterval(() => {
      setRemaining(r => {
        const next = r - 1000;
        if (next <= 0) {
          clearInterval(tick);
          onStop(timer.id);
          return 0;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, [timer]);

  if (!timer) return null;

  const minutes = Math.floor(remaining / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000).toString().padStart(2, '0');

  return (
    <div className="timer-widget">
      <div className="timer-label">{timer.label}</div>
      <div className="timer-remaining">{minutes}:{seconds}</div>
      <button onClick={() => onStop(timer.id)}>Stop</button>
    </div>
  );
};

export default TimerWidget;
