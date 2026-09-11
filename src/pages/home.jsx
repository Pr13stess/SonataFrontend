import { useState } from "react";

import Header from "../components/header";
import Sidebar from "../components/sidebar";
import SongList from "../components/songList";
import MiniPlayer from "../components/miniPlayer";

import {
  playSong,
  pauseSong,
  resumeSong,
  stopSong,
} from "../services/api";

function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSearchClick = () => {
    console.log("Search clicked");
  };

  const handleSongPlay = async (song) => {
    try {
      await playSong(song.id);

      setCurrentSong(song);
      setIsPlaying(true);

      console.log("Playing:", song.title);
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

      // Mini player tetap muncul
      setIsPlaying(false);
    } catch (error) {
      console.error("Gagal menghentikan lagu:", error);
    }
  };

  return (
    <div className="home">
      <Header
        onMenuClick={() => setSidebarOpen(true)}
        onSearchClick={handleSearchClick}
      />

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="categories">
        <button className="active">Songs</button>
        <button>Albums</button>
        <button>Artist</button>
        <button>Playlist</button>
        <button>Recently</button>
      </div>

      <SongList onSongPlay={handleSongPlay} />

      <MiniPlayer
        song={currentSong}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onStop={handleStop}
      />
    </div>
  );
}

export default Home;