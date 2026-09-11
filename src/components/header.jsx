import "./header.css";

function Header({ onMenuClick, onSearchClick }) {
  return (
    <header className="header">
      <button
        className="icon-button hamburger-button"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className="logo">
        SONATA <span>♪</span>
      </div>

      <button
        className="icon-button search-button"
        onClick={onSearchClick}
        aria-label="Search"
      >
        <span className="search-icon"></span>
      </button>
    </header>
  );
}

export default Header;