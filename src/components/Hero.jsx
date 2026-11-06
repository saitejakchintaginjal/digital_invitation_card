import { useMemo } from "react";
import { GROOM, BRIDE } from "../config.js";
import heroImg from "../assets/hero.jpg";
import Fireworks from "./Fireworks.jsx";
import Heart from "./Heart.jsx";

// Twinkling lights over the picture (the flowers fall over the whole page: see <FlowerShower />).
function Confetti() {
  const lights = useMemo(() => {
    const r = (x, y) => x + Math.random() * (y - x);
    return Array.from({ length: 16 }, () => ({ left: r(2, 98), top: r(2, 45), size: r(3, 7), dur: r(1.6, 3.4), delay: -r(0, 3) }));
  }, []);
  return (
    <>
      {lights.map((l, i) => (
        <span key={i} className="fx-light" style={{ left: `${l.left}%`, top: `${l.top}%`, width: l.size, height: l.size, animationDuration: `${l.dur}s`, animationDelay: `${l.delay}s` }} />
      ))}
    </>
  );
}

export default function Hero() {
  return (
    <header className="hero" id="hero">
      {/* sky with washes of colour behind the invocation */}
      <div className="hero__sky" aria-hidden="true">
        <span className="splash splash--pink" /><span className="splash splash--orange" /><span className="splash splash--gold" /><span className="splash splash--violet" /><span className="splash splash--rose" /><span className="splash splash--teal" />
      </div>

      <Fireworks day horizon={0.58} />
      <div className="hero__text">
        <div className="invocation">
          <p className="invocation__shree"><span lang="sa">श्री</span></p>
          <p>॥&nbsp;Shree Laxminarasimha Prasanna&nbsp;॥</p>
          <p>॥&nbsp;Shree Nuggikeri Balabhima Prasanna&nbsp;॥</p>
          <p>॥&nbsp;Shree Yallammadevi Prasanna&nbsp;॥</p>
          <p className="invocation__bless">With the Divine Blessings of</p>
          <p className="invocation__guru">Parama Poojya Shree Shree 1008 Shree Satyatma Teertha Shreepadangalavaru</p>
        </div>
        <h1>{GROOM.name} <Heart /> {BRIDE.name}</h1>
        <p className="hero__elders">With the Blessings of Our Elders</p>
        <p className="hero__parents">
          Son of <strong>{GROOM.parents}</strong> and Daughter of <strong>{BRIDE.parents}</strong>
        </p>
      </div>

      <div className="hero__stage" role="img" aria-label="The bride's maroon silk saree and the groom's white and gold dhoti, knotted together with flowers before the sacred fire">
        <div className="hero__zoom">
          <img className="hero__layer" src={heroImg} alt="" />
          {/* the same picture, clipped to each half so the saree and dhoti can sway independently */}
          <img className="hero__layer hero__layer--bride" src={heroImg} alt="" aria-hidden="true" />
          <img className="hero__layer hero__layer--groom" src={heroImg} alt="" aria-hidden="true" />
          <span className="fx-fire fx-fire--a" />
          <span className="fx-fire fx-fire--b" />
          <span className="fx-knot" />
          <Confetti />
        </div>
      </div>

    </header>
  );
}
