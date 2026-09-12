import { useState } from "react";
import playIcon from "../assets/play.svg";
import pauseIcon from "../assets/pause.svg";
import "./playlistView.css";

function PlaylistView({
  playlist,
  allAvailableSongs = [],
  currentSong,
  isPlaying,
  onPlaySong,
  onTogglePlay,
  onAddSong,
  onRemoveSong,
}) {
  const [filterText, setFilterText] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  if (!playlist) return null;

  const rawSongs = (playlist.songs || [])
    .map((ps) => ps.song)
    .filter(Boolean);

  const filteredSongs = rawSongs.filter((song) => {
    const term = filterText.toLowerCase();
    return (
      song.title.toLowerCase().includes(term) ||
      song.artist.toLowerCase().includes(term) ||
      (song.album && song.album.toLowerCase().includes(term))
    );
  });

  const totalDurationSeconds = rawSongs.reduce(
    (acc, s) => acc + (s.durationSeconds || 0),
    0
  );

  const playlistCover =
    rawSongs[0]?.artworkPath || "/default-cover.jpg";

  // Check if current playing song belongs to this playlist
  const isThisPlaylistPlaying =
    isPlaying && currentSong && rawSongs.some((s) => s.id === currentSong.id);

  // Songs available to add (not yet in playlist)
  const existingIds = new Set(rawSongs.map((s) => s.id));
  const candidateSongs = allAvailableSongs.filter((s) => !existingIds.has(s.id));

  const handlePlayFirst = () => {
    if (filteredSongs.length > 0) {
      if (isThisPlaylistPlaying) {
        onTogglePlay();
      } else {
        onPlaySong(filteredSongs[0]);
      }
    }
  };

  return (
    <div className="playlist-view">
      {/* Hero Header (No Public Playlist text) */}
      <section className="playlist-hero">
        <div className="playlist-hero__cover-wrapper">
          <img
            src={playlistCover}
            alt={playlist.name}
            className="playlist-hero__cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/default-cover.jpg";
            }}
          />
        </div>

        <div className="playlist-hero__details">
          <h1 className="playlist-hero__title">{playlist.name}</h1>
          <p className="playlist-hero__meta">
            <span className="playlist-hero__author">Sonata</span>
            <span className="bullet">•</span>
            <span>{rawSongs.length} lagu</span>
            <span className="bullet">•</span>
            <span>{formatTotalDuration(totalDurationSeconds)}</span>
          </p>
        </div>
      </section>

      {/* Action Bar */}
      <section className="playlist-actions">
        <button
          className="playlist-play-btn"
          onClick={handlePlayFirst}
          disabled={rawSongs.length === 0}
          title={isThisPlaylistPlaying ? "Pause" : "Play Playlist"}
          aria-label={isThisPlaylistPlaying ? "Pause" : "Play"}
        >
          <img
            src={isThisPlaylistPlaying ? pauseIcon : playIcon}
            alt=""
            className="playlist-play-btn__icon"
          />
        </button>

        <button
          className="playlist-add-btn"
          onClick={() => setShowAddModal(true)}
        >
          + Tambah Lagu
        </button>

        <div className="playlist-filter-box">
          <span className="playlist-filter-icon">🔍</span>
          <input
            type="text"
            className="playlist-filter-input"
            placeholder="Cari dalam playlist..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          {filterText && (
            <button
              className="playlist-filter-clear"
              onClick={() => setFilterText("")}
            >
              ✕
            </button>
          )}
        </div>
      </section>

      {/* Tracklist Table */}
      <div className="playlist-tracklist-wrapper">
        <table className="playlist-table">
          <thead>
            <tr>
              <th className="th-num">#</th>
              <th className="th-title">Title</th>
              <th className="th-album">Album</th>
              <th className="th-duration">⏱</th>
              <th className="th-action"></th>
            </tr>
          </thead>
          <tbody>
            {filteredSongs.map((song, index) => {
              const isCurrent = currentSong && currentSong.id === song.id;
              const isSongActive = isCurrent && isPlaying;

              return (
                <tr
                  key={song.id}
                  className={`track-row ${isCurrent ? "track-row--active" : ""}`}
                  onDoubleClick={() => onPlaySong(song)}
                >
                  <td className="td-num">
                    <button
                      className="track-play-btn"
                      onClick={() => {
                        if (isCurrent) {
                          onTogglePlay();
                        } else {
                          onPlaySong(song);
                        }
                      }}
                    >
                      <span className="track-index">
                        {isSongActive ? "🔊" : index + 1}
                      </span>
                      <span className="track-hover-icon">
                        {isSongActive ? "⏸" : "▶"}
                      </span>
                    </button>
                  </td>

                  <td className="td-title">
                    <div className="track-title-cell">
                      <img
                        src={song.artworkPath || "/default-cover.jpg"}
                        alt=""
                        className="track-thumb"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/default-cover.jpg";
                        }}
                      />
                      <div className="track-info">
                        <span className="track-title">{song.title}</span>
                        <span className="track-artist">{song.artist}</span>
                      </div>
                    </div>
                  </td>

                  <td className="td-album">{song.album || "—"}</td>

                  <td className="td-duration">
                    {formatDuration(song.durationSeconds)}
                  </td>

                  <td className="td-action">
                    <button
                      className="track-remove-btn"
                      title="Hapus dari playlist"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveSong(playlist.id, song.id);
                      }}
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredSongs.length === 0 && (
          <div className="playlist-empty">
            {filterText
              ? `Tidak ada lagu yang cocok dengan "${filterText}"`
              : "Playlist ini masih kosong. Klik '+ Tambah Lagu' untuk menambahkan lagu dari koleksi!"}
          </div>
        )}
      </div>

      {/* Modal / Dialog Add Song */}
      {showAddModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Tambah Lagu ke "{playlist.name}"</h3>
              <button
                className="modal-close-btn"
                onClick={() => setShowAddModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-song-list">
              {candidateSongs.length > 0 ? (
                candidateSongs.map((s) => (
                  <div key={s.id} className="modal-song-item">
                    <img
                      src={s.artworkPath || "/default-cover.jpg"}
                      alt=""
                      className="modal-song-thumb"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/default-cover.jpg";
                      }}
                    />
                    <div className="modal-song-info">
                      <p className="modal-song-title">{s.title}</p>
                      <p className="modal-song-artist">{s.artist}</p>
                    </div>
                    <button
                      className="modal-song-add-btn"
                      onClick={async () => {
                        await onAddSong(playlist.id, s.id);
                      }}
                    >
                      + Tambah
                    </button>
                  </div>
                ))
              ) : (
                <div className="modal-empty">
                  Semua lagu di koleksi sudah ada di dalam playlist ini!
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function formatDuration(seconds) {
  if (!seconds) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function formatTotalDuration(totalSec) {
  if (!totalSec) return "0 mnt";
  const hours = Math.floor(totalSec / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  if (hours > 0) {
    return `${hours} jam ${minutes} mnt`;
  }
  return `${minutes} mnt`;
}

export default PlaylistView;
