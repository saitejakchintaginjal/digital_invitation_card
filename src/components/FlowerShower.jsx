import { useMemo } from "react";
import { BLOSSOM_IDS } from "./Blossoms.jsx";

// A gentle shower of real-looking flowers falling over the whole page (fixed layer, never blocks taps).
// Each flower drifts down and sideways, spins, and flips edge-on and face-on as it tumbles.
const COUNT = 20;
const rand = (a, b) => a + Math.random() * (b - a);

export default function FlowerShower() {
  const items = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => {
        const id = BLOSSOM_IDS[i % BLOSSOM_IDS.length];
        const petal = id.includes("petal");
        return {
          id,
          left: rand(-3, 100),
          size: petal ? rand(16, 24) : rand(24, 40),
          dur: rand(11, 19),
          delay: -rand(0, 19),
          dx: rand(-130, 130),
          spin: rand(-380, 380),
          tumble: rand(2.2, 4.4),
        };
      }),
    []
  );

  return (
    <div className="shower" aria-hidden="true">
      {items.map((f, i) => (
        <span key={i} className="sf" style={{ left: `${f.left}%`, width: f.size, height: f.size, animationDuration: `${f.dur}s`, animationDelay: `${f.delay}s`, "--dx": `${f.dx}px`, "--spin": `${f.spin}deg` }}>
          <svg className="sf__svg" viewBox="-16 -16 32 32" style={{ animationDuration: `${f.tumble}s` }}>
            <use href={`#${f.id}`} />
          </svg>
        </span>
      ))}
    </div>
  );
}
