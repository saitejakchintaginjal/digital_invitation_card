import peacocksImg from "../assets/peacocks.jpg";
import Ornaments from "./Ornaments.jsx";
import ScratchDate from "./ScratchDate.jsx";

export default function Names() {
  return (
    <section className="names slide reveal" id="names">
      <Ornaments bottom={false} />
      <div className="names__inner">
        <ScratchDate />
      </div>

      <figure className="names__art">
        <div className="names__stage">
          <img className="names__base" src={peacocksImg} alt="Two peacocks with fanned tails facing each other on a golden palace balcony" loading="lazy" decoding="async" />
          {/* the same picture clipped to each tail fan, swaying gently so the feathers seem to ripple */}
          <img className="names__fan names__fan--l" src={peacocksImg} alt="" aria-hidden="true" loading="lazy" decoding="async" />
          <img className="names__fan names__fan--r" src={peacocksImg} alt="" aria-hidden="true" loading="lazy" decoding="async" />
          <span className="names__shine" aria-hidden="true" />
        </div>
      </figure>
    </section>
  );
}
