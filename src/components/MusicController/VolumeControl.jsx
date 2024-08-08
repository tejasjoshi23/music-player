import React from 'react';
import '../../css/MusicController/VolumeControl.css';
import { VolumeMuteIcon, VolumeUpIcon } from '../../assets/svgIcons';

const VolumeControl = ({ volume, onVolumeChange }) => {
  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    onVolumeChange(newVolume);
  };

  return (
    <div className="volume-control">
      {volume === 0 ? <VolumeMuteIcon /> : <VolumeUpIcon />}
      <div className="volume-slider-container">
        <div
          className="volume-slider-filled"
          style={{ width: `${volume * 100}%` }}
        />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
      </div>
      <span className="volume-number">{Math.round(volume * 100)}</span>

    </div>
  );
};

export default VolumeControl;
