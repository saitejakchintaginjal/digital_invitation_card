import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { GROOM, BRIDE } from "../config.js";
import cardImg from "../assets/intro-card.jpg";

/*
  Opening animation (fully automatic):
    the closed card (your artwork) starts tiny, drifts in through the air like a sheet of paper, and settles to fill the screen
    ->  the pearl glows  ->  the V-shaped flap flips all the way over toward the viewer (about 180 degrees), growing as it comes
        forward and lying back over the top of the card, its underside a pale gold lining
    ->  the open envelope shows dark side flaps and a notch at the bottom, with golden-white light pouring out of it
    ->  the view pushes in as the light grows, whites out, and fades into the page.

  phase 0 flying / resting | 1 pearl glows | 2 flap flipping open | 3 pushing into the light | 4 done
*/
const FLY_MS = 6400;                 // flight time
const T_PULSE = FLY_MS + 600;        // a short rest on the full card, then the pearl glows
const T_OPEN = T_PULSE + 1000;       // the flap starts to flip
const FLAP_MS = 2800;                // flip duration
const T_DIVE = T_OPEN + FLAP_MS - 600; // the push-in starts before the flip has quite finished, so the move is continuous
const DIVE_MS = 2400;                // push in, white-out, fade to the page

/* ---------- smooth flight ----------
   Instead of hopping between a few waypoints, the motion is sampled from continuous curves
   (sines whose swing shrinks to zero), so position, size and tilt change with no corners in them. */
const smoother = (t) => t * t * t * (t * (6 * t - 15) + 10); // 0..1, zero speed at both ends
function flightFrames() {
  const vw = window.innerWidth / 100;
  const vh = window.innerHeight / 100;
  const N = 160;
  const path = [];
  const tilt = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const A = Math.pow(1 - t, 1.45);                 // swing amplitude, fades to 0 so it lands softly
    const q = smoother(Math.min(1, t * 1.02));       // how far along the way to the middle
    const s = 0.07 + 0.93 * smoother(t);             // starts tiny, grows slowly, eases in at the end
    const w = Math.PI * 2;
    const x = (1 - q) * -34 * vw + A * 21 * vw * Math.sin(w * 1.45 * t);
    const y = (1 - q) * 42 * vh + A * 5.5 * vh * Math.sin(w * 2.1 * t + 0.8);
    const opacity = Math.min(1, t / 0.05);
    path.push({ offset: t, opacity, transform: `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${s.toFixed(4)})` });
    const rz = A * 24 * Math.sin(w * 1.45 * t + 0.5);
    const ry = A * 56 * Math.sin(w * 1.45 * t - 0.35);
    const rx = A * 24 * Math.sin(w * 2.1 * t + 1.1);
    tilt.push({ offset: t, transform: `perspective(1700px) rotateZ(${rz.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) rotateX(${rx.toFixed(2)}deg)` });
  }
  return { path, tilt };
}

/* ---------- the flap flip ----------
   The flap turns on its (slightly tilted) top edge by 180 degrees. The two faces are swapped exactly at the halfway
   point, rather than relying on the browser's backface hiding, so the artwork can never show mirrored. */
function flipFrames() {
  const N = 120;
  const flip = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const a = 180 * smoother(t) + 5 * Math.sin(Math.PI * Math.min(1, t * 4)) * (t < 0.25 ? 1 : 0); // a tiny lift-off before it commits
    flip.push({ offset: t, transform: `rotate3d(1, 0, 0, ${a.toFixed(2)}deg)` });
  }
  return flip;
}
const faceSwap = (visibleFirst) => [
  { offset: 0, opacity: visibleFirst ? 1 : 0 },
  { offset: 0.4999, opacity: visibleFirst ? 1 : 0 },
  { offset: 0.5, opacity: visibleFirst ? 0 : 1 },
  { offset: 1, opacity: visibleFirst ? 0 : 1 },
];

const DUST = Array.from({ length: 16 }, (_, i) => ({
  left: (i * 53 + 11) % 100, size: 2 + (i % 4), dur: 8 + (i % 5) * 1.8, delay: -((i * 1.3) % 9), x: ((i % 7) - 3) * 14,
}));

export default function Intro() {
  const [phase, setPhase] = useState(0);
  const timers = useRef([]);
  const pathRef = useRef(null);
  const tiltRef = useRef(null);
  const floatRef = useRef(null);
  const flapRef = useRef(null);
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));
  const root = () => document.documentElement;

  // start the flight before the first paint, so the card never flashes in its final place
  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !pathRef.current?.animate) return undefined;
    const { path, tilt } = flightFrames();
    const opts = { duration: FLY_MS, easing: "linear", fill: "both" };
    const a = pathRef.current.animate(path, opts);
    const b = tiltRef.current.animate(tilt, opts);
    return () => { a.cancel(); b.cancel(); };
  }, []);

  useEffect(() => {
    root().classList.add("intro-active", "intro-hold");
    window.scrollTo(0, 0);
    later(() => setPhase(1), T_PULSE);
    later(() => setPhase(2), T_OPEN);
    later(() => { setPhase(3); root().classList.remove("intro-hold"); }, T_DIVE); // page entrance animations begin as we dive in
    later(() => setPhase(4), T_DIVE + DIVE_MS);
    return () => { timers.current.forEach(clearTimeout); root().classList.remove("intro-active", "intro-hold"); };
  }, []);
  // phase 2: flip the flap while the view drifts in; phase 3: push on into the light
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !floatRef.current?.animate) return undefined;
    const made = [];
    if (phase === 2) {
      const o = { duration: FLAP_MS, easing: "linear", fill: "forwards" };
      made.push(flapRef.current.animate(flipFrames(), o));
      made.push(frontRef.current.animate(faceSwap(true), o));
      made.push(backRef.current.animate(faceSwap(false), o));
      made.push(floatRef.current.animate([{ transform: "scale(1)" }, { transform: "scale(1.5)" }], { duration: FLAP_MS, easing: "cubic-bezier(.45, 0, .55, 1)", fill: "forwards" }));
    } else if (phase === 3) {
      made.push(floatRef.current.animate([{ transform: "scale(1.5)" }, { transform: "scale(5.2)" }], { duration: DIVE_MS, easing: "cubic-bezier(.55, 0, .9, .6)", fill: "forwards" }));
    }
    return () => {}; // animations are left to finish (fill: forwards); they go away with the element
  }, [phase]);

  useEffect(() => { if (phase === 4) root().classList.remove("intro-active", "intro-hold"); }, [phase]);


  if (phase === 4) return null;

  return (
    <div className={`intro is-${phase}`} style={{ "--card-img": `url(${cardImg})` }} role="dialog" aria-modal="true" aria-label={`Wedding invitation of ${GROOM.name} and ${BRIDE.name}`}>
      <div className="intro__dust" aria-hidden="true">
        {DUST.map((d, i) => (
          <span key={i} style={{ left: `${d.left}%`, width: d.size, height: d.size, animationDuration: `${d.dur}s`, animationDelay: `${d.delay}s`, "--x": `${d.x}px` }} />
        ))}
      </div>

      {/* path (drift + grow) > tilt (3D paper flutter) > float (holds the card layers, own perspective) */}
      <div className="icard" ref={pathRef}>
        <div className="icard__flutter" ref={tiltRef}>
          <div className="icard__float" ref={floatRef}>
            {/* the card body: your artwork, plus the dark pocket that is uncovered when the flap lifts */}
            <div className="ifx ibody">
              <span className="ibody__img" />
              <span className="ipocket"><i className="ipocket__light" /><i className="ipocket__flapL" /><i className="ipocket__flapR" /><i className="ipocket__notch" /></span>
            </div>
            {/* the flap: the V-shaped piece cut from the artwork. Front = the artwork, back = its patterned lining */}
            <div className="ifx iflap" ref={flapRef}>
              <span className="iflap__front" ref={frontRef} />
              <span className="iflap__back" ref={backRef} />
            </div>
            <span className="icard__ring" aria-hidden="true" />
          </div>
        </div>
      </div>

      <span className="iwhite" aria-hidden="true" />
    </div>
  );
}
