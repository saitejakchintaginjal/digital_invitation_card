import Defs from "./components/Defs.jsx";
import Intro from "./components/Intro.jsx";
import AutoScroll from "./components/AutoScroll.jsx";
import Music from "./components/Music.jsx";
import FlowerShower from "./components/FlowerShower.jsx";
import Hero from "./components/Hero.jsx";
import Names from "./components/Names.jsx";
import Timeline from "./components/Timeline.jsx";
import About from "./components/About.jsx";
import Gallery from "./components/Gallery.jsx";
import Know from "./components/Know.jsx";
import Countdown from "./components/Countdown.jsx";

import useReveal from "./hooks/useReveal.js";
import useScrollFx from "./hooks/useScrollFx.js";
import useOffscreenPause from "./hooks/useOffscreenPause.js";

export default function App() {
  useReveal();
  useScrollFx();
  useOffscreenPause();
  return (
    <>
      <Defs />
      <Intro />
      <div className="progress" aria-hidden="true" />
      <AutoScroll />
      <Music />
      <FlowerShower />
      <Hero />
      <Names />
      <Timeline />
      <About />
      <Gallery />
      <Know />
      <Countdown />

    </>
  );
}
