import React from 'react';
import '../../css/MusicController/ProgressBar.css';

const ProgressBar = ({ currentTime, duration, progress, onProgressChange }) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="progress-bar">
      <span>{formatTime(currentTime)}</span>
      <div className="progress-bar-container">
        <div
          className="progress-bar-filled"
          style={{ width: `${progress}%` }}
        />
        <input
          type="range"
          min="0"
          max="100"
          value={progress || 0}
          onChange={onProgressChange}
          className="slider"
        />
      </div>
      <span>{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;
