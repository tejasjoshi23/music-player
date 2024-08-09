import React, { useState, useEffect, useRef } from "react";
import "../css/Player.css";
import VolumeControl from "./MusicController/VolumeControl";
import ProgressBar from "./MusicController/ProgressBar";
import SongDetails from "./MusicController/SongDetails";
import ButtonControls from "./MusicController/ButtonControls";

const Player = ({
  currentSong,
  onNext,
  onPrevious,
  onPlayPause,
  isPlaying,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);
  const volumeControlRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateProgress = () => {
        setCurrentTime(audio.currentTime);
        setProgress((audio.currentTime / duration) * 100 || 0);
      };

      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
      };
      const handleEnded = () => {
        onNext();
      };

      audio.addEventListener("timeupdate", updateProgress);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("ended", handleEnded);

      if (isPlaying) {
        audio
          .play()
          .catch((error) =>
            console.error("Error trying to play audio:", error)
          );
      } else {
        audio.pause();
      }
      audio.volume = volume;

      return () => {
        audio.removeEventListener("timeupdate", updateProgress);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, [duration, isPlaying, onNext, volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && currentSong) {
      audio.src = currentSong.url;
      audio.load();
      setCurrentTime(0);
      setProgress(0);
    }
  }, [currentSong]);

  const handleProgressChange = (event) => {
    const newTime = (event.target.value / 100) * duration;
    setCurrentTime(newTime);
    setProgress(event.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleClickOutside = (event) => {
    if (
      volumeControlRef.current &&
      !volumeControlRef.current.contains(event.target)
    ) {
      setShowVolumeControl(false);
    }
  };

  useEffect(() => {
    if (showVolumeControl) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showVolumeControl]);

  return (
    <div className="now-playing">
       <SongDetails song={currentSong} />
      <audio ref={audioRef} volume={volume} />

      <ProgressBar
        currentTime={currentTime}
        duration={duration}
        progress={progress}
        onProgressChange={handleProgressChange}
      />
      <ButtonControls
        onPrevious={onPrevious}
        onPlayPause={onPlayPause}
        onNext={onNext}
        isPlaying={isPlaying}
        onVolumeClick={() => setShowVolumeControl(!showVolumeControl)}
      />
      {showVolumeControl && (
        <div ref={volumeControlRef}>
          <VolumeControl volume={volume} onVolumeChange={handleVolumeChange} />
        </div>
      )}
    </div>
  );
};

export default Player;
