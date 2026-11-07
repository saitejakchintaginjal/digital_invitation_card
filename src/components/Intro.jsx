import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { GROOM, BRIDE } from "../config.js";
import ganapatiImg from "../assets/ganapati.jpg";

/*
  Entry card: the closed card starts tiny and floats in through the air like a sheet of paper, swaying and tumbling
  as it grows, and settles in the centre, filling the screen. A "Tap to open" seal then invites the visitor to tap.
  On the tap the card opens vertically, from two sides only: the top half lifts up and back and the bottom half
  drops down and back, so the Ganapati on the top half stays whole. The tap also starts the music.
  Once the card is about three-quarters open (FADE_AFTER_MS), the card slowly dissolves into the page.

  phase 0 floating / waiting for the tap / opening | 1 dissolving | 2 done
  (Visitors who prefer reduced motion skip the intro.)
*/
const FLY_MS = 6200;        // how long the card takes to float in and settle
const READY_MS = 6600;      // the card has landed: show "Tap to open"
const FADE_AFTER_MS = 2100; // after the doors start to open, how long until the dissolve begins (about 75% open)
const FADE_MS = 2600;       // how long the dissolve takes (CSS .intro transition must match)

/* ---------- smooth flight ----------
   Position, size and tilt are sampled from continuous curves (sines whose swing shrinks to zero), so the card
   drifts and sways with no jerks and lands softly. */
const smoother = (t) => t * t * t * (t * (6 * t - 15) + 10);
function flightFrames() {
  const vw = window.innerWidth / 100;
  const vh = window.innerHeight / 100;
  const N = 160;
  const frames = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const A = Math.pow(1 - t, 1.45);
    const q = smoother(Math.min(1, t * 1.02));
    const s = 0.07 + 0.93 * smoother(t);
    const w = Math.PI * 2;
    const x = (1 - q) * -34 * vw + A * 21 * vw * Math.sin(w * 1.45 * t);
    const y = (1 - q) * 42 * vh + A * 5.5 * vh * Math.sin(w * 2.1 * t + 0.8);
    const rz = A * 24 * Math.sin(w * 1.45 * t + 0.5);
    const ry = A * 56 * Math.sin(w * 1.45 * t - 0.35);
    const rx = A * 24 * Math.sin(w * 2.1 * t + 1.1);
    frames.push({
      offset: t,
      opacity: Math.min(1, t / 0.05),
      transform: `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${s.toFixed(4)}) perspective(1700px) rotateZ(${rz.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) rotateX(${rx.toFixed(2)}deg)`,
    });
  }
  return frames;
}

// The card's front, laid across both halves (top and bottom). Ganapati and the printed wording live in the top half.
function Cover({ side }) {
  return (
    <div className={`cover cover--${side}`}>
      {side === "t" && (
        <div className="intro__stack">
          <img className="intro__ganapati" src={ganapatiImg} alt="" />
          <p className="intro__kicker">Wedding Invitation</p>
          <p className="intro__names">{GROOM.name} Weds {BRIDE.name}</p>
        </div>
      )}
    </div>
  );
}

export default function Intro() {
  const [phase, setPhase] = useState(() => (window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 2 : 0));
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const stageRef = useRef(null);
  const animRef = useRef(null);
  const startedRef = useRef(false);
  const timers = useRef([]);
  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));
  const root = () => document.documentElement;

  // start the flight before the first paint, so the card never flashes at full size
  useLayoutEffect(() => {
    const el = stageRef.current;
    if (phase === 2 || !el) return undefined;
    if (!el.animate) { el.style.opacity = "1"; return undefined; } // very old browsers: skip the flight
    const anim = el.animate(flightFrames(), { duration: FLY_MS, easing: "linear", fill: "both" });
    animRef.current = anim;
    return () => anim.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phase === 2) { root().classList.remove("intro-active", "intro-hold"); return undefined; }
    root().classList.add("intro-active", "intro-hold");
    window.scrollTo(0, 0);
    later(() => setReady(true), READY_MS);
    return () => { timers.current.forEach(clearTimeout); root().classList.remove("intro-active", "intro-hold"); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // the visitor taps: open the card (and start the music)
  const start = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    if (animRef.current) animRef.current.finish(); // tapped before it landed: land it now
    setReady(true);
    setOpen(true);
    window.dispatchEvent(new Event("wedding:music"));
    later(() => {
      root().classList.remove("intro-hold"); // the page's own entrance animations begin as the dissolve starts
      setPhase(1);
    }, FADE_AFTER_MS);
    later(() => { setPhase(2); root().classList.remove("intro-active"); }, FADE_AFTER_MS + FADE_MS);
  };

  if (phase === 2) return null;

  return (
    <div className={`intro is-${phase}${open ? " is-open" : ""}${ready ? " is-ready" : ""}`} role="dialog" aria-modal="true" aria-label={`Wedding invitation of ${GROOM.name} and ${BRIDE.name}`} onClick={start}>
      <div className="intro__stage" ref={stageRef}>
        <div className="idoors">
          <div className="idoor idoor--t">
            <div className="idoor__front"><Cover side="t" /></div>
            <div className="idoor__back" />
          </div>
          <div className="idoor idoor--b">
            <div className="idoor__front"><Cover side="b" /></div>
            <div className="idoor__back" />
          </div>
        </div>

        {/* the invitation to tap */}
        <button type="button" className="itap" onClick={start} aria-label="Tap to open the invitation">
          <span className="itap__seal" aria-hidden="true"><i />
            <svg viewBox="0 0 40 40"><path d="M20 33 C9 24 7 17 11.5 13.2 C15 10.3 18.7 12 20 15 C21.3 12 25 10.3 28.5 13.2 C33 17 31 24 20 33Z" /></svg>
          </span>
          <span className="itap__text"><i /><b>Tap to open</b><i /></span>
        </button>
      </div>
    </div>
  );
}
