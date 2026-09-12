export function LogoNoteIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 17V4.5L20 3v11.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="6.5" cy="17.5" r="2.5" fill="currentColor" />
      <circle cx="17.5" cy="14.5" r="2.5" fill="currentColor" />
    </svg>
  );
}

export function SearchIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="2" />
      <line x1="15.3" y1="15.3" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function HamburgerIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="5.5" width="18" height="2.2" rx="1.1" fill="currentColor" />
      <rect x="3" y="11" width="12" height="2.2" rx="1.1" fill="currentColor" />
      <rect x="3" y="16.5" width="15" height="2.2" rx="1.1" fill="currentColor" />
    </svg>
  );
}

export function SortArrowIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 5v14M12 5l-5 5M12 5l5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ShuffleIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polyline points="16 3 21 3 21 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="4" y1="20" x2="21" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <polyline points="21 16 21 21 16 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="15" y1="15" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="4" y1="4" x2="9" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}