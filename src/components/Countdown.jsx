import { WEDDING_DATE } from "../config.js";
import useCountdown from "../hooks/useCountdown.js";

const pad = (n) => String(n).padStart(2, "0");

export default function Countdown() {
  const t = useCountdown(WEDDING_DATE);
  return (
    <>
<section className="countdown reveal" id="countdown">
  <div className="countdown__water" aria-hidden="true">
    <svg viewBox="0 0 1440 220" preserveAspectRatio="none">
      <path d="M0 40 Q180 10 360 40 T720 40 T1080 40 T1440 40 V220 H0Z" fill="#7d2146" opacity=".55"/>
      <path d="M0 80 Q180 55 360 80 T720 80 T1080 80 T1440 80 V220 H0Z" fill="#5c1233" opacity=".6"/>
    </svg>
  </div>
  <svg className="elephant elephant--l" viewBox="0 0 400 320" aria-hidden="true">
    <g id="elephant">
      <ellipse cx="190" cy="190" rx="120" ry="90" fill="#8d8d9b"/>
      <path d="M270 150 Q340 140 350 200 Q360 250 330 290 L300 290 Q310 240 300 215 Q280 200 270 215Z" fill="#8d8d9b"/>
      <path d="M335 160 Q380 150 392 195 L370 190 Q362 170 335 175Z" fill="#8d8d9b"/>
      <circle cx="330" cy="170" r="5" fill="#222"/>
      <path d="M300 150 Q320 100 355 110 Q380 130 365 175Z" fill="#d6214a" stroke="#f7e08a" strokeWidth="3"/>
      <path d="M305 135 Q330 112 355 124" fill="none" stroke="#f7e08a" strokeWidth="3" strokeDasharray="2 5" strokeLinecap="round"/>
      <path d="M355 215 Q380 230 372 258" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round"/>
      <path d="M95 150 Q190 80 285 150 L285 215 Q190 150 95 215Z" fill="#b0142f" stroke="#f7e08a" strokeWidth="3"/>
      <path d="M105 175 Q190 115 275 175" fill="none" stroke="#f7e08a" strokeWidth="4" strokeDasharray="2 8" strokeLinecap="round"/>
      <rect x="120" y="95" width="140" height="62" rx="10" fill="#d6214a" stroke="#f7e08a" strokeWidth="3"/>
      <path d="M130 95 Q190 40 250 95Z" fill="url(#gold)" stroke="#8a5a14" strokeWidth="2"/>
      <circle cx="190" cy="58" r="6" fill="#f7e08a"/>
      <g fill="#f7e08a"><circle cx="145" cy="125" r="5"/><circle cx="190" cy="125" r="5"/><circle cx="235" cy="125" r="5"/></g>
      <rect x="95" y="250" width="44" height="64" rx="10" fill="#8d8d9b"/><rect x="150" y="256" width="44" height="58" rx="10" fill="#7d7d8b"/>
      <rect x="215" y="256" width="44" height="58" rx="10" fill="#7d7d8b"/><rect x="266" y="250" width="44" height="64" rx="10" fill="#8d8d9b"/>
      <g stroke="#f7e08a" strokeWidth="4"><path d="M95 300 h44 M266 300 h44 M150 302 h44 M215 302 h44"/></g>
      <path d="M72 190 Q58 215 70 245" stroke="#8d8d9b" strokeWidth="7" fill="none" strokeLinecap="round"/>
    </g>
  </svg>
  <svg className="elephant elephant--r" viewBox="0 0 400 320" aria-hidden="true"><use href="#elephant"/></svg>
  <div className="countdown__inner">
    <p className="eyebrow">Counting Down To</p>
    <h2>Our Big Day</h2>
    <div className="timer" role="timer" aria-live="off">
      <div className="timer__box"><b>{pad(t.d)}</b><small>Days</small></div>
      <div className="timer__box"><b>{pad(t.h)}</b><small>Hours</small></div>
      <div className="timer__box"><b>{pad(t.m)}</b><small>Minutes</small></div>
      <div className="timer__box"><b>{pad(t.s)}</b><small>Seconds</small></div>
    </div>
    <p className="timer__msg">{t.done ? "Today is the day! Shubh Vivah 🎉" : ""}</p>
  </div>
  <div className="lotus-row" aria-hidden="true">
    <svg className="lotus l1" viewBox="-90 -110 180 130"><use href="#lotus"/></svg>
    <svg className="lotus l2" viewBox="-90 -110 180 130"><use href="#lotus"/></svg>
    <svg className="lotus l3" viewBox="-90 -110 180 130"><use href="#lotus"/></svg>
    <svg className="lotus l4" viewBox="-90 -110 180 130"><use href="#lotus"/></svg>
  </div>
</section>
    </>
  );
}
