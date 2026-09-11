import { useEffect, useState } from "react";

import SongItem from "./songItem";
import { getSongs } from "../services/api";

function SongList({ onSongPlay }) {
  const [songs, setSongs] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSongs();
  }, []);

  async function loadSongs() {
    try {
      setLoading(true);
      setError(null);

      const data = await getSongs();

      setSongs(data);
    } catch (error) {
      console.error(error);
      setError("Tidak dapat terhubung ke server.");
    } finally {
      setLoading(false);
    }
  }

  const toggleSort = () => {
    setSortOrder((current) =>
      current === "asc" ? "desc" : "asc"
    );
  };

  const sortedSongs = [...songs].sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();

    if (sortOrder === "asc") {
      return titleA.localeCompare(titleB);
    }

    return titleB.localeCompare(titleA);
  });

  if (loading) {
    return (
      <section className="song-section">
        <div className="song-loading">
          Loading songs...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="song-section">
        <div className="song-error">
          {error}
        </div>
      </section>
    );
  }

  return (
    <section className="song-section">
      <div className="toolbar">
        <button
          className="sort-button"
          onClick={toggleSort}
        >
          <span>Title</span>

          <span className="sort-arrow">
            {sortOrder === "asc" ? "↑" : "↓"}
          </span>
        </button>

        <button
          className="shuffle-button"
          aria-label="Shuffle"
        >
          🔀
        </button>
      </div>

      <div className="song-list">
        {sortedSongs.map((song) => (
          <SongItem
            key={song.id}
            song={{
              id: song.id,
              title: song.title,
              artist: song.artist,
              duration: formatDuration(
                song.durationSeconds
              ),
              cover:
                song.artworkPath ||
                "https://unsplash.com/photos/a-person-in-a-garment-EpTIAbTlrg0",
            }}
            onPlay={onSongPlay}
          />
        ))}
      </div>
    </section>
  );
}

function formatDuration(seconds) {
  if (!seconds) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

export default SongList;