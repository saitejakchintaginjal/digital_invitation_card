import { VENUE, MAPS_URL } from "../config.js";

export default function Know() {
  return (
    <section className="know reveal" id="know">
      <div className="section-head">
        <p className="eyebrow">For Our Guests</p>
        <h2>Things to Know</h2>
      </div>
      <div className="know__grid">
        <div className="tile">
          <svg viewBox="0 0 48 48"><path d="M24 4C15 4 8 11 8 20c0 12 16 24 16 24s16-12 16-24C40 11 33 4 24 4Z" /><circle cx="24" cy="20" r="6" /></svg>
          <h3>Venue &amp; Maps</h3>
          <p>{VENUE.name}, {VENUE.address}.</p>
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">Open in Maps →</a>
        </div>
        <div className="tile">
          <svg viewBox="0 0 48 48"><path d="M10 40V22a14 14 0 0 1 28 0v18Z" /><path d="M24 8V4M18 40V28h12v12" /></svg>
          <h3>Weather &amp; Comfort</h3>
          <p>December evenings in Hubballi are mild; a light shawl is handy for the outdoor ceremonies.</p>
        </div>
      </div>
    </section>
  );
}
