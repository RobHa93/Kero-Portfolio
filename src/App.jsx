import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skill from "./components/Skill.jsx";
import Work from "./pages/Work.jsx";
import Contact from "./pages/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

function App() {
  return (
    <div className="bg-zinc-950 text-white">
      <Navbar />
      <Hero />
      <About />
      <Skill />
      <Work />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;