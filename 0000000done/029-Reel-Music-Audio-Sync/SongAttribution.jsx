import React from 'react';

const SongAttribution = ({ artist, songName, coverArt, isActive }) => {
  return (
    <div className="music-attribution-container">
      <div className="song-info">
        <i className="fas fa-music"></i>
        <div className="song-text-container">
           <span className="scrolling-text">{songName} - {artist}</span>
        </div>
      </div>
      <div className={`vinyl-record ${isActive ? 'spinning' : ''}`}>
        <img src={coverArt || 'https://via.placeholder.com/50'} alt="Album Art" />
      </div>
    </div>
  );
};

export default SongAttribution;
