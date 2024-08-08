import { useEffect, useState } from 'react';

const getSongDuration = (songUrl) => {
  return new Promise((resolve, reject) => {
    const audio = new Audio(songUrl);
    audio.addEventListener('loadedmetadata', () => {
      resolve(audio.duration);
    });
    audio.addEventListener('error', (e) => {
      reject(e);
    });
  });
};

const useSongDurations = (songs) => {
  const [durations, setDurations] = useState({});

  useEffect(() => {
    const fetchDurations = async () => {
      const newDurations = {};
      for (const song of songs) {
        try {
          const duration = await getSongDuration(`https://cms.samespace.com/assets/${song.url}`);
          newDurations[song.id] = duration;
        } catch (error) {
          console.error(`Error fetching duration for song ${song.id}:`, error);
        }
      }
      setDurations(newDurations);
    };
    fetchDurations();
  }, [songs]);

  return durations;
};

export default useSongDurations;
