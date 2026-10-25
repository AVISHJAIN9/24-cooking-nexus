import React, { useRef, useEffect } from 'react';

const AudioVisualizer = ({ isActive, videoRef }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!isActive || !videoRef.current) return;

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // Use try-catch because createMediaElementSource can only be called once per element
    let source;
    try {
      source = audioCtx.createMediaElementSource(videoRef.current);
    } catch (e) {
      return; 
    }
    
    const analyser = audioCtx.createAnalyser();
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyser.fftSize = 64;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 4; // Scaled for small canvas
        ctx.fillStyle = `rgba(255, 255, 255, ${barHeight / 50})`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }
    };

    draw();
    return () => {
        cancelAnimationFrame(animationRef.current);
        if (audioCtx.state !== 'closed') audioCtx.close();
    };
  }, [isActive, videoRef]);

  return <canvas ref={canvasRef} width="100" height="50" className="audio-bars" />;
};

export default AudioVisualizer;
