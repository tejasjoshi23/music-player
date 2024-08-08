import React from 'react';
import '../../css/MusicController/SongDetails.css';

const SongDetails = ({ song }) => {
  if (!song) return null;

  return (
    <div className="song-details">
      <div className="player-song-info">
        <div className="song-name">{song.name}</div>
        <div className="artist-name">{song.artist}</div>
        <img src={song.coverUrl} alt={song.name} className="song-image" />
      </div>
    </div>
  );
};

export default SongDetails;
