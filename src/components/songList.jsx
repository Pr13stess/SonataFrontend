import shuffleIcon from "../assets/shuffle.svg";
import dscIcon from "../assets/dsc.svg";
import { useEffect, useState } from "react";

import SongItem from "./songItem";
import { getSongs } from "../services/api";

function SongList({ onSongPlay, searchQuery = "" }) {
  const [songs, setSongs] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadSongs(searchQuery);
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  async function loadSongs(query = "") {
    try {
      setLoading(true);
      setError(null);

      const data = await getSongs(query);

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
        <button className="sort-button" onClick={toggleSort}>
          <img src={dscIcon} className="sort-icon" alt="Sort by title" />
        </button>

        <button className="shuffle-button" aria-label="Shuffle">
          <img src={shuffleIcon} className="shuffle-icon" alt="" />
        </button>
      </div>

      <div className="song-list">
        {sortedSongs.length > 0 ? (
          sortedSongs.map((song) => (
            <SongItem
              key={song.id}
              song={{
                id: song.id,
                title: song.title,
                artist: song.artist,
                duration: formatDuration(song.durationSeconds),
                durationSeconds: song.durationSeconds,
                cover: song.artworkPath || "/default-cover.jpg",
              }}
              onPlay={onSongPlay}
              
            />
          ))
        ) : (
          <div className="song-empty">
            {searchQuery
              ? `Tidak ada lagu untuk "${searchQuery}"`
              : "Belum ada lagu yang tersedia."}
          </div>
        )}
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