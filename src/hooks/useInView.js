import { useEffect, useRef, useState } from "react";

// Meldet einmalig, sobald das Element ins Sichtfeld scrollt (z. B. für Einblend-Animationen).
export function useInView({ threshold = 0.2 } = {}) {
  const ref = useRef(null);
  // Ohne IntersectionObserver (sehr alte Browser) direkt sichtbar anzeigen.
  const [inView, setInView] = useState(() => typeof IntersectionObserver === "undefined");

  useEffect(() => {
    const element = ref.current;
    if (!element || inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, inView]);

  return [ref, inView];
}
