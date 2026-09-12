import "./albumDetailView.css";
import SongItem from "./songItem";
import backIcon from "../assets/albumDetail/back.svg";

function formatDuration(seconds) {
  if (!seconds) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

function AlbumDetailView({ album, onBack, onSongPlay }) {
  if (!album) return null;

  return (
    <div className="album-detail">
      <button className="album-detail__back" onClick={onBack} aria-label="Kembali">
        <img src={backIcon} alt="" />
      </button>

      <div className="album-detail__header">
        <img
          src={album.cover}
          alt={album.name}
          className="album-detail__cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/default-cover.jpg";
          }}
        />
        <h2 className="album-detail__title">{album.name}</h2>
        <p className="album-detail__artist">{album.artist}</p>
      </div>

      <div className="album-detail__songs">
        {album.songs.map((song) => (
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
        ))}
      </div>
    </div>
  );
}

export default AlbumDetailView;