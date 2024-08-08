import React, { useEffect } from 'react';
import '../../css/MusicController/ButtonsControl.css';
import { PlayIcon, PauseIcon, PreviousIcon, NextIcon, VolumeIcon, ThreeDotsIcon } from '../../assets/svgIcons';

const ButtonControls = ({ onPrevious, onPlayPause, onNext, isPlaying, onVolumeClick }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Space') {
        event.preventDefault();
        onPlayPause();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onPlayPause]);

  return (
    <div className="playback-controls">
      <button onClick={null}><ThreeDotsIcon /></button>
      <button onClick={onPrevious}><PreviousIcon /></button>
      <button onClick={onPlayPause}>{isPlaying ? <PauseIcon /> : <PlayIcon />}</button>
      <button onClick={onNext}><NextIcon /></button>
      <button onClick={onVolumeClick}><VolumeIcon /></button>
    </div>
  );
};

export default ButtonControls;
