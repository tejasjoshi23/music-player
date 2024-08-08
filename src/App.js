import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import SearchBar from "./components/MenuComponents/SearchBar";
import ControlButtons from "./components/MenuComponents/ControlButtons";
import Logo from "./components/DashboardComponents/Logo";
import UserSection from "./components/DashboardComponents/UserSection";
import SongList from "./components/SongList";
import Player from "./components/Player";

import { getDominantColor } from "./utils/ColorUtils";
const App = () => {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [filter, setFilter] = useState("foryou");
  const [searchQuery, setSearchQuery] = useState("");
  const [bgGradient, setBgGradient] = useState(
    "linear-gradient(#181818, #181818)"
  );
  const [searchBarGradient, setSearchBarGradient] = useState(
    "linear-gradient(black, grey)"
  );
  const [isMobileView, setIsMobileView] = useState(false);
  const [isRightSectionOpen, setIsRightSectionOpen] = useState(false);
  const [selectedSongId, setSelectedSongId] = useState(null);

  useEffect(() => {
    axios
      .get("https://cms.samespace.com/items/songs")
      .then((response) => {
        const songsWithImageUrls = response.data.data.map((song) => ({
          ...song,
          coverUrl: `https://cms.samespace.com/assets/${song.cover}`,
        }));
        setSongs(songsWithImageUrls);
        setFilteredSongs(songsWithImageUrls);
      })
      .catch((error) => console.error("Error fetching songs:", error));
  }, []);

  useEffect(() => {
    const filtered =
      filter === "top_tracks" ? songs.filter((song) => song.top_track) : songs;
    setFilteredSongs(filtered);
  }, [filter, songs]);

  useEffect(() => {
    if (currentSong) {
      getDominantColor(currentSong.coverUrl, (gradient) => {
        setBgGradient(gradient);
        setSearchBarGradient(gradient);
      });
    }
  }, [currentSong]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsRightSectionOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePlayPause = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
    if (isMobileView) {
      setIsRightSectionOpen(true);
    }
  };

  const handleSongSelect = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setSelectedSongId(song.id);
    if (isMobileView) {
      setIsRightSectionOpen(true);
    }
  };

  const handlePrevious = () => {
    const currentIndex = filteredSongs.findIndex(
      (song) => song.id === currentSong.id
    );
    const previousSong =
      filteredSongs[currentIndex - 1] ||
      filteredSongs[filteredSongs.length - 1];
    handleSongSelect(previousSong);
  };

  const handleNext = () => {
    const currentIndex = filteredSongs.findIndex(
      (song) => song.id === currentSong.id
    );
    const nextSong = filteredSongs[currentIndex + 1] || filteredSongs[0];
    handleSongSelect(nextSong);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleGoBack = () => {
    setIsRightSectionOpen(false);
  };

  const filteredSongsList = filteredSongs.filter(
    (song) =>
      song.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app" style={{ background: bgGradient }}>
      <button
        className="menu-button"
        onClick={() => setIsRightSectionOpen(false)}
      >
        Menu
      </button>
      {!isRightSectionOpen && (
        <>
          <div className="left-section">
            <Logo />
            <UserSection />
          </div>
          <div className="center-section">
            <ControlButtons
              onForYou={() => setFilter("foryou")}
              onTopTracks={() => setFilter("top_tracks")}
            />
            <SearchBar
              onSearch={handleSearch}
              style={{ background: searchBarGradient }}
            />
            <SongList
              songs={filteredSongsList}
              onSongSelect={handleSongSelect}
              selectedSongId={selectedSongId}
            />
          </div>
        </>
      )}
      {currentSong && (
        <div
          className={`right-section ${isRightSectionOpen ? "mobile-view" : ""}`}
        >
          <button className="back-button" onClick={handleGoBack}>
            Go Back
          </button>
          <Player
            currentSong={currentSong}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onPlayPause={handlePlayPause}
            isPlaying={isPlaying}
            onBack={handleGoBack}
          />
        </div>
      )}
    </div>
  );
};

export default App;
