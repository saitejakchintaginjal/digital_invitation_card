import { useCallback, useEffect, useRef } from "react";

/*
  Auto-scroll through the page, one section at a time, with a slow, gentle glide (about three seconds a screen):
    wait 2.5s on the first page -> glide to the next stop -> wait -> ... until the end of the page.
  A section taller than the screen is stepped through in screen-sized pieces, with the same wait at each stop.

  If the visitor touches, scrolls or clicks, the auto-scroll stops at once and starts again from where they
  left off once they have been still for 1.5 seconds. There is no on-screen control.
*/
const FIRST_MS = 3500;   // wait on the first page once the entry card has gone, then start scrolling
const DWELL_MS = 4000;   // wait on every other section
const RESUME_MS = 2500; // after the visitor stops touching the screen, wait this long and carry on
const SLIDES = ".hero, .slide, .countdown, .footer";
const easeSine = (t) => -(Math.cos(Math.PI * t) - 1) / 2; // starts and ends gently, no abrupt speed-up

// Scroll positions to stop at: the top of each section, plus evenly spaced extra stops inside tall sections.
function computeStops() {
  const vh = document.documentElement.clientHeight || window.innerHeight;
  const max = Math.max(0, document.documentElement.scrollHeight - vh);
  const stops = [];
  document.querySelectorAll(SLIDES).forEach((el) => {
    const top = el.getBoundingClientRect().top + window.scrollY;
    const last = top + el.offsetHeight - vh; // position where the section's bottom meets the screen's bottom
    stops.push(Math.min(top, max));
    if (last > top + 0.12 * vh) {
      const n = Math.ceil((last - top) / (vh * 0.85));
      for (let i = 1; i <= n; i++) stops.push(Math.min(top + ((last - top) * i) / n, max));
    }
  });
  stops.push(max);
  return [...new Set(stops.map((s) => Math.round(s)))].sort((a, b) => a - b).filter((s, i, a) => i === 0 || s - a[i - 1] > 24);
}

export default function AutoScroll() {
  const wantRef = useRef(false);   // auto-scroll is switched on (the button, or the end of the page, switches it off)
  const busyRef = useRef(false);   // a glide is in progress
  const timer = useRef(0);
  const poll = useRef(0);
  const raf = useRef(0);
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const schedule = useCallback((ms, fn) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(fn, ms);
  }, []);

  // stop a glide in progress, right where the page is now
  const haltGlide = useCallback(() => {
    clearInterval(poll.current);
    cancelAnimationFrame(raf.current);
    busyRef.current = false;
  }, []);

  // glide: position is a pure function of elapsed time (one smooth curve), written once per frame
  const glideTo = useCallback((to, done) => {
    busyRef.current = true;
    const from = window.scrollY;
    const dist = to - from;
    const dur = Math.min(12800, Math.max(6100, Math.abs(dist) * 10.5));
    const t0 = performance.now();
    let lastRun = t0;
    let finished = false;
    const run = () => {
      if (finished) return;
      const t = Math.min(1, (performance.now() - t0) / dur);
      window.scrollTo({ top: from + dist * easeSine(t), behavior: "instant" });
      lastRun = performance.now();
      if (t >= 1) { finished = true; clearInterval(poll.current); cancelAnimationFrame(raf.current); busyRef.current = false; done(); }
    };
    const loop = () => { run(); if (!finished) raf.current = requestAnimationFrame(loop); };
    clearInterval(poll.current);
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(loop);
    poll.current = setInterval(() => { if (performance.now() - lastRun > 90) run(); }, 50); // backup if the browser holds back frames
  }, []);

  const advance = useCallback(() => {
    if (!wantRef.current) return;
    if (document.querySelector(".lightbox")) { schedule(600, advance); return; } // never scroll behind an open photo
    // the "save the date" card is still being washed clean: wait here until the date is showing
    const sc = document.querySelector(".scratch");
    if (sc && !sc.classList.contains("is-revealed")) {
      const r = sc.getBoundingClientRect();
      if (r.bottom > 40 && r.top < window.innerHeight - 40) { schedule(600, advance); return; }
    }
    const y = window.scrollY;
    const next = computeStops().find((s) => s > y + 8);
    if (next == null) { wantRef.current = false; return; } // reached the end
    glideTo(next, () => schedule(DWELL_MS, advance));
  }, [glideTo, schedule]);

  const play = useCallback((delay = DWELL_MS) => {
    wantRef.current = true;
    const atEnd = window.scrollY >= document.documentElement.scrollHeight - document.documentElement.clientHeight - 8;
    if (atEnd) window.scrollTo({ top: 0, behavior: "instant" });
    schedule(delay, advance);
  }, [advance, schedule]);

  // start once the entry card has gone
  useEffect(() => {
    if (reduce || window.location.search.includes("noauto")) return undefined; // ?noauto switches it off (handy for checking layouts)
    const root = document.documentElement;
    let started = false;
    const begin = () => { if (!started && !root.classList.contains("intro-active")) { started = true; mo.disconnect(); play(FIRST_MS); } };
    const mo = new MutationObserver(begin);
    mo.observe(root, { attributes: true, attributeFilter: ["class"] });
    begin();
    return () => { mo.disconnect(); wantRef.current = false; clearTimeout(timer.current); clearInterval(poll.current); cancelAnimationFrame(raf.current); };
  }, [play, reduce]);

  // the date has just been revealed: give it a moment, then carry on
  useEffect(() => {
    const onRevealed = () => { if (wantRef.current && !busyRef.current) schedule(DWELL_MS, advance); };
    window.addEventListener("scratch:revealed", onRevealed);
    return () => window.removeEventListener("scratch:revealed", onRevealed);
  }, [advance, schedule]);

  // the visitor takes over: stop at once, then carry on after 1.5s of stillness
  useEffect(() => {
    if (reduce) return undefined;
    const take = (e) => {
      if (!wantRef.current) return;
      if (e.target && e.target.closest && e.target.closest(".autoplay")) return;
      if (e.type === "keydown" && !["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " ", "Spacebar"].includes(e.key)) return;
      haltGlide();
      schedule(RESUME_MS, advance);
    };
    // scrolling that the visitor does (a flick's momentum, a trackpad) also counts as touching the page
    const onScroll = () => { if (wantRef.current && !busyRef.current) schedule(RESUME_MS, advance); };
    const evs = ["wheel", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "mousedown", "keydown"];
    evs.forEach((n) => window.addEventListener(n, take, { passive: true }));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { evs.forEach((n) => window.removeEventListener(n, take)); window.removeEventListener("scroll", onScroll); };
  }, [advance, haltGlide, schedule, reduce]);

  return null; // no visible control: it runs by itself and yields to the visitor's touch
}
