import { useCallback, useEffect, useState } from "react";
import { GROOM, BRIDE } from "../config.js";
import Heart from "./Heart.jsx";
import groomChild from "../assets/story/groom.jpg";
import brideChild from "../assets/story/bride.jpg";
import coupleImg from "../assets/story/couple.jpg";
import selfieImg from "../assets/story/selfie.jpg";
import retroImg from "../assets/story/retro.jpg";

// Childhood photos that open the story.
const STORY = [
  { key: "groom", src: groomChild, alt: `Little ${GROOM.name}`, label: `Little ${GROOM.name}`, pos: "50% 30%" },
  { key: "bride", src: brideChild, alt: `Little ${BRIDE.name}`, label: `Little ${BRIDE.name}`, pos: "50% 14%" },
];

// The featured couple photo that follows "they found each other".
const FEATURE = { key: "couple", src: coupleImg, alt: `${GROOM.name} and ${BRIDE.name} sharing a happy moment`, pos: "50% 30%" };

// The playful pair: a sunny selfie and a retro "filmy" portrait.
const PLAY = [
  { key: "selfie", src: selfieImg, alt: `${GROOM.name} and ${BRIDE.name} in a sunny selfie`, label: "Sunny selfies", note: "Any day is a good day with you.", pos: "50% 30%", variant: "selfie" },
  { key: "retro", src: retroImg, alt: `${GROOM.name} and ${BRIDE.name} in a retro, filmy-style portrait`, label: "Filmy at heart", note: "Straight out of a 90s Bollywood love story.", pos: "50% 30%", variant: "retro" },
];

// Every image dropped into src/assets/gallery/ shows up in "Moments Together", sorted by file name.
const found = import.meta.glob("../assets/gallery/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", {
  eager: true,
  query: "?url",
  import: "default",
});
// "02-engagement-rochan.jpg" -> "Engagement rochan"; shown as the image alt text
const captionFrom = (path) => {
  const t = path.split("/").pop().replace(/\.\w+$/, "").replace(/^\d+[-_]?/, "").replace(/[-_]/g, " ").trim();
  return t ? t[0].toUpperCase() + t.slice(1) : `${GROOM.name} and ${BRIDE.name}`;
};
// Optional on-photo captions, keyed by file name (without extension).
const CAPTIONS = {
  "02-engagement-rochan": GROOM.name,
  "03-engagement-nikita": BRIDE.name,
};
const MOMENTS = Object.entries(found)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => ({
    src,
    alt: captionFrom(path),
    caption: CAPTIONS[path.split("/").pop().replace(/\.\w+$/, "")],
  }));

// One list drives the lightbox: the two childhood photos first, then the couple's moments.
const ALL = [...STORY, FEATURE, ...PLAY, ...MOMENTS];
const FEATURE_INDEX = STORY.length;
const PLAY_INDEX = FEATURE_INDEX + 1;
const MOMENTS_INDEX = PLAY_INDEX + PLAY.length;
const MIN_TILES = 0;
const PLACEHOLDERS = Math.max(0, MIN_TILES - MOMENTS.length);

function Polaroid({ photo, index, side, onOpen }) {
  return (
    <button className={`polaroid polaroid--${side}`} onClick={() => onOpen(index)} aria-label={`Open photo: ${photo.label}`}>
      <span className="polaroid__tape" aria-hidden="true" />
      <span className="polaroid__img">
        <img src={photo.src} alt={photo.alt} loading="lazy" style={{ objectPosition: photo.pos }} />
      </span>
      <span className="polaroid__cap">{photo.label}</span>
    </button>
  );
}

export default function Gallery() {
  const [open, setOpen] = useState(null);
  const close = () => setOpen(null);
  const step = useCallback((d) => setOpen((i) => (i === null ? i : (i + d + ALL.length) % ALL.length)), []);

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
        <p className="eyebrow">Our Story</p>
        <h2>Photo Gallery</h2>
        <p className="lead">Two little people, two different homes &mdash; and a story already being written.</p>
      </div>

      {/* ---- Once upon a time: childhood polaroids joined by a golden thread ---- */}
      <div className="story">
        <Polaroid photo={STORY[0]} index={0} side="l" onOpen={setOpen} />

        <div className="story__thread" aria-hidden="true">
          <svg viewBox="0 12 200 96">
            <path className="thread" d="M0 60 C40 10 70 10 100 60 C130 110 160 110 200 60" />
            {/* outer group positions the heart; the inner group is the one that beats */}
            <g transform="translate(100 60)">
              <g className="thread__heart">
                <path d="M0 10 C-22 -6 -14 -22 0 -11 C14 -22 22 -6 0 10Z" />
              </g>
            </g>
          </svg>
          <span>Written in the stars</span>
        </div>

        <Polaroid photo={STORY[1]} index={1} side="r" onOpen={setOpen} />
      </div>

      <p className="story__line">
        <span>Years later&hellip;</span> they found each other.
      </p>

      {/* ---- Featured couple photo ---- */}
      <div className="feature">
        <button className="feature__photo" onClick={() => setOpen(FEATURE_INDEX)} aria-label="Open photo: Rochan and Nikita together">
          <span className="feature__frame">
            <img src={FEATURE.src} alt={FEATURE.alt} loading="lazy" style={{ objectPosition: FEATURE.pos }} />
          </span>
        </button>
        <div className="feature__text">
          <p className="eyebrow">Together</p>
          <p className="feature__script">Two hearts, one smile</p>
          <p>
            No grand words were needed &mdash; just a glance, a gentle touch and a smile that said it all. In each
            other, {GROOM.name} and {BRIDE.name} found a friend, a partner and a home.
          </p>
          <span className="feature__sign" aria-hidden="true">{GROOM.name} <Heart /> {BRIDE.name}</span>
        </div>
      </div>

      {/* ---- Playful side: selfie + retro ---- */}
      <div className="play">
        <p className="eyebrow">Just for Fun</p>
        <p className="play__script">Always up for a laugh</p>
        <p className="play__text">
          Between the big moments are the little ones &mdash; sunny selfies, silly poses and a flair for the filmy.
          Whatever the frame, the smiles stay the same.
        </p>
        <div className="play__grid">
          {PLAY.map((p, i) => (
            <button key={p.key} className={`snap snap--${p.variant}`} onClick={() => setOpen(PLAY_INDEX + i)} aria-label={`Open photo: ${p.label}`}>
              <span className="snap__img">
                <img src={p.src} alt={p.alt} loading="lazy" style={{ objectPosition: p.pos }} />
              </span>
              <span className="snap__cap">{p.label}</span>
              <span className="snap__note">{p.note}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ---- Moments together ---- */}
      <h3 className="gallery__sub">Moments Together</h3>
      <div className="gallery__grid">
        {MOMENTS.map((p, i) => (
          <button key={p.src} className="gallery__item" onClick={() => setOpen(MOMENTS_INDEX + i)} aria-label={`Open photo ${i + 1}`}>
            <span className="gallery__pic">
              <img src={p.src} alt={p.alt} loading="lazy" />
              {p.caption && <span className="gallery__cap">{p.caption}</span>}
            </span>
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

      <div className="engage">
        <p className="eyebrow">The Engagement</p>
        <p className="engage__script">A promise made with blessings</p>
        <p className="engage__text">
          Before the wedding came the quiet beginning &mdash; garlands of roses and jasmine, gifts exchanged and the
          blessings of both families. Two smiles, one yes, and the first step of a journey we can&rsquo;t wait to
          celebrate with you.
        </p>
      </div>

      {open !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={close}>
          <button className="lightbox__btn lightbox__close" onClick={close} aria-label="Close">×</button>
          <button className="lightbox__btn lightbox__prev" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous">‹</button>
          <button className="lightbox__btn lightbox__next" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next">›</button>
          <img src={ALL[open].src} alt={ALL[open].alt} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}
