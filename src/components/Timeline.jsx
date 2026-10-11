import { DAYS, VENUE, dayLabel } from "../config.js";
import EventIcon from "./EventIcon.jsx";

export default function Timeline() {
  return (
    <section className="timeline reveal" id="timeline">
      <div className="section-head">
        <p className="eyebrow">The Celebrations</p>
        <h2>Wedding Itinerary</h2>
      </div>
      {DAYS.map((day, d) => (
        <div className="day" key={day.date}>
          <h3 className="day__label"><span>Day {d + 1}</span> {dayLabel(day.date)}</h3>
          <div className="cards">
            {day.events.map((e) => (
              <article className={`card${e.feature ? " card--feature" : ""}`} key={e.id}>
                <span className="card__corner tl" /><span className="card__corner tr" />
                <span className="card__corner bl" /><span className="card__corner br" />
                <EventIcon id={e.id} />
                <h3>{e.title}</h3>
                <p className="card__time">{e.time}</p>
              </article>
            ))}
          </div>
        </div>
      ))}
      <p className="timeline__venue">All ceremonies at <strong>{VENUE.name}</strong>, Hubballi</p>
    </section>
  );
}
