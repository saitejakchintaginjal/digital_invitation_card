import { useEffect } from "react";

// Publishes scroll position as CSS variables on <html> (throttled to one write per frame):
//   --sy        scrollY in px (hero parallax)
//   --progress  0..1 page progress (top progress bar)
export default function useScrollFx() {
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = root.scrollHeight - window.innerHeight;
      root.style.setProperty("--sy", String(Math.min(window.scrollY, 900)));
      root.style.setProperty("--progress", String(max > 0 ? window.scrollY / max : 0));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
}
