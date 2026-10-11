import { GROOM, BRIDE } from "../config.js";
import { useEffect, useState } from "react";

const LINKS = [
  ["names", "Couple"],
  ["timeline", "Events"],
  ["mandap", "Mandap"],
  ["about", "Bride & Groom"],
  ["gallery", "Gallery"],
  ["know", "Know"],
  ["countdown", "Countdown"],
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    LINKS.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`}>
      <a href="#hero" className="nav__brand">{GROOM.name[0]} <span>&amp;</span> {BRIDE.name[0]}</a>
      <button className="nav__toggle" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <i /><i /><i />
      </button>
      <ul className={`nav__links${open ? " open" : ""}`} onClick={() => setOpen(false)}>
        {LINKS.map(([id, label]) => (
          <li key={id}><a href={`#${id}`} className={active === id ? "active" : undefined}>{label}</a></li>
        ))}
      </ul>
    </nav>
  );
}
