import { useState } from "react";
import SongItem from "./songItem";

const songs = [
  {
    id: 1,
    title: "Music Title",
    artist: "Music Artist",
    duration: "0:00",
    cover:
      "https://images.unsplash.com/photo-1511497584788-876760111969?w=200",
  },
  {
    id: 2,
    title: "Mountain View",
    artist: "Music Artist",
    duration: "0:00",
    cover:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=200",
  },
  {
    id: 3,
    title: "City Lights",
    artist: "Music Artist",
    duration: "0:00",
    cover:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=200",
  },
  {
    id: 4,
    title: "Night Drive",
    artist: "Music Artist",
    duration: "0:00",
    cover:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=200",
  },
  {
    id: 5,
    title: "Golden Hour",
    artist: "Music Artist",
    duration: "0:00",
    cover:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=200",
  },
  {
    id: 6,
    title: "Purple Flower",
    artist: "Music Artist",
    duration: "0:00",
    cover:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=200",
  },
  {
    id: 7,
    title: "My Cat",
    artist: "Music Artist",
    duration: "0:00",
    cover:
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=200",
  },
  {
    id: 8,
    title: "Yellow Flower",
    artist: "Music Artist",
    duration: "0:00",
    cover:
      "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=200",
  },
  {
    id: 9,
    title: "Lovely Dog",
    artist: "Music Artist",
    duration: "0:00",
    cover:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=200",
  },
  {
    id: 10,
    title: "Another Song",
    artist: "Music Artist",
    duration: "0:00",
    cover:
      "https://images.unsplash.com/photo-1511497584788-876760111969?w=200",
  },
];

function SongList() {
  const [sortOrder, setSortOrder] = useState("asc");

  const handlePlay = (song) => {
    console.log("Playing:", song.title);
  };

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

  return (
    <section className="song-section">
      {/* Toolbar */}
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
          onClick={() => {
            console.log("Shuffle");
          }}
          aria-label="Shuffle"
        >
          🔀
        </button>
      </div>

      {/* Songs */}
      <div className="song-list">
        {sortedSongs.map((song) => (
          <SongItem
            key={song.id}
            song={song}
            onPlay={handlePlay}
          />
        ))}
      </div>
    </section>
  );
}

export default SongList;