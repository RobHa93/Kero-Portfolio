import { useCallback, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import HowWeWork from "./components/HowWeWork.jsx";
import Skill from "./components/Skill.jsx";
import Work from "./pages/Work.jsx";
import Pricing from "./pages/Pricing.jsx";
import Contact from "./pages/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import LoadingOverlay from "./components/LoadingOverlay.jsx";
import { useTheme } from "./hooks/useTheme.js";

function App() {
  const [loaded, setLoaded] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const handleLoaderDone = useCallback(() => setLoaded(true), []);

  return (
    <>
      <LoadingOverlay onDone={handleLoaderDone} />
      <div
        className="text-zinc-900 bg-white dark:text-white dark:bg-zinc-950"
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 650ms ease-in",
        }}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:px-4 focus:py-2 focus:rounded-full focus:bg-sky-400 focus:text-zinc-950 focus:font-semibold"
        >
          Zum Inhalt springen
        </a>
        <Navbar isDark={isDark} toggleTheme={toggleTheme} />
        <main id="main">
          <Hero loaded={loaded} />
          <About />
          <HowWeWork />
          <Skill />
          <Work />
          <Pricing />
          <Contact />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}

export default App;
