/**
 * Root layout: single-page portfolio. All sections in order.
 */
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import MusicPlayer from "./components/MusicPlayer";

export default function App() {
  return (
    <div className="relative animated-gradient text-white">
      <CustomCursor />
      <Navbar />
      <MusicPlayer />

      <Home />

      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
