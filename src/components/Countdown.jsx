import { WEDDING_DATE } from "../config.js";
import useCountdown from "../hooks/useCountdown.js";
import CountdownScene from "./CountdownScene.jsx";

const pad = (n) => String(n).padStart(2, "0");
const UNITS = [["d", "Days"], ["h", "Hours"], ["m", "Minutes"], ["s", "Seconds"]];

export default function Countdown() {
  const t = useCountdown(WEDDING_DATE);
  return (
    <section className="countdown reveal" id="countdown">
      <div className="countdown__inner">
        <p className="eyebrow">Counting Down To</p>
        <h2>Our Big Day</h2>
        <div className="timer" role="timer" aria-live="off">
          {UNITS.map(([k, label]) => (
            <div className="timer__box" key={k}>
              <b key={t[k]} className="tick">{pad(t[k])}</b>
              <small>{label}</small>
            </div>
          ))}
        </div>
        <p className="timer__msg">{t.done ? "Today is the day! Shubh Vivah 🎉" : ""}</p>
      </div>
      <div className="cd-scene-wrap">
        <CountdownScene />
      </div>
    </section>
  );
}
