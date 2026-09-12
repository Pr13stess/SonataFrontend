import "./header.css";

function Header({
  onMenuClick,
  onSearchClick,
  isSearchOpen = false,
  searchQuery = "",
  onSearchChange,
  onOpenSearch,
  onCloseSearch,
}) {
  const handleOpenSearch = onOpenSearch || onSearchClick;

  return (
    <header className={`header ${isSearchOpen ? "header--searching" : ""}`}>
      {isSearchOpen ? (
        <div className="header-search">
          <div className="header-search__box">
            <span className="search-icon header-search__icon"></span>
            <input
              type="text"
              className="header-search__input"
              placeholder="Search songs, artists, albums..."
              value={searchQuery}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              autoFocus
            />
            {searchQuery && (
              <button
                type="button"
                className="header-search__clear"
                onClick={() => onSearchChange && onSearchChange("")}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          <button
            type="button"
            className="header-search__cancel"
            onClick={onCloseSearch}
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
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
            onClick={handleOpenSearch}
            aria-label="Search"
          >
            <span className="search-icon"></span>
          </button>
        </>
      )}
    </header>
  );
}

export default Header;