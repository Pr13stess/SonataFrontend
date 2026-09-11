import "./miniPlayer.css";
import playIcon from "../assets/play.svg";
import pauseIcon from "../assets/pause.svg";
import { useScrollDirection } from "../hooks/useScrollDirection";

function MiniPlayer({ song, isPlaying, onTogglePlay }) {
  console.log("MiniPlayer isPlaying:", isPlaying);
  const hidden = useScrollDirection();

  if (!song) return null;

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
        <img
          key={isPlaying ? "pause" : "play"}
          src={isPlaying ? pauseIcon : playIcon}
          alt=""
          className="mini-player__play-icon"
        />
      </button>
      <span className="mini-player__duration">{song.duration}</span>
    </div>
  );
}

export default MiniPlayer;