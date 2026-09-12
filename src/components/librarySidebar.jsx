import { useState } from "react";
import "./librarySidebar.css";

function LibrarySidebar({
  playlists = [],
  selectedPlaylistId = null,
  onSelectPlaylist,
  onCreatePlaylist,
  currentSong = null,
  isPlaying = false,
  isOpen = true,
}) {
  const [filter, setFilter] = useState("all");
  const [isCreating, setIsCreating] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [sidebarSearch, setSidebarSearch] = useState("");

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!newPlaylistName.trim()) return;
    await onCreatePlaylist(newPlaylistName.trim());
    setNewPlaylistName("");
    setIsCreating(false);
  };

  const filteredPlaylists = playlists.filter((pl) => {
    return pl.name.toLowerCase().includes(sidebarSearch.toLowerCase());
  });

  return (
    <aside className={`library-sidebar ${!isOpen ? "library-sidebar--closed" : ""}`}>
      {/* Header */}
      <div className="library-header">
        <div className="library-header__title">
          <span>Your Library</span>
        </div>
        <button
          className="library-header__add-btn"
          title="Create playlist"
          onClick={() => setIsCreating(!isCreating)}
          aria-label="Create playlist"
        >
          +
        </button>
      </div>

      {/* Inline Create Form */}
      {isCreating && (
        <form className="library-create-form" onSubmit={handleCreateSubmit}>
          <input
            type="text"
            className="library-create-input"
            placeholder="Nama playlist baru..."
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            autoFocus
          />
          <div className="library-create-actions">
            <button type="submit" className="library-btn-submit">
              Buat
            </button>
            <button
              type="button"
              className="library-btn-cancel"
              onClick={() => {
                setIsCreating(false);
                setNewPlaylistName("");
              }}
            >
              Batal
            </button>
          </div>
        </form>
      )}

      {/* Filter Chips */}
      <div className="library-chips">
        <button
          className={`library-chip ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`library-chip ${filter === "playlists" ? "active" : ""}`}
          onClick={() => setFilter("playlists")}
        >
          Playlists
        </button>
      </div>

      {/* Search Filter Row */}
      <div className="library-search-row">
        <div className="library-search-box">
          <span className="library-search-icon">🔍</span>
          <input
            type="text"
            className="library-search-input"
            placeholder="Cari playlist..."
            value={sidebarSearch}
            onChange={(e) => setSidebarSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Playlist List */}
      <div className="library-list">
        {/* Special Item: Semua Lagu (All Songs) */}
        {filter === "all" && (
          <div
            className={`library-item ${selectedPlaylistId === null ? "library-item--active" : ""}`}
            onClick={() => onSelectPlaylist(null)}
          >
            <div className="library-item__cover library-item__cover--all">
              <span>🎵</span>
            </div>
            <div className="library-item__info">
              <p className="library-item__name">Semua Lagu</p>
              <p className="library-item__meta">Koleksi • Semua Lagu</p>
            </div>
          </div>
        )}

        {/* User Playlists */}
        {filteredPlaylists.map((playlist) => {
          const isSelected = selectedPlaylistId === playlist.id;
          const songCount = playlist.songs?.length || 0;
          const hasPlayingSong =
            isPlaying &&
            currentSong &&
            playlist.songs?.some((ps) => ps.songId === currentSong.id);

          return (
            <div
              key={playlist.id}
              className={`library-item ${isSelected ? "library-item--active" : ""}`}
              onClick={() => onSelectPlaylist(playlist.id)}
            >
              <div className="library-item__cover">
                <img
                  src={playlist.songs?.[0]?.song?.artworkPath || "/default-cover.jpg"}
                  alt={playlist.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-cover.jpg";
                  }}
                />
              </div>

              <div className="library-item__info">
                <p className="library-item__name">
                  {playlist.name}
                  {hasPlayingSong && <span className="playing-dot"> 🔊</span>}
                </p>
                <p className="library-item__meta">
                  Playlist • {songCount} lagu
                </p>
              </div>
            </div>
          );
        })}

        {filteredPlaylists.length === 0 && filter === "playlists" && (
          <div className="library-empty">
            Belum ada playlist. Klik <strong>+</strong> untuk membuat!
          </div>
        )}
      </div>
    </aside>
  );
}

export default LibrarySidebar;
