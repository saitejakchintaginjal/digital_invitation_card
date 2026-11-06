import { useEffect, useRef, useState } from "react";
import { DAYS } from "../config.js";

/*
  "Save the date" scratch card. A gold foil with "SAVE THE DATE" covers the date; when the card scrolls into view a
  little coin scratches the foil away by itself, in rows, until the date shows. The date then grows big.
  (Visitors who prefer reduced motion just see the date.)
*/
const WAIT_MS = 1700;     // after the card comes into view
const SCRATCH_MS = 4200;  // how long the scratching takes
const BRUSH = 21;         // radius of the coin's scratch, in CSS pixels

const d = new Date(`${DAYS[0].date}T00:00:00`);
const DAY = d.getDate();
const MONTH_YEAR = d.toLocaleDateString("en-IN", { month: "long", year: "numeric" });

function paintFoil(ctx, w, h) {
  ctx.globalCompositeOperation = "source-over";
  ctx.clearRect(0, 0, w, h);
  const r = Math.min(30, h / 4);
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(0, 0, w, h, r);
  ctx.clip();
  // brushed gold
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, "#b8872a"); g.addColorStop(0.22, "#f3d77c"); g.addColorStop(0.45, "#d4a437"); g.addColorStop(0.68, "#fff0b8"); g.addColorStop(0.85, "#cb9a30"); g.addColorStop(1, "#a97a1e");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  // fine grain + glitter
  for (let i = 0; i < Math.round((w * h) / 90); i++) {
    ctx.fillStyle = Math.random() < 0.5 ? "rgba(255,244,200,.35)" : "rgba(120,80,10,.22)";
    ctx.fillRect(Math.random() * w, Math.random() * h, 1.2, 1.2);
  }
  // soft diagonal sheen
  const s = ctx.createLinearGradient(0, 0, w, 0);
  s.addColorStop(0, "rgba(255,255,255,0)"); s.addColorStop(0.5, "rgba(255,255,255,.28)"); s.addColorStop(1, "rgba(255,255,255,0)");
  ctx.save();
  ctx.translate(w * 0.2, 0); ctx.rotate(0.35);
  ctx.fillStyle = s; ctx.fillRect(0, -h, w * 0.35, h * 3);
  ctx.restore();
  // inner frame
  ctx.strokeStyle = "rgba(120,78,10,.7)"; ctx.lineWidth = 1.6;
  ctx.beginPath(); ctx.roundRect(8, 8, w - 16, h - 16, Math.max(4, r - 8)); ctx.stroke();
  ctx.strokeStyle = "rgba(255,244,190,.6)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.roundRect(11, 11, w - 22, h - 22, Math.max(4, r - 11)); ctx.stroke();
  // the words, embossed
  const fs = Math.max(20, Math.min(h * 0.24, w * 0.082));
  ctx.font = `700 ${fs}px "Cormorant Garamond", Georgia, serif`;
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  if ("letterSpacing" in ctx) ctx.letterSpacing = `${Math.round(fs * 0.2)}px`;
  const cx = w / 2 + (("letterSpacing" in ctx) ? fs * 0.1 : 0);
  ctx.fillStyle = "rgba(255,244,196,.85)"; ctx.fillText("SAVE THE DATE", cx - 1.2, h / 2 - 1.2);
  ctx.fillStyle = "#6b4308"; ctx.fillText("SAVE THE DATE", cx, h / 2);
  // little sparkles
  const star = (x, y, z) => { ctx.fillStyle = "rgba(255,250,220,.95)"; ctx.beginPath(); ctx.moveTo(x, y - z); ctx.lineTo(x + z * 0.28, y - z * 0.28); ctx.lineTo(x + z, y); ctx.lineTo(x + z * 0.28, y + z * 0.28); ctx.lineTo(x, y + z); ctx.lineTo(x - z * 0.28, y + z * 0.28); ctx.lineTo(x - z, y); ctx.lineTo(x - z * 0.28, y - z * 0.28); ctx.closePath(); ctx.fill(); };
  star(w * 0.1, h * 0.28, 7); star(w * 0.9, h * 0.72, 8); star(w * 0.82, h * 0.2, 5); star(w * 0.17, h * 0.78, 5);
  ctx.restore();
}

export default function ScratchDate() {
  const boxRef = useRef(null);
  const canvasRef = useRef(null);
  const coinRef = useRef(null);
  const [revealed, setRevealed] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const startedRef = useRef(false);

  useEffect(() => {
    if (revealed) return undefined;
    const box = boxRef.current;
    const canvas = canvasRef.current;
    const coin = coinRef.current;
    const ctx = canvas.getContext("2d");
    let w = 0, h = 0, raf = 0, timer = 0, dpr = 1;

    const size = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = box.clientWidth; h = box.clientHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paintFoil(ctx, w, h);
    };
    const ready = (document.fonts && document.fonts.load) ? document.fonts.load('700 30px "Cormorant Garamond"') : Promise.resolve();
    ready.finally(() => { if (!startedRef.current) size(); });
    size();
    const ro = new ResizeObserver(() => { if (!startedRef.current) size(); });
    ro.observe(box);

    // the coin's path: rows sweeping left-right, then right-left, top to bottom
    const pad = 14;
    const rows = Math.max(3, Math.ceil((h - 2 * pad) / (BRUSH * 1.45)));
    const rowLen = () => w - 2 * pad;
    const point = (s) => {
      const L = rowLen() + 24; // a short hop down between rows
      const total = rows * L;
      const u = Math.min(total - 0.001, s * total);
      const row = Math.floor(u / L);
      const within = (u - row * L) / L;
      const sweep = Math.min(1, within / (rowLen() / L));
      const x = pad + (row % 2 === 0 ? sweep : 1 - sweep) * rowLen();
      const baseY = pad + (rows === 1 ? (h - 2 * pad) / 2 : (row * (h - 2 * pad)) / (rows - 1));
      return [x, baseY + Math.sin(u * 0.045) * 5];
    };

    const run = () => {
      startedRef.current = true;
      const t0 = performance.now();
      let prev = point(0);
      box.classList.add("is-scratching");
      const tick = () => {
        const p = Math.min(1, (performance.now() - t0) / SCRATCH_MS);
        const cur = point(p);
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.lineWidth = BRUSH * 2;
        ctx.beginPath(); ctx.moveTo(prev[0], prev[1]); ctx.lineTo(cur[0], cur[1]); ctx.stroke();
        prev = cur;
        coin.style.transform = `translate(${cur[0] - 17}px, ${cur[1] - 17}px) rotate(${Math.sin(p * 40) * 14}deg)`;
        if (p < 1) raf = requestAnimationFrame(tick);
        else { box.classList.remove("is-scratching"); setRevealed(true); }
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !startedRef.current) {
          io.disconnect();
          timer = setTimeout(run, WAIT_MS);
        }
      },
      { threshold: 0.7 }
    );
    io.observe(box);
    return () => { io.disconnect(); ro.disconnect(); clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [revealed]);

  return (
    <div className={`scratch${revealed ? " is-revealed" : ""}`} ref={boxRef} role="img" aria-label={`Save the date: ${DAY} ${MONTH_YEAR}`}>
      <div className="scratch__under">
        <div className="scratch__txt">
          <b className="scratch__day">{DAY}</b>
          <span className="scratch__mon">{MONTH_YEAR}</span>
        </div>
        <i className="scratch__sparks" aria-hidden="true">{Array.from({ length: 16 }, (_, k) => <u key={k} style={{ "--a": `${(k / 16) * 360}deg`, "--r": `${90 + (k % 4) * 26}px` }} />)}</i>
      </div>
      {!revealed && <canvas className="scratch__foil" ref={canvasRef} aria-hidden="true" />}
      {!revealed && (
        <span className="scratch__coin" ref={coinRef} aria-hidden="true">
          <svg viewBox="0 0 34 34"><defs><radialGradient id="coin-g" cx=".35" cy=".3" r=".9"><stop offset="0" stopColor="#fff6c8" /><stop offset=".5" stopColor="#e9c050" /><stop offset="1" stopColor="#a8741a" /></radialGradient></defs>
            <circle cx="17" cy="17" r="15.5" fill="url(#coin-g)" stroke="#7a5210" strokeWidth="1.2" /><circle cx="17" cy="17" r="11" fill="none" stroke="rgba(110,70,10,.55)" strokeWidth="1" />
            <path d="M17 9.5 c2.2 4 4 5.2 7.5 7.5 c-3.5 2.3 -5.3 3.5 -7.5 7.5 c-2.2 -4 -4 -5.2 -7.5 -7.5 c3.5 -2.3 5.3 -3.5 7.5 -7.5Z" fill="rgba(110,70,10,.55)" /></svg>
        </span>
      )}
    </div>
  );
}
