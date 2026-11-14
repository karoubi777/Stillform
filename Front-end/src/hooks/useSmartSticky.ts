// src/hooks/useSmartSticky.ts
import { useState, useEffect } from "react";

export function useSmartSticky(threshold = 10) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;

      // Always show at the very top of the page
      if (currentScrollY < 50) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      // If user scrolled down more than the threshold -> Hide header
      if (currentScrollY > lastScrollY + threshold) {
        setIsVisible(false);
      }
      // If user scrolled up more than the threshold -> Show header
      else if (currentScrollY < lastScrollY - threshold) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, threshold]);

  return isVisible;
}
