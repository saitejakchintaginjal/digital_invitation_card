import { useCallback, useEffect, useRef, useState } from "react";

/*
  Background music (public/wedding-music.mp3: saxophone & mridangam, cut from the 6-second mark of the original).
  Browsers only allow sound after the visitor has touched the page, so the entry card's "Tap to open" starts it
  (it announces itself with a "wedding:music" event). The round speaker button at the bottom-left mutes / unmutes.
  The music fades in and out, loops, and pauses while the tab is hidden.
*/
const VOLUME = 0.55;
const FADE_MS = 1800;

export default function Music() {
  const audioRef = useRef(null);
  const fadeRef = useRef(0);
  const wantRef = useRef(false); // the visitor wants music (switched on by the tap, off by the button)
  const [on, setOn] = useState(false);

  const fadeTo = useCallback((target, done) => {
    const a = audioRef.current;
    if (!a) return;
    cancelAnimationFrame(fadeRef.current);
    const from = a.volume;
    const t0 = performance.now();
    const step = () => {
      const t = Math.min(1, (performance.now() - t0) / FADE_MS);
      a.volume = Math.max(0, Math.min(1, from + (target - from) * t));
      if (t < 1) fadeRef.current = requestAnimationFrame(step);
      else if (done) done();
    };
    fadeRef.current = requestAnimationFrame(step);
  }, []);

  const start = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    wantRef.current = true;
    a.volume = 0;
    const p = a.play();
    const ok = () => { setOn(true); fadeTo(VOLUME); };
    if (p && p.then) p.then(ok).catch(() => { wantRef.current = false; setOn(false); });
    else ok();
  }, [fadeTo]);

  const stop = useCallback(() => {
    wantRef.current = false;
    setOn(false);
    fadeTo(0, () => audioRef.current && audioRef.current.pause());
  }, [fadeTo]);

  useEffect(() => {
    const onTap = () => { if (!wantRef.current) start(); };
    const onHide = () => {
      const a = audioRef.current;
      if (!a) return;
      if (document.hidden) a.pause();
      else if (wantRef.current) a.play().catch(() => {});
    };
    window.addEventListener("wedding:music", onTap);
    document.addEventListener("visibilitychange", onHide);
    return () => {
      window.removeEventListener("wedding:music", onTap);
      document.removeEventListener("visibilitychange", onHide);
      cancelAnimationFrame(fadeRef.current);
      if (audioRef.current) audioRef.current.pause();
    };
  }, [start]);

  return (
    <>
      <audio ref={audioRef} src="/wedding-music.mp3" loop preload="none" />
      <button type="button" className={`musicbtn${on ? " is-on" : ""}`} onClick={on ? stop : start} aria-label={on ? "Mute the music" : "Play the music"} title={on ? "Mute music" : "Play music"}>
        {on ? (
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 7.5v5h3.2L10.5 16V4L6.2 7.5Z" /><path d="M13 7.2a4 4 0 0 1 0 5.6M15.3 4.9a7.4 7.4 0 0 1 0 10.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
        ) : (
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 7.5v5h3.2L10.5 16V4L6.2 7.5Z" /><path d="m13.2 7.6 4.6 4.8m0-4.8-4.6 4.8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
        )}
      </button>
    </>
  );
}
