import { useState, useEffect } from "react";

const navItems = [
  { label: "Projekte", href: "#work" },
  { label: "Über uns", href: "#about" },
  { label: "Kontakt", href: "#contact" },
];

const Navbar = () => {
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
          ? "bg-zinc-950/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-0.5 text-white font-bold text-xl tracking-tight select-none"
          >
            KeRo<span className="text-sky-400">.</span>
          </a>

          {/* Desktop nav */}
          <div className="items-center hidden gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm transition-colors duration-200 text-zinc-400 hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="px-4 py-2 text-sm font-semibold transition-colors duration-200 rounded-full bg-sky-400 text-zinc-950 hover:bg-emerald-300"
            >
              Anfrage senden
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="p-2 transition-colors md:hidden text-zinc-400 hover:text-white"
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

      {/* Mobile menu */}
      {menuOpen && (
        <div className="px-4 py-4 space-y-1 border-t md:hidden bg-zinc-950/95 backdrop-blur-md border-white/5">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block text-zinc-400 hover:text-white transition-colors py-2.5 text-sm"
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