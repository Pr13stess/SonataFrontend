import "./header.css";
import hamburgerIcon from "../assets/hamburger.svg";
import searchIcon from "../assets/search.svg";
import logoIcon from "../assets/logo.svg";

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
            <img src={searchIcon} className="search-icon header-search__icon" alt="" />
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
            <img src={hamburgerIcon} className="hamburger-icon" alt="" />
          </button>

          <div className="logo">
            <img src={logoIcon} className="logo-icon" alt="Sonata" />
          </div>

          <button
            className="icon-button search-button"
            onClick={handleOpenSearch}
            aria-label="Search"
          >
            <img src={searchIcon} className="search-icon" alt="" />
          </button>
        </>
      )}
    </header>
  );
}

export default Header;