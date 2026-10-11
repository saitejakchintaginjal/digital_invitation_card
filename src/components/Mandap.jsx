import mandapImg from "../assets/mandap.jpg";

export default function Mandap() {
  return (
    <>
<section className="mandap reveal" id="mandap">
  <div className="section-head">
    <p className="eyebrow">Where Vows Are Taken</p>
    <h2>The Mandap</h2>
    <p className="lead">Draped in blush silk, crowned with fresh blooms and lit by a thousand diyas &mdash; a royal setting for the seven sacred vows.</p>
  </div>
  <figure className="mandap__frame">
    <img className="mandap__art" src={mandapImg} alt="Decorated wedding mandap with a rose-topped canopy, carved golden pillars and royal seating" loading="lazy" />
  </figure>
</section>
    </>
  );
}
