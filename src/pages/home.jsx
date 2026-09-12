import { useEffect, useState } from "react";

import Header from "../components/header";
import LibrarySidebar from "../components/librarySidebar";
import PlaylistView from "../components/playlistView";
import SongList from "../components/songList";
import MiniPlayer from "../components/miniPlayer";
import NowPlaying from "../components/nowPlaying";

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

  useEffect(() => {
    loadAllData();
  }, []);

  async function loadAllData() {
    try {
      const [pls, songs] = await Promise.all([getPlaylists(), getSongs()]);
      setPlaylists(pls || []);
      setAllSongs(songs || []);

      if (pls && pls.length > 0 && selectedPlaylistId === null) {
        setSelectedPlaylistId(pls[0].id);
      }
    } catch (err) {
      console.error("Gagal memuat data awal:", err);
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
    try {
      await nextSong();
      // TODO: backend belum mengembalikan info lagu berikutnya,
      // jadi currentSong di UI belum otomatis berpindah.
    } catch (error) {
      console.error("Gagal skip ke lagu berikutnya:", error);
    }
  };

  const handlePrevious = async () => {
    try {
      await previousSong();
      // TODO: sama seperti handleNext, menunggu backend expose info lagu aktif.
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
                <button className="active">Songs</button>
                <button>Albums</button>
                <button>Artist</button>
                <button>Playlist</button>
                <button>Recently</button>
              </div>

              <SongList
                searchQuery={searchQuery}
                onSongPlay={handleSongPlay}
              />
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