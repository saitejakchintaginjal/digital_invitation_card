import { GROOM, BRIDE } from "../config.js";
import heroImg from "../assets/hero.png";

const DROPS = [
  [60, 40, 150], [120, 62, 250], [180, 78, 170], [240, 86, 300],
  [300, 86, 190], [360, 78, 250], [420, 62, 160], [480, 36, 220],
];

function Garland({ side }) {
  return (
    <svg className={`garland garland--${side}`} viewBox="0 0 520 380" aria-hidden="true">
      <g className="g-main">
        <path d="M-10 18 Q240 110 520 12" className="g-string" />
        <path d="M-10 18 Q240 110 520 12" className="g-flower g-flower--o" />
        <path d="M-10 24 Q240 116 520 18" className="g-flower g-flower--p" />
      </g>
      <g className="g-drops">
        {DROPS.map(([x, y, end], i) => (
          <path key={x} d={`M${x} ${y} V${end}`} style={{ "--i": i }} />
        ))}
      </g>
    </svg>
  );
}

export default function Hero() {
  return (
    <header className="hero" id="hero">
      <div className="hero__text">
        <p className="eyebrow">॥ Shree Ganeshaya Namah ॥</p>
        <h1>{GROOM.name} <span>&amp;</span> {BRIDE.name}</h1>
        <p className="hero__sub">Together with their families, invite you to celebrate their wedding</p>
      </div>
      <img
        className="hero__photo"
        src={heroImg}
        alt="Bride and groom walking down a candlelit red carpet toward a flower-decked mandap at night"
      />
      <Garland side="l" />
      <Garland side="r" />
    </header>
  );
}
