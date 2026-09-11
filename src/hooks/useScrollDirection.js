import { useEffect, useRef, useState } from "react";

export function useScrollDirection(threshold = 50) {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY;

      if (currentY > lastScrollY.current && currentY > threshold) {
        setHidden(true); // scroll ke bawah
      } else {
        setHidden(false); // scroll ke atas
      }

      lastScrollY.current = currentY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return hidden;
}
