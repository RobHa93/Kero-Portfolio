import React, { useState } from "react";

const navItems = [
  { label: "Home", link: "#home" },
  { label: "Work", link: "#work" },
  { label: "Kontakt", link: "#reviews" },
  { label: "Contact", link: "#contact", mobileOnly: true },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-zinc-900 text-white fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Brand */}
          <div className="text-2xl font-bold">Kevin</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {navItems
              .filter((item) => !item.mobileOnly)
              .map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  className="hover:text-gray-300 transition-colors"
                >
                  {item.label}
                </a>
              ))}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="focus:outline-none"
            >
              {menuOpen ? (
                <span className="text-2xl">&#10005;</span> // X
              ) : (
                <span className="text-2xl">&#9776;</span> // Hamburger
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-zinc-800 px-4 py-2 space-y-2">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              className="block hover:text-gray-300 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

// Export nicht vergessen!
export default Navbar;