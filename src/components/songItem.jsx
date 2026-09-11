import "./songItem.css";

function SongItem({ song, onPlay }) {
  return (
    <button
      className="song-item"
      onClick={() => onPlay(song)}
    >
      <img
        className="song-cover"
        src={song.cover}
        alt={song.title}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/default-cover.jpg";
          }}
      />

      <div className="song-info">
        <div className="song-title">
          {song.title}
        </div>

        <div className="song-artist">
          {song.artist}
        </div>
      </div>

      <div className="song-duration">
        {song.duration}
      </div>
    </button>
  );
}

export default SongItem;