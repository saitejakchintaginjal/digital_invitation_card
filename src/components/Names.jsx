import { GROOM, BRIDE, DATE_RANGE } from "../config.js";
import Peacock from "./Peacock.jsx";

export default function Names() {
  return (
    <section className="names reveal" id="names">
      <div className="names__grid">
        <Peacock side="l" />
        <div className="names__inner">
          <p className="eyebrow eyebrow--dark">With the blessings of our elders</p>
          <h2 className="names__title">{GROOM.name} <em>&amp;</em> {BRIDE.name}</h2>
          <div className="divider">
            <span />
            <svg width="26" height="26" viewBox="-13 -13 26 26"><path d="M0 -12 L4 -4 L12 0 L4 4 L0 12 L-4 4 L-12 0 L-4 -4Z" fill="url(#gold)" /></svg>
            <span />
          </div>
          <p className="names__text">
            Son of <strong>{GROOM.parents}</strong> and daughter of <strong>{BRIDE.parents}</strong> request the honour of your presence as they begin a beautiful new chapter, bound by love, tradition and togetherness.
          </p>
          <p className="names__date">{DATE_RANGE}</p>
        </div>
        <Peacock side="r" />
      </div>
    </section>
  );
}
