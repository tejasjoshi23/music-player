import React, { useState, useEffect } from "react";
import "../css/SongList.css";
import defaultCover from "../assets/music-img.png";

const SongList = ({ songs, onSongSelect, selectedSongId }) => {
  const [songDurations, setSongDurations] = useState({});
  const [imageLoaded, setImageLoaded] = useState({});

  useEffect(() => {
    const audioElements = {};
    const calculateDurations = async () => {
      const durations = {};

      for (const song of songs) {
        const audio = new Audio(song.url);
        audioElements[song.id] = audio;

        await new Promise((resolve) => {
          audio.addEventListener("loadedmetadata", () => {
            durations[song.id] = formatTime(audio.duration);
            resolve();
          });
        });
      }

      setSongDurations(durations);
    };

    calculateDurations();

    return () => {
      Object.values(audioElements).forEach((audio) => {
        audio.pause();
        audio.src = "";
      });
    };
  }, [songs]);

  const handleSongSelect = (song) => {
    onSongSelect(song);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleImageLoad = (songId) => {
    setImageLoaded((prev) => ({ ...prev, [songId]: true }));
  };

  const handleImageError = (e) => {
    e.target.src = defaultCover;
  };

  return (
    <div className="song-list">
      {songs.map((song) => (
        <div
          key={song.id}
          className={`song-item ${
            selectedSongId === song.id ? "selected" : ""
          }`}
          onClick={() => handleSongSelect(song)}
        >
          <img
            src={`https://cms.samespace.com/assets/${song.cover}`}
            alt="cover"
            className="song-cover"
            onLoad={() => handleImageLoad(song.id)}
            onError={handleImageError}
            style={{ display: imageLoaded[song.id] ? "block" : "none" }}
          />
          {!imageLoaded[song.id] && (
            <img
              src={defaultCover}
              alt="default cover"
              className="song-cover"
              style={{ display: "block" }}
            />
          )}
          <div className="song-info">
            <div className="song-title">{song.name}</div>
            <div className="song-artist">{song.artist}</div>
          </div>
          <div className="song-duration">
            {songDurations[song.id] || "0:00"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SongList;
