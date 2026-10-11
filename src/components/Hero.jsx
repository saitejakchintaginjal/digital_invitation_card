import { useMemo } from "react";
import { GROOM, BRIDE } from "../config.js";
import heroImg from "../assets/hero.jpg";
import Garland from "./Garland.jsx";

const PETAL_KINDS = ["marigold", "marigold", "rose", "rice", "rice", "jasmine"];

// Falling marigold petals, rose petals and rice, plus twinkling lights.
function Confetti() {
  const { petals, lights } = useMemo(() => {
    const r = (a, b) => a + Math.random() * (b - a);
    return {
      petals: Array.from({ length: 26 }, (_, i) => ({
        kind: PETAL_KINDS[i % PETAL_KINDS.length],
        left: r(0, 100), size: r(7, 15), dur: r(7, 13), delay: -r(0, 13), dx: r(-70, 70), spin: r(-540, 540),
      })),
      lights: Array.from({ length: 16 }, () => ({ left: r(2, 98), top: r(2, 45), size: r(3, 7), dur: r(1.6, 3.4), delay: -r(0, 3) })),
    };
  }, []);

  return (
    <>
      {lights.map((l, i) => (
        <span key={`l${i}`} className="fx-light" style={{ left: `${l.left}%`, top: `${l.top}%`, width: l.size, height: l.size, animationDuration: `${l.dur}s`, animationDelay: `${l.delay}s` }} />
      ))}
      {petals.map((p, i) => (
        <span
          key={`p${i}`}
          className={`fx-petal fx-petal--${p.kind}`}
          style={{ left: `${p.left}%`, width: p.size, height: p.kind === "rice" ? p.size * 0.45 : p.size, animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s`, "--dx": `${p.dx}px`, "--spin": `${p.spin}deg` }}
        />
      ))}
    </>
  );
}

export default function Hero() {
  return (
    <header className="hero" id="hero">
      <div className="hero__text">
        <div className="invocation">
          <p className="invocation__shree"><span lang="sa">श्री</span></p>
          <p>॥ Shree Laxminarasimha Prasanna ॥</p>
          <p>॥ Shree Nuggikeri Balabhima Prasanna ॥</p>
          <p>॥ Shree Yallammadevi Prasanna ॥</p>
          <p className="invocation__bless">With Parama Blessings of</p>
          <p className="invocation__guru">Parama Poojya Shree Shree 1008 Shree Satyatma Teertha Shreepadangalavaru</p>
        </div>
        <h1>{GROOM.name} <span>&amp;</span> {BRIDE.name}</h1>
        <p className="hero__sub">Together with their families, invite you to celebrate their wedding</p>
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

      <Garland side="l" />
      <Garland side="r" />
    </header>
  );
}
