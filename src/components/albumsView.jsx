import "./albumsView.css";

function groupSongsByAlbum(songs) {
  const map = new Map();

  songs.forEach((song) => {
    const albumName = song.album || "Unknown Album";

    if (!map.has(albumName)) {
      map.set(albumName, {
        name: albumName,
        artist: song.artist,
        cover: song.artworkPath || "/default-cover.jpg",
        songs: [],
      });
    }

    map.get(albumName).songs.push(song);
  });

  return Array.from(map.values());
}

function AlbumsView({ songs, onSelectAlbum }) {
  const albums = groupSongsByAlbum(songs);

  if (albums.length === 0) {
    return <div className="song-empty">Belum ada album.</div>;
  }

  return (
    <div className="albums-grid">
      {albums.map((album) => (
        <button
          key={album.name}
          className="album-card"
          onClick={() => onSelectAlbum(album)}
        >
          <img
            src={album.cover}
            alt={album.name}
            className="album-card__cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/default-cover.jpg";
            }}
          />
          <div className="album-card__title">{album.name}</div>
          <div className="album-card__artist">{album.artist}</div>
        </button>
      ))}
    </div>
  );
}

export default AlbumsView;