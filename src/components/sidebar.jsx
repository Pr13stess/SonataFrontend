   import "./sidebar.css";

function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
        />
      )}

      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            SONATA <span>♪</span>
          </div>

          <button
            className="sidebar-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        <nav className="sidebar-menu">
          <button className="sidebar-menu-item active">
            <span className="menu-icon">♫</span>
            <span>Songs</span>
          </button>

          <button className="sidebar-menu-item">
            <span className="menu-icon">▣</span>
            <span>Albums</span>
          </button>

          <button className="sidebar-menu-item">
            <span className="menu-icon">♟</span>
            <span>Artists</span>
          </button>

          <button className="sidebar-menu-item">
            <span className="menu-icon">☷</span>
            <span>Playlists</span>
          </button>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;