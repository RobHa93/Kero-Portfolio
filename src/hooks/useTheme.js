import { useEffect, useState } from "react";
import { safeStorage } from "../utils/storage.js";

export const THEME_KEY = "theme";

// Die Startklasse setzt das Inline-Script in index.html (verhindert Weissblitz).
export function useTheme() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    safeStorage.set(localStorage, THEME_KEY, isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return { isDark, toggleTheme };
}
