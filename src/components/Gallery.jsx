import { useCallback, useEffect, useState } from "react";
import { GROOM, BRIDE } from "../config.js";

// Every image dropped into src/assets/gallery/ shows up here, sorted by file name.
const found = import.meta.glob("../assets/gallery/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", {
  eager: true,
  query: "?url",
  import: "default",
});
const PHOTOS = Object.entries(found)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => ({ src, alt: `${GROOM.name} and ${BRIDE.name} — ${path.split("/").pop().replace(/\.\w+$/, "").replace(/^\d+[-_]?/, "").replace(/[-_]/g, " ") || "photo"}` }));

const MIN_TILES = 6;
const PLACEHOLDERS = Math.max(0, MIN_TILES - PHOTOS.length);

export default function Gallery() {
  const [open, setOpen] = useState(null);
  const close = () => setOpen(null);
  const step = useCallback((d) => setOpen((i) => (i === null ? i : (i + d + PHOTOS.length) % PHOTOS.length)), []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step]);

  return (
    <section className="gallery reveal" id="gallery">
      <div className="section-head">
        <p className="eyebrow">Our Moments</p>
        <h2>Photo Gallery</h2>
        <p className="lead">A few frames from our journey so far.</p>
      </div>

      <div className="gallery__grid">
        {PHOTOS.map((p, i) => (
          <button key={p.src} className="gallery__item" onClick={() => setOpen(i)} aria-label={`Open photo ${i + 1}`}>
            <img src={p.src} alt={p.alt} loading="lazy" />
          </button>
        ))}
        {Array.from({ length: PLACEHOLDERS }, (_, i) => (
          <div key={`ph${i}`} className="gallery__item gallery__item--ph" aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <circle cx="46" cy="44" r="13" /><path d="M24 96c0-20 10-30 22-30s22 10 22 30Z" />
              <circle cx="80" cy="46" r="12" /><path d="M60 96c0-18 9-28 20-28s20 10 20 28Z" />
            </svg>
            <span>Photo coming soon</span>
          </div>
        ))}
      </div>

      {open !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={close}>
          <button className="lightbox__btn lightbox__close" onClick={close} aria-label="Close">×</button>
          {PHOTOS.length > 1 && (
            <>
              <button className="lightbox__btn lightbox__prev" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous">‹</button>
              <button className="lightbox__btn lightbox__next" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next">›</button>
            </>
          )}
          <img src={PHOTOS[open].src} alt={PHOTOS[open].alt} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}
