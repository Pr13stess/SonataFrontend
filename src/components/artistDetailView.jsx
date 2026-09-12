import "./artistDetailView.css";
import SongItem from "./songItem";
import backIcon from "../assets/albumDetail/back.svg";

function formatDuration(seconds) {
  if (!seconds) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

function ArtistDetailView({ artist, onBack, onSongPlay }) {
  if (!artist) return null;

  return (
    <div className="artist-detail">
      <button
        className="artist-detail__back"
        onClick={onBack}
        aria-label="Kembali"
      >
        <img src={backIcon} alt="" />
      </button>

      <div className="artist-detail__header">
        <img
          src={artist.cover}
          alt={artist.name}
          className="artist-detail__cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/default-cover.jpg";
          }}
        />
        <h2 className="artist-detail__name">{artist.name}</h2>
        <p className="artist-detail__count">{artist.songs.length} lagu</p>
      </div>

      <div className="artist-detail__songs">
        {artist.songs.map((song) => (
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

export default ArtistDetailView;