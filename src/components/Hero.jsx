import { useMemo } from "react";
import { GROOM, BRIDE } from "../config.js";
import heroImg from "../assets/hero.jpg";
import Garland from "./Garland.jsx";
import Heart from "./Heart.jsx";

// Flower shapes (#fl-m marigold, #fl-r rose, #fl-j jasmine) come from the shared <Defs />; "petal" is a loose rose petal.
const MARIGOLD = ["#f08a1c", "#f5a623", "#f9c22e", "#ff9d2e"];
const ROSE = ["#d6214a", "#e5557f", "#c4163d"];
const KINDS = ["m", "m", "r", "j", "p", "m", "j", "p", "r", "m"];
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Showering marigolds, roses, jasmine and loose petals, plus twinkling lights.
function Confetti() {
  const { flowers, lights } = useMemo(() => {
    const r = (x, y) => x + Math.random() * (y - x);
    return {
      flowers: Array.from({ length: 34 }, (_, i) => {
        const kind = KINDS[i % KINDS.length];
        const color = kind === "m" ? pick(MARIGOLD) : kind === "j" ? "#fffdf5" : pick(ROSE);
        return {
          kind, color,
          left: r(-2, 100), size: kind === "p" ? r(13, 22) : r(20, 36), dur: r(6.5, 11), delay: -r(0, 11), dx: r(-90, 90), spin: r(-420, 420), tumble: r(1.6, 3.2),
        };
      }),
      lights: Array.from({ length: 16 }, () => ({ left: r(2, 98), top: r(2, 45), size: r(3, 7), dur: r(1.6, 3.4), delay: -r(0, 3) })),
    };
  }, []);

  return (
    <>
      {lights.map((l, i) => (
        <span key={`l${i}`} className="fx-light" style={{ left: `${l.left}%`, top: `${l.top}%`, width: l.size, height: l.size, animationDuration: `${l.dur}s`, animationDelay: `${l.delay}s` }} />
      ))}
      {flowers.map((f, i) => (
        <span
          key={`f${i}`}
          className="fx-flower"
          style={{ left: `${f.left}%`, width: f.size, animationDuration: `${f.dur}s`, animationDelay: `${f.delay}s`, "--dx": `${f.dx}px`, "--spin": `${f.spin}deg` }}
        >
          <svg className="fx-flower__svg" viewBox="-12 -12 24 24" style={{ color: f.color, animationDuration: `${f.tumble}s` }}>
            {f.kind === "p" ? <path d="M0 9 C-7 5 -8 -5 0 -11 C8 -5 7 5 0 9Z" fill="currentColor" stroke="rgba(70,0,15,.35)" strokeWidth=".6" /> : <use href={`#fl-${f.kind}`} />}
          </svg>
        </span>
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
          <p>॥&nbsp;Shree Laxmi Venkateshwara Swamy Prasanna&nbsp;॥</p>
          <p>॥&nbsp;Shree Laxminarasimha Prasanna&nbsp;॥</p>
          <p>॥&nbsp;Shree Nuggikeri Balabhima Prasanna&nbsp;॥</p>
          <p>॥&nbsp;Shree Yallammadevi Prasanna&nbsp;॥</p>
          <p className="invocation__bless">With Parama Blessings of</p>
          <p className="invocation__guru">Parama Poojya Shree Shree 1008 Shree Satyatma Teertha Shreepadangalavaru</p>
        </div>
        <h1>{GROOM.name} <Heart /> {BRIDE.name}</h1>
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
