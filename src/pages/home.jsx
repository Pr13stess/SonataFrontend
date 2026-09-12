import { useEffect, useState } from "react";

import Header from "../components/header";
import LibrarySidebar from "../components/librarySidebar";
import PlaylistView from "../components/playlistView";
import SongList from "../components/songList";
import MiniPlayer from "../components/miniPlayer";

import {
  playSong,
  pauseSong,
  resumeSong,
  stopSong,
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

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadAllData();
  }, []);

  async function loadAllData() {
    try {
      const [pls, songs] = await Promise.all([getPlaylists(), getSongs()]);
      setPlaylists(pls || []);
      setAllSongs(songs || []);

      // If there is at least one playlist, select the first one by default, or stay on All Songs
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

  // Find currently selected playlist
  const activePlaylist = playlists.find((p) => p.id === selectedPlaylistId);

  return (
    <div className="home-layout">
      {/* Top Header */}
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

      {/* Main Split Layout */}
      <div className="home-body">
        {/* Left Library Sidebar (Spotify-style) */}
        <LibrarySidebar
          playlists={playlists}
          selectedPlaylistId={selectedPlaylistId}
          onSelectPlaylist={(id) => setSelectedPlaylistId(id)}
          onCreatePlaylist={handleCreatePlaylist}
          currentSong={currentSong}
          isPlaying={isPlaying}
        />

        {/* Center Main View */}
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

      {/* Bottom Player Bar */}
      <MiniPlayer
        song={currentSong}
        isPlaying={isPlaying}
        onTogglePlay={handlePlayPause}
        onStop={handleStop}
      />
    </div>
  );
}

export default Home;
