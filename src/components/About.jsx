import { GROOM, BRIDE } from "../config.js";
import groomImg from "../assets/story/groom-portrait.jpg";
import brideImg from "../assets/story/bride-portrait.jpg";

export default function About() {
  return (
    <section className="about reveal" id="about">
      <div className="section-head">
        <p className="eyebrow">Two Hearts, One Story</p>
        <h2>Meet the Bride &amp; Groom</h2>
      </div>
      <div className="about__grid">
        <figure className="person">
          <div className="frame">
            <img src={groomImg} alt={GROOM.name} loading="lazy" style={{ objectPosition: "50% 20%" }} />
          </div>
          <figcaption>
            <h3>{GROOM.name}</h3>
            <p className="role">The Groom</p>
            <p>Son of {GROOM.parents} &mdash; calm, warm-hearted and always ready with a smile, he is looking forward to beginning this new chapter surrounded by family and friends.</p>
          </figcaption>
        </figure>
        <div className="about__amp">&amp;</div>
        <figure className="person">
          <div className="frame">
            <img src={brideImg} alt={BRIDE.name} loading="lazy" style={{ objectPosition: "50% 30%" }} />
          </div>
          <figcaption>
            <h3>{BRIDE.name}</h3>
            <p className="role">The Bride</p>
            <p>Daughter of {BRIDE.parents} &mdash; graceful, cheerful and full of life, she brings colour to every room &mdash; and now to a lifetime together.</p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
