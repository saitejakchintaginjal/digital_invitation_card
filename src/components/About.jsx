import { GROOM, BRIDE } from "../config.js";
import Heart from "./Heart.jsx";
import groomImg from "../assets/story/groom-portrait.jpg";
import brideImg from "../assets/story/bride-portrait.jpg";
import Ornaments from "./Ornaments.jsx";

export default function About() {
  return (
    <section className="about slide reveal" id="about">
      <Ornaments />
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
            <p>Calm, kind-hearted and always ready with a smile.</p>
          </figcaption>
        </figure>
        <div className="about__amp"><span className="about__line" /><Heart /><span className="about__line" /></div>
        <figure className="person">
          <div className="frame">
            <img src={brideImg} alt={BRIDE.name} loading="lazy" style={{ objectPosition: "50% 6%" }} />
          </div>
          <figcaption>
            <h3>{BRIDE.name}</h3>
            <p className="role">The Bride</p>
            <p>Cheerful, full of life and bringing colour to every moment.</p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
