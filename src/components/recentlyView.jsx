import "./recentlyView.css";
import SongItem from "./songItem";
import playIcon from "../assets/play.svg";
import pauseIcon from "../assets/pause.svg";

function formatDuration(seconds) {
  if (!seconds) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function toPlayableSong(song) {
  return {
    id: song.id,
    title: song.title,
    artist: song.artist,
    duration: formatDuration(song.durationSeconds),
    durationSeconds: song.durationSeconds,
    cover: song.artworkPath || "/default-cover.jpg",
  };
}

function RecentlyView({
  songs = [],
  currentSong,
  isPlaying,
  onSongPlay,
  onTogglePlay,
}) {
  const isThisQueuePlaying =
    isPlaying && currentSong && songs.some((s) => s.id === currentSong.id);

  const handlePlayFirst = () => {
    if (songs.length === 0) return;
    if (isThisQueuePlaying) {
      onTogglePlay();
    } else {
      onSongPlay(toPlayableSong(songs[0]));
    }
  };

  if (songs.length === 0) {
    return <div className="song-empty">Belum ada lagu yang baru diputar.</div>;
  }

  return (
    <div className="recently-view">
      <div className="recently-header">
        <button
          className="recently-play-btn"
          onClick={handlePlayFirst}
          aria-label={isThisQueuePlaying ? "Pause" : "Play"}
        >
          <img
            src={isThisQueuePlaying ? pauseIcon : playIcon}
            alt=""
            className="recently-play-btn__icon"
          />
        </button>
        <div>
          <h2 className="recently-title">Recently Played</h2>
          <p className="recently-count">{songs.length} lagu</p>
        </div>
      </div>

      <div className="recently-songs">
        {songs.map((song) => (
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
            onPlay={(s) => onSongPlay(toPlayableSong(s))}
          />
        ))}
      </div>
    </div>
  );
}

export default RecentlyView;