import { useState, useEffect } from "react";
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

function App() {
  const [loaded, setLoaded] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <>
      <LoadingOverlay onDone={() => setLoaded(true)} />
      <div
        className="text-zinc-900 bg-white dark:text-white dark:bg-zinc-950"
        style={{
          opacity:    loaded ? 1 : 0,
          transition: "opacity 650ms ease-in",
        }}
      >
        <Navbar isDark={isDark} toggleTheme={toggleTheme} />
        <Hero loaded={loaded} />
        <About />
        <HowWeWork />
        <Skill />
        <Work />
        <Pricing />
        <Contact />
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}

export default App;