import "./nowPlaying.css";
import downIcon from "../assets/miniPlayer/down.svg";
import nowPlayIcon from "../assets/miniPlayer/nowPlay.svg";
import searchIcon from "../assets/search.svg";
import likeIcon from "../assets/miniPlayer/like.svg";
import loopIcon from "../assets/miniPlayer/loop.svg";
import sleepIcon from "../assets/miniPlayer/sleep.svg";
import optionIcon from "../assets/miniPlayer/option.svg";
import shuffleIcon from "../assets/miniPlayer/shuffle next song.svg";
import prevIcon from "../assets/miniPlayer/prev.svg";
import nextIcon from "../assets/miniPlayer/next.svg";
import playIcon from "../assets/miniPlayer/play.svg";
import pauseIcon from "../assets/miniPlayer/pause.svg";

function formatTime(seconds) {
  if (!seconds && seconds !== 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function NowPlaying({
  isOpen,
  song,
  isPlaying,
  currentTime,
  onTogglePlay,
  onClose,
  onOpenSearch,
  onSeek,
  onNext,
  onPrevious,
  isLiked,
  onToggleLike,
  isRepeat,
  onToggleRepeat,
  isShuffled,
  onToggleShuffle,
  sleepTimerActive,
  onToggleSleepTimer,
  trackNumber,
  totalTracks,
}) {
  if (!song) return null;

  const duration = song.durationSeconds || 0;
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`now-playing ${isOpen ? "now-playing--open" : ""}`}>
      <div className="now-playing__header">
        <button className="icon-button" onClick={onClose} aria-label="Close">
          <img src={downIcon} alt="" />
        </button>

        <div className="now-playing__title-group">
          <img src={nowPlayIcon} alt="Now Playing" />
        </div>

        <button
          className="icon-button"
          onClick={() => {
            if (onClose) onClose();
            if (onOpenSearch) onOpenSearch();
          }}
          aria-label="Search"
        >
          <img src={searchIcon} alt="" />
        </button>
      </div>

      <div className="now-playing__cover-wrap">
        <img
          className="now-playing__cover"
          src={song.cover || "/default-cover.jpg"}
          alt={song.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/default-cover.jpg";
          }}
        />
      </div>

      <h2 className="now-playing__title">{song.title}</h2>
      <p className="now-playing__artist">{song.artist}</p>

      <div className="now-playing__actions">
        <button
          className={`icon-button ${isLiked ? "is-active" : ""}`}
          onClick={onToggleLike}
          aria-label="Like"
        >
          <img src={likeIcon} alt="" />
        </button>

        <button
          className={`icon-button ${isRepeat ? "is-active" : ""}`}
          onClick={onToggleRepeat}
          aria-label="Repeat"
        >
          <img src={loopIcon} alt="" />
        </button>

        <button
          className={`icon-button ${sleepTimerActive ? "is-active" : ""}`}
          onClick={onToggleSleepTimer}
          aria-label="Sleep timer"
        >
          <img src={sleepIcon} alt="" />
        </button>

        <button className="icon-button" aria-label="More options">
          <img src={optionIcon} alt="" />
        </button>

        <button
          className={`icon-button ${isShuffled ? "is-active" : ""}`}
          onClick={onToggleShuffle}
          aria-label="Shuffle"
        >
          <img src={shuffleIcon} alt="" />
        </button>
      </div>

      <div className="now-playing__seek">
        <input
          type="range"
          className="seek-bar"
          min={0}
          max={duration || 0}
          value={Math.min(currentTime, duration)}
          style={{ "--progress": `${progressPercent}%` }}
          onChange={(e) => onSeek(Number(e.target.value))}
        />
        <div className="now-playing__times">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="now-playing__controls">
        <button className="icon-button" onClick={onPrevious} aria-label="Previous">
          <img src={prevIcon} alt="" />
        </button>

        <button
          className="now-playing__play"
          onClick={onTogglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          <img src={isPlaying ? pauseIcon : playIcon} alt="" />
        </button>

        <button className="icon-button" onClick={onNext} aria-label="Next">
          <img src={nextIcon} alt="" />
        </button>
      </div>

      <div className="now-playing__meta">
        <span>{song.format || "MP3"}</span>
        <span>{trackNumber}/{totalTracks}</span>
        <span>{song.bitrate || "320 Kb/s"}</span>
      </div>
    </div>
  );
}

export default NowPlaying;