import "./artistsView.css";

function groupSongsByArtist(songs) {
  const map = new Map();

  songs.forEach((song) => {
    const rawArtist = song.artist || "Unknown Artist";

    const artistNames = rawArtist
      .split(";")
      .map((name) => name.trim())
      .filter((name) => name.length > 0);

    const finalNames = artistNames.length > 0 ? artistNames : ["Unknown Artist"];

    finalNames.forEach((artistName) => {
      if (!map.has(artistName)) {
        map.set(artistName, {
          name: artistName,
          cover: song.artworkPath || "/default-cover.jpg",
          songs: [],
        });
      }

      map.get(artistName).songs.push(song);
    });
  });

  return Array.from(map.values());
}

function ArtistsView({ songs, onSelectArtist }) {
  const artists = groupSongsByArtist(songs);

  if (artists.length === 0) {
    return <div className="song-empty">Belum ada artist.</div>;
  }

  return (
    <div className="artists-grid">
      {artists.map((artist) => (
        <button
          key={artist.name}
          className="artist-card"
          onClick={() => onSelectArtist(artist)}
        >
          <img
            src={artist.cover}
            alt={artist.name}
            className="artist-card__cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/default-cover.jpg";
            }}
          />
          <div className="artist-card__name">{artist.name}</div>
          <div className="artist-card__count">
            {artist.songs.length} lagu
          </div>
        </button>
      ))}
    </div>
  );
}

export default ArtistsView;