import { DAYS, VENUE, dayLabel, dayShort } from "../config.js";
import EventIcon from "./EventIcon.jsx";

// Vertical timeline: a golden thread with a medallion per ceremony; cards alternate sides.
export default function Timeline() {
  let n = 0; // running index so cards alternate sides across both days
  return (
    <section className="timeline reveal" id="timeline">
      <div className="section-head">
        <p className="eyebrow">The Celebrations</p>
        <h2>Wedding Itinerary</h2>
      </div>

      {DAYS.map((day, d) => (
        <div className="day" key={day.date}>
          <h3 className="day__label"><span>Day {d + 1}</span> {dayLabel(day.date)}</h3>
          <ol className="tl">
            {day.events.map((e) => {
              const side = n % 2 === 0 ? "l" : "r";
              const idx = n++;
              return (
                <li className={`tl__item tl__item--${side}${e.feature ? " tl__item--feature" : ""}`} key={e.id} style={{ "--n": idx }}>
                  <div className="tl__when">
                    <span className="tl__date">{dayShort(day.date)}</span>
                    <span className="tl__time">{e.time}</span>
                  </div>
                  <div className="tl__node"><EventIcon id={e.id} /></div>
                  <div className="tl__card">
                    <h3>{e.title}</h3>
                    <span className="tl__orn" aria-hidden="true">✦</span>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      ))}

      <p className="timeline__venue">All ceremonies at <strong>{VENUE.name}</strong>, Hubballi</p>
    </section>
  );
}
