import { GROOM, BRIDE } from "../config.js";

export default function About() {
  return (
    <>
<section className="about reveal" id="about">
  <div className="section-head">
    <p className="eyebrow">Two Hearts, One Story</p>
    <h2>Meet the Bride &amp; Groom</h2>
  </div>
  <div className="about__grid">
    <figure className="person">
      <div className="frame">
        <svg viewBox="0 0 200 250" aria-label="Groom photo placeholder">
          <rect width="200" height="250" fill="#f9e3d0"/>
          <circle cx="100" cy="95" r="42" fill="#e0a77a"/>
          <path d="M58 90 Q60 40 100 40 Q140 40 142 90 Q125 62 100 62 Q75 62 58 90Z" fill="#c4263d"/>
          <path d="M30 250 Q30 160 100 150 Q170 160 170 250Z" fill="#e8c46a"/>
          <path d="M100 150 V250" stroke="#9c6d12" strokeWidth="2"/>
        </svg>
      </div>
      <figcaption>
        <h3>{GROOM.name}</h3>
        <p className="role">The Groom</p>
        <p>Son of {GROOM.parents}. Calm, warm-hearted and always ready with a smile, he is looking forward to beginning this new chapter surrounded by family and friends.</p>
      </figcaption>
    </figure>
    <div className="about__amp">&amp;</div>
    <figure className="person">
      <div className="frame">
        <svg viewBox="0 0 200 250" aria-label="Bride photo placeholder">
          <rect width="200" height="250" fill="#fbdde6"/>
          <circle cx="100" cy="100" r="40" fill="#e8b48a"/>
          <path d="M55 110 Q50 40 100 38 Q150 40 145 110 Q150 190 168 250 H32 Q50 190 55 110Z" fill="#b0142f"/>
          <circle cx="100" cy="100" r="34" fill="#e8b48a"/>
          <path d="M78 66 Q100 52 122 66" stroke="#f7e08a" strokeWidth="4" fill="none"/>
          <circle cx="100" cy="70" r="4" fill="#f7e08a"/>
        </svg>
      </div>
      <figcaption>
        <h3>{BRIDE.name}</h3>
        <p className="role">The Bride</p>
        <p>Daughter of {BRIDE.parents}. Graceful, cheerful and full of life, she brings colour to every room &mdash; and now to a lifetime together.</p>
      </figcaption>
    </figure>
  </div>
</section>
    </>
  );
}
