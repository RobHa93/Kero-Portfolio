import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle.jsx";

const navItems = [
  { label: "Über uns", href: "#about" },
  { label: "Projekte", href: "#work" },
  { label: "Preise", href: "#pricing" },
  { label: "Kontakt", href: "#contact" },
];

const Navbar = ({ isDark, toggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (event) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-white/90 backdrop-blur-md border-b border-zinc-200 dark:bg-zinc-950/90 dark:border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-0.5 text-zinc-900 dark:text-white font-bold text-xl tracking-tight select-none"
            aria-label="KeRo WebDev – zum Seitenanfang"
          >
            KeRo<span className="text-sky-400">.</span>
          </a>

          {/* Desktop nav */}
          <div className="items-center hidden gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm transition-colors duration-200 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              >
                {item.label}
              </a>
            ))}

            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

            <a
              href="#contact"
              className="px-4 py-2 text-sm font-semibold transition-colors duration-200 rounded-full bg-sky-400 text-zinc-950 hover:bg-emerald-300"
            >
              Anfrage senden
            </a>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
            <button
              type="button"
              className="flex items-center justify-center transition-colors w-11 h-11 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Menü schliessen" : "Menü öffnen"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="px-4 py-4 space-y-1 border-t md:hidden bg-white/95 backdrop-blur-md border-zinc-200 dark:bg-zinc-950/95 dark:border-white/5"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block py-3 text-base transition-colors text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#contact"
              className="block px-4 py-3 text-sm font-semibold text-center transition-colors rounded-full bg-sky-400 text-zinc-950 hover:bg-emerald-300"
              onClick={closeMenu}
            >
              Anfrage senden
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
