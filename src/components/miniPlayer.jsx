import "./miniPlayer.css";

import { useScrollDirection } from "../hooks/useScrollDirection";

function MiniPlayer({ song, isPlaying, onTogglePlay }) {
  const hidden = useScrollDirection();

  if (!song) return null; // belum ada lagu yang diputar

  return (
    <div className={`mini-player ${hidden ? "mini-player--hidden" : ""}`}>
      <img
        src={song.cover}
        alt={song.title}
        className="mini-player__cover"
      />

      <div className="mini-player__info">
        <p className="mini-player__title">{song.title}</p>
        <p className="mini-player__artist">{song.artist}</p>
      </div>

      <button
        className="mini-player__play"
        onClick={onTogglePlay}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? "⏸" : "▶"}
      </button>

      <span className="mini-player__duration">{song.duration}</span>
    </div>
  );
}

export default MiniPlayer;
