import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skill from "./components/Skill.jsx";
import ScrollToTop from './components/ScrollToTop';



/*  import Home from "./pages/Home";*/
import Work from "./pages/Work.jsx";
/* import Reviews from "./pages/Reviews";*/
import Contact from "./pages/Contact.jsx";


function App() {
  return (
    <div className="bg-zinc-900 text-white">
      {/* Navbar oben */}
      <Navbar />
      <Hero />
      <About />
      <Skill />
     

      {/* Sections */}
      <section id="home" >
       {/* <Home />*/}
      
      </section>

      <section id="work">
        <Work />
      </section>

      <section id="reviews">
      {/* <Reviews />*/}
      </section>

      <section id="contact">
        <Contact />
      </section>
      <ScrollToTop />
    </div>
  );
}

export default App;