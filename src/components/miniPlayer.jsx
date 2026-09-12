import "./miniPlayer.css";
import playIcon from "../assets/play.svg";
import pauseIcon from "../assets/pause.svg";
import prevIcon from "../assets/miniPlayer/prev.svg";
import nextIcon from "../assets/miniPlayer/next.svg";
import { useScrollDirection } from "../hooks/useScrollDirection";

function MiniPlayer({ song, isPlaying, onTogglePlay, onNext, onPrevious, onOpen }) {
  const hidden = useScrollDirection();

  if (!song) return null;

  return (
    <div
      className={`mini-player ${hidden ? "mini-player--hidden" : ""}`}
      onClick={onOpen}
    >
      <img
        src={song.cover || "/default-cover.jpg"}
        alt={song.title}
        className="mini-player__cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/default-cover.jpg";
        }}
      />

      <div className="mini-player__info">
        <p className="mini-player__title">{song.title}</p>
        <p className="mini-player__artist">{song.artist}</p>
      </div>

      <div className="mini-player__controls" onClick={(e) => e.stopPropagation()}>
        {onPrevious && (
          <button
            className="mini-player__skip-btn"
            onClick={onPrevious}
            aria-label="Previous song"
            title="Lagu Sebelumnya"
          >
            <img src={prevIcon} alt="Previous" className="mini-player__skip-icon" />
          </button>
        )}

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

        {onNext && (
          <button
            className="mini-player__skip-btn"
            onClick={onNext}
            aria-label="Next song"
            title="Lagu Berikutnya"
          >
            <img src={nextIcon} alt="Next" className="mini-player__skip-icon" />
          </button>
        )}
      </div>

      <span className="mini-player__duration">{song.duration}</span>
    </div>
  );
}

export default MiniPlayer;