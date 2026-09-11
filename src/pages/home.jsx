import { useState } from "react";

import Header from "../components/header";
import Sidebar from "../components/sidebar";
import SongList from "../components/songList";
import MiniPlayer from "../components/miniPlayer";

function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSearchClick = () => {
    console.log("Search clicked");
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

      <SongList />

      <MiniPlayer />
    </div>
  );
}

export default Home;