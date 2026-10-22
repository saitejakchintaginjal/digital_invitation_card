import { useEffect } from "react";

// Scroll-linked effects, written straight to the few elements that need them
// (never to <html>, which would force a style recalculation of the whole page):
//   - top progress bar
//   - hero parallax (photo drifts slower, text drifts up and fades)
// Work is limited to one write per animation frame, and the parallax stops once
// the hero has scrolled out of view.
export default function useScrollFx() {
  useEffect(() => {
    const bar = document.querySelector(".progress");
    const stage = document.querySelector(".hero__stage");
    const text = document.querySelector(".hero__text");
    const hero = document.getElementById("hero");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let max = 1;
    let heroH = 1;
    let raf = 0;
    let lastHeroY = -1;

    const measure = () => {
      max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      heroH = hero ? hero.offsetHeight : 1;
    };

    const update = () => {
      raf = 0;
      const y = window.scrollY;
      if (bar) bar.style.transform = `scaleX(${Math.min(1, y / max)})`;
      if (reduce || !stage || !text) return;
      const hy = Math.min(y, heroH);
      if (hy === lastHeroY) return; // already parked past the hero
      lastHeroY = hy;
      stage.style.transform = `translate3d(0, ${(hy * 0.18).toFixed(1)}px, 0) scale(1.06)`;
      text.style.transform = `translate3d(0, ${(hy * 0.35).toFixed(1)}px, 0)`;
      text.style.opacity = String(Math.max(0, 1 - hy / 520));
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    const onResize = () => { measure(); onScroll(); };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);
    const ro = new ResizeObserver(onResize); // content (images, fonts) changing the page height
    ro.observe(document.body);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
}
