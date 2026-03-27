import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skill from "./components/Skill.jsx";
import Work from "./pages/Work.jsx";
import Contact from "./pages/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import LoadingOverlay from "./components/LoadingOverlay.jsx";

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <LoadingOverlay onDone={() => setLoaded(true)} />
      <div
        className="text-white bg-zinc-950"
        style={{
          opacity:    loaded ? 1 : 0,
          transition: "opacity 650ms ease-in",
        }}
      >
        <Navbar />
        <Hero />
        <About />
        <Skill />
        <Work />
        <Contact />
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}

export default App;