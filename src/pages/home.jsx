import { useEffect, useState } from "react";

import Header from "../components/header";
import LibrarySidebar from "../components/librarySidebar";
import PlaylistView from "../components/playlistView";
import SongList from "../components/songList";
import MiniPlayer from "../components/miniPlayer";
import NowPlaying from "../components/nowPlaying";
import AlbumsView from "../components/albumsView";
import AlbumDetailView from "../components/albumDetailView";
import ArtistsView from "../components/artistsView";
import ArtistDetailView from "../components/artistDetailView";

import {
  playSong,
  pauseSong,
  resumeSong,
  stopSong,
  seekSong,
  setRepeat,
  shuffleSongs,
  nextSong,
  previousSong,
  getSongs,
  getPlaylists,
  createPlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
} from "../services/api";

function formatDuration(seconds) {
  if (!seconds) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
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

function Home() {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const [allSongs, setAllSongs] = useState([]);

  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [isNowPlayingOpen, setIsNowPlayingOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [sleepTimerActive, setSleepTimerActive] = useState(false);

  const [activeCategory, setActiveCategory] = useState("songs");
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const [selectedArtist, setSelectedArtist] = useState(null);
  
  useEffect(() => {
    loadAllData();
  }, []);

  async function loadAllData() {
    try {
      const songs = await getSongs();
      setAllSongs(songs || []);
    } catch (err) {
      console.error("Gagal memuat lagu:", err);
    }

    try {
      const pls = await getPlaylists();
      setPlaylists(pls || []);

      if (pls && pls.length > 0 && selectedPlaylistId === null) {
        setSelectedPlaylistId(pls[0].id);
      }
    } catch (err) {
      console.error("Gagal memuat playlist:", err);
    }
  }

  async function refreshPlaylists() {
    try {
      const pls = await getPlaylists();
      setPlaylists(pls || []);
    } catch (err) {
      console.error("Gagal memperbarui playlist:", err);
    }
  }

  const handleCreatePlaylist = async (name) => {
    try {
      const newPl = await createPlaylist(name);
      await refreshPlaylists();
      if (newPl && newPl.id) {
        setSelectedPlaylistId(newPl.id);
      }
    } catch (err) {
      console.error("Gagal membuat playlist:", err);
    }
  };

  const handleAddSongToPlaylist = async (playlistId, songId) => {
    try {
      await addSongToPlaylist(playlistId, songId);
      await refreshPlaylists();
    } catch (err) {
      console.error("Gagal menambah lagu ke playlist:", err);
    }
  };

  const handleRemoveSongFromPlaylist = async (playlistId, songId) => {
    try {
      await removeSongFromPlaylist(playlistId, songId);
      await refreshPlaylists();
    } catch (err) {
      console.error("Gagal menghapus lagu dari playlist:", err);
    }
  };

  const handleSongPlay = async (song) => {
    try {
      await playSong(song.id);
      setCurrentSong(song);
      setIsPlaying(true);
      setCurrentTime(0);
      setIsLiked(false); // reset like, belum ada backend untuk simpan status like per lagu
    } catch (error) {
      console.error("Gagal memainkan lagu:", error);
    }
  };

  const handlePlayPause = async () => {
    try {
      if (isPlaying) {
        await pauseSong();
        setIsPlaying(false);
      } else {
        await resumeSong();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Gagal mengubah playback:", error);
    }
  };

  const handleStop = async () => {
    try {
      await stopSong();
      setIsPlaying(false);
    } catch (error) {
      console.error("Gagal menghentikan lagu:", error);
    }
  };

  const handleSeek = async (seconds) => {
    try {
      await seekSong(seconds);
      setCurrentTime(seconds);
    } catch (error) {
      console.error("Gagal seek lagu:", error);
    }
  };

  const handleToggleRepeat = async () => {
    try {
      const next = !isRepeat;
      await setRepeat(next);
      setIsRepeat(next);
    } catch (error) {
      console.error("Gagal mengubah repeat:", error);
    }
  };

  const handleToggleShuffle = async () => {
    try {
      const next = !isShuffled;
      await shuffleSongs(next);
      setIsShuffled(next);
    } catch (error) {
      console.error("Gagal mengubah shuffle:", error);
    }
  };

const handleNext = async () => {
  if (!currentSong || allSongs.length === 0) return;

  try {
    await nextSong(); // beri tahu backend supaya audio maju

    const currentIndex = allSongs.findIndex((s) => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % allSongs.length;
    const nextRawSong = allSongs[nextIndex];

    await handleSongPlay(toPlayableSong(nextRawSong));
  } catch (error) {
    console.error("Gagal skip ke lagu berikutnya:", error);
  }
};

const handlePrevious = async () => {
  if (!currentSong || allSongs.length === 0) return;

  try {
    await previousSong(); // beri tahu backend supaya audio mundur

    const currentIndex = allSongs.findIndex((s) => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + allSongs.length) % allSongs.length;
    const prevRawSong = allSongs[prevIndex];

    await handleSongPlay(toPlayableSong(prevRawSong));
  } catch (error) {
    console.error("Gagal kembali ke lagu sebelumnya:", error);
  }
};

  const handleToggleLike = () => {
    setIsLiked((prev) => !prev); // FE-only, belum ada endpoint like di backend
  };

  const handleToggleSleepTimer = () => {
    setSleepTimerActive((prev) => !prev); // FE-only, belum ada endpoint sleep timer
  };

  // Timer lokal untuk progress seekbar selama lagu playing
  useEffect(() => {
    if (!isPlaying || !currentSong) return;

    const interval = setInterval(() => {
      setCurrentTime((t) => {
        const max = currentSong.durationSeconds || 0;
        return t < max ? t + 1 : t;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, currentSong]);

  const activePlaylist = playlists.find((p) => p.id === selectedPlaylistId);

  const trackNumber = currentSong
    ? allSongs.findIndex((s) => s.id === currentSong.id) + 1
    : 0;

  return (
    <div className="home-layout">
      <Header
        onMenuClick={() => setSelectedPlaylistId(null)}
        isSearchOpen={isSearchOpen}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenSearch={() => setIsSearchOpen(true)}
        onCloseSearch={() => {
          setIsSearchOpen(false);
          setSearchQuery("");
        }}
      />

      <div className="home-body">
        <LibrarySidebar
          playlists={playlists}
          selectedPlaylistId={selectedPlaylistId}
          onSelectPlaylist={(id) => setSelectedPlaylistId(id)}
          onCreatePlaylist={handleCreatePlaylist}
          currentSong={currentSong}
          isPlaying={isPlaying}
        />

        <main className="home-main">
          {activePlaylist ? (
            <PlaylistView
              playlist={activePlaylist}
              allAvailableSongs={allSongs}
              currentSong={currentSong}
              isPlaying={isPlaying}
              onPlaySong={handleSongPlay}
              onTogglePlay={handlePlayPause}
              onAddSong={handleAddSongToPlaylist}
              onRemoveSong={handleRemoveSongFromPlaylist}
            />
          ) : (
            <div className="home-all-songs">
              <div className="categories">
                <button
                  className={activeCategory === "songs" ? "active" : ""}
                  onClick={() => {
                    setActiveCategory("songs");
                    setSelectedAlbum(null);
                    setSelectedArtist(null);
                  }}
                >
                  Songs
                </button>
                <button
                  className={activeCategory === "albums" ? "active" : ""}
                  onClick={() => {
                    setActiveCategory("albums");
                    setSelectedAlbum(null);
                    setSelectedArtist(null);
                  }}
                >
                  Albums
                </button>
                <button
                  className={activeCategory === "artist" ? "active" : ""}
                  onClick={() => {
                    setActiveCategory("artist");
                    setSelectedAlbum(null);
                    setSelectedArtist(null);
                  }}
                >
                  Artist
                </button>
                <button>Playlist</button>
                <button>Recently</button>
              </div>

              {activeCategory === "songs" && (
                <SongList
                  searchQuery={searchQuery}
                  onSongPlay={handleSongPlay}
                />
              )}

              {activeCategory === "albums" && !selectedAlbum && (
                <AlbumsView
                  songs={allSongs}
                  onSelectAlbum={setSelectedAlbum}
                />
              )}

              {activeCategory === "albums" && selectedAlbum && (
                <AlbumDetailView
                  album={selectedAlbum}
                  onBack={() => setSelectedAlbum(null)}
                  onSongPlay={handleSongPlay}
                />
              )}

              {activeCategory === "artist" && !selectedArtist && (
                <ArtistsView
                  songs={allSongs}
                  onSelectArtist={setSelectedArtist}
                />
              )}

              {activeCategory === "artist" && selectedArtist && (
                <ArtistDetailView
                  artist={selectedArtist}
                  onBack={() => setSelectedArtist(null)}
                  onSongPlay={handleSongPlay}
                />
              )}
            </div>
          )}
        </main>
      </div>

      <MiniPlayer
        song={currentSong}
        isPlaying={isPlaying}
        onTogglePlay={handlePlayPause}
        onStop={handleStop}
        onOpen={() => setIsNowPlayingOpen(true)}
      />

      <NowPlaying
        isOpen={isNowPlayingOpen}
        song={currentSong}
        isPlaying={isPlaying}
        currentTime={currentTime}
        onTogglePlay={handlePlayPause}
        onClose={() => setIsNowPlayingOpen(false)}
        onSeek={handleSeek}
        onNext={handleNext}
        onPrevious={handlePrevious}
        isLiked={isLiked}
        onToggleLike={handleToggleLike}
        isRepeat={isRepeat}
        onToggleRepeat={handleToggleRepeat}
        isShuffled={isShuffled}
        onToggleShuffle={handleToggleShuffle}
        sleepTimerActive={sleepTimerActive}
        onToggleSleepTimer={handleToggleSleepTimer}
        trackNumber={trackNumber}
        totalTracks={allSongs.length}
      />
    </div>
  );
}

export default Home;