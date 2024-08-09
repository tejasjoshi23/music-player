import React, { useState, useEffect, Suspense, lazy } from "react";
import axios from "axios";
import "./App.css";
import Loader from "./utils/Loader";

// Lazy load components
import { getDominantColor } from "./utils/ColorUtils";
const SearchBar = lazy(() => import("./components/MenuComponents/SearchBar"));
const ControlButtons = lazy(() => import("./components/MenuComponents/ControlButtons"));
const Logo = lazy(() => import("./components/DashboardComponents/Logo"));
const UserSection = lazy(() => import("./components/DashboardComponents/UserSection"));
const SongList = lazy(() => import("./components/SongList"));
const Player = lazy(() => import("./components/Player"));

const App = () => {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [filter, setFilter] = useState("foryou");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSongId, setSelectedSongId] = useState(null);
  const [bgGradient, setBgGradient] = useState(
    "linear-gradient(#181818, #181818)"
  );
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching songs:", error);
        setIsLoading(false);
      });
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
      });
    }
  }, [currentSong]);

  const handlePlayPause = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const handleSongSelect = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setSelectedSongId(song.id);
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

  const filteredSongsList = filteredSongs.filter(
    (song) =>
      song.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="app" style={{ background: bgGradient }}>
      <div className="left-section">
        <Suspense fallback={<Loader />}>
          <Logo />
          <UserSection />
        </Suspense>
      </div>
      <div className="center-section">
        <Suspense fallback={<Loader />}>
          <ControlButtons
            onForYou={() => setFilter("foryou")}
            onTopTracks={() => setFilter("top_tracks")}
          />
          <SearchBar onSearch={handleSearch} />
          <SongList
            songs={filteredSongsList}
            onSongSelect={handleSongSelect}
            selectedSongId={selectedSongId}
          />
        </Suspense>
      </div>
      {currentSong && (
        <div className="right-section">
          <Suspense fallback={<Loader />}>
            <Player
              currentSong={currentSong}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onPlayPause={handlePlayPause}
              isPlaying={isPlaying}
            />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default App;
