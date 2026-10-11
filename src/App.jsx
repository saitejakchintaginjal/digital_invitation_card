import Defs from "./components/Defs.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Names from "./components/Names.jsx";
import Timeline from "./components/Timeline.jsx";
import About from "./components/About.jsx";
import Gallery from "./components/Gallery.jsx";
import Know from "./components/Know.jsx";
import Countdown from "./components/Countdown.jsx";
import Footer from "./components/Footer.jsx";
import useReveal from "./hooks/useReveal.js";
import useScrollFx from "./hooks/useScrollFx.js";

export default function App() {
  useReveal();
  useScrollFx();
  return (
    <>
      <Defs />
      <div className="progress" aria-hidden="true" />
      <Nav />
      <Hero />
      <Names />
      <Timeline />
      <About />
      <Gallery />
      <Know />
      <Countdown />
      <Footer />
    </>
  );
}
