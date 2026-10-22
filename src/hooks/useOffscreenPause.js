import { useEffect } from "react";

// Looping animations are the main scroll cost, so any section that is off-screen
// gets `data-offscreen` and CSS pauses everything inside it (see styles.css).
export default function useOffscreenPause() {
  useEffect(() => {
    const els = document.querySelectorAll("header, section");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.removeAttribute("data-offscreen");
          else e.target.setAttribute("data-offscreen", "1");
        }),
      { rootMargin: "120px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
