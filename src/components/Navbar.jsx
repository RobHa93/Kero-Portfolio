import { useState, useEffect } from "react";

const navItems = [
  { label: "Über uns", href: "#about" },
  { label: "Projekte", href: "#work" },
  { label: "Kontakt", href: "#contact" },
];

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

const Navbar = ({ isDark, toggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
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

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 transition-colors rounded-full text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/5"
              aria-label={isDark ? "Zum hellen Modus wechseln" : "Zum dunklen Modus wechseln"}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>

            <a
              href="#contact"
              className="px-4 py-2 text-sm font-semibold transition-colors duration-200 rounded-full bg-sky-400 text-zinc-950 hover:bg-emerald-300"
            >
              Anfrage senden
            </a>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 transition-colors rounded-full text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              aria-label={isDark ? "Zum hellen Modus wechseln" : "Zum dunklen Modus wechseln"}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
            <button
              className="p-2 transition-colors text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="px-4 py-4 space-y-1 border-t md:hidden bg-white/95 backdrop-blur-md border-zinc-200 dark:bg-zinc-950/95 dark:border-white/5">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors py-2.5 text-sm"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#contact"
              className="block text-center bg-sky-400 text-zinc-950 font-semibold px-4 py-2.5 rounded-full hover:bg-emerald-300 transition-colors text-sm"
              onClick={() => setMenuOpen(false)}
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