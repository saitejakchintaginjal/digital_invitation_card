import { useEffect, useRef, useState } from "react";
import { DAYS } from "../config.js";

/*
  "Save the date" scratch card. A gold foil with "SAVE THE DATE" covers the date; when the card scrolls into view
  water droplets fall on it one by one and slowly wash the foil away until the date shows. The date then grows big.
  (Visitors who prefer reduced motion just see the date.)
*/
const WAIT_MS = 1700;     // after the card comes into view
const DROPS_MS = 7500;    // how long the water takes to wash the foil away

const d = new Date(`${DAYS[0].date}T00:00:00`);
const DAY = d.getDate();
const MONTH_YEAR = d.toLocaleDateString("en-IN", { month: "long", year: "numeric" });

function paintFoil(ctx, w, h) {
  ctx.globalCompositeOperation = "source-over";
  ctx.clearRect(0, 0, w, h);
  // heart outline (unit square), scaled to the card
  const heart = (inset = 0) => {
    const x0 = inset, y0 = inset, X = w - 2 * inset, Y = h - 2 * inset;
    const P = (a, b) => [x0 + a * X, y0 + b * Y];
    ctx.beginPath();
    ctx.moveTo(...P(0.5, 1));
    ctx.bezierCurveTo(...P(0.12, 0.72), ...P(0, 0.5), ...P(0, 0.29));
    ctx.bezierCurveTo(...P(0, 0.1), ...P(0.12, 0), ...P(0.27, 0));
    ctx.bezierCurveTo(...P(0.39, 0), ...P(0.46, 0.06), ...P(0.5, 0.16));
    ctx.bezierCurveTo(...P(0.54, 0.06), ...P(0.61, 0), ...P(0.73, 0));
    ctx.bezierCurveTo(...P(0.88, 0), ...P(1, 0.1), ...P(1, 0.29));
    ctx.bezierCurveTo(...P(1, 0.5), ...P(0.88, 0.72), ...P(0.5, 1));
    ctx.closePath();
  };
  const arch = (inset) => heart(inset);
  ctx.save();
  arch(0);
  ctx.clip();
  // rose-gold foil
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, "#c98a76"); g.addColorStop(0.25, "#f6d6c4"); g.addColorStop(0.5, "#dca08a"); g.addColorStop(0.72, "#fde8da"); g.addColorStop(1, "#c07f6b");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  // diamond lattice with a dot at each crossing
  const step = 26;
  ctx.strokeStyle = "rgba(125,50,45,.2)"; ctx.lineWidth = 1;
  ctx.beginPath();
  for (let k = -h; k < w + h; k += step) { ctx.moveTo(k, 0); ctx.lineTo(k + h, h); ctx.moveTo(k, 0); ctx.lineTo(k - h, h); }
  ctx.stroke();
  ctx.fillStyle = "rgba(255,240,225,.55)";
  for (let x = 0; x < w + step; x += step) for (let y = 0; y < h + step; y += step) { ctx.beginPath(); ctx.arc(x, y, 1.6, 0, 6.283); ctx.fill(); }
  // glitter
  for (let i = 0; i < Math.round((w * h) / 120); i++) {
    ctx.fillStyle = Math.random() < 0.5 ? "rgba(255,248,235,.45)" : "rgba(120,60,40,.2)";
    ctx.fillRect(Math.random() * w, Math.random() * h, 1.2, 1.2);
  }
  // diagonal sheen
  const s = ctx.createLinearGradient(0, 0, w, 0);
  s.addColorStop(0, "rgba(255,255,255,0)"); s.addColorStop(0.5, "rgba(255,255,255,.3)"); s.addColorStop(1, "rgba(255,255,255,0)");
  ctx.save(); ctx.translate(w * 0.25, 0); ctx.rotate(0.35); ctx.fillStyle = s; ctx.fillRect(0, -h, w * 0.3, h * 3); ctx.restore();
  // double arch frame
  ctx.strokeStyle = "rgba(122,18,48,.75)"; ctx.lineWidth = 2; arch(h * 0.045); ctx.stroke();
  ctx.strokeStyle = "rgba(255,244,230,.8)"; ctx.lineWidth = 1; arch(h * 0.065); ctx.stroke();
  // lotus-bud ornament above the words
  const cx0 = w / 2, oy = h * 0.2;
  ctx.fillStyle = "#7a1230";
  [[0, -9, 0], [-9, -5, -50], [9, -5, 50]].forEach(([dx, dy, rot]) => { ctx.save(); ctx.translate(cx0 + dx, oy + dy + 9); ctx.rotate((rot * Math.PI) / 180); ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(-5, -9, 0, -17); ctx.quadraticCurveTo(5, -9, 0, 0); ctx.fill(); ctx.restore(); });
  ctx.fillRect(cx0 - 34, oy + 12, 24, 1.4); ctx.fillRect(cx0 + 10, oy + 12, 24, 1.4);
  // the words, embossed, on two lines
  const fs = Math.max(20, Math.min(h * 0.13, w * 0.075));
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  const ls = "letterSpacing" in ctx;
  ctx.font = "700 " + fs + 'px "Cormorant Garamond", Georgia, serif';
  if (ls) ctx.letterSpacing = Math.round(fs * 0.28) + "px";
  const tx = w / 2 + (ls ? fs * 0.14 : 0);
  [["SAVE THE", h * 0.4], ["DATE", h * 0.4 + fs * 1.2]].forEach(([t, y]) => {
    ctx.fillStyle = "rgba(255,244,230,.9)"; ctx.fillText(t, tx - 1.2, y - 1.2);
    ctx.fillStyle = "#6e0f2a"; ctx.fillText(t, tx, y);
  });
  if (ls) ctx.letterSpacing = "0px";
  // little sparkles
  const star = (x, y, z) => { ctx.fillStyle = "rgba(255,252,240,.95)"; ctx.beginPath(); ctx.moveTo(x, y - z); ctx.lineTo(x + z * 0.28, y - z * 0.28); ctx.lineTo(x + z, y); ctx.lineTo(x + z * 0.28, y + z * 0.28); ctx.lineTo(x, y + z); ctx.lineTo(x - z * 0.28, y + z * 0.28); ctx.lineTo(x - z, y); ctx.lineTo(x - z * 0.28, y - z * 0.28); ctx.closePath(); ctx.fill(); };
  star(w * 0.16, h * 0.3, 7); star(w * 0.84, h * 0.22, 6); star(w * 0.78, h * 0.55, 5); star(w * 0.3, h * 0.66, 5);
  ctx.restore();
}

export default function ScratchDate() {
  const boxRef = useRef(null);
  const canvasRef = useRef(null);
  const fxRef = useRef(null);
  const [revealed, setRevealed] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const startedRef = useRef(false);
  useEffect(() => { if (revealed) window.dispatchEvent(new Event("scratch:revealed")); }, [revealed]);

  useEffect(() => {
    if (revealed) return undefined;
    const box = boxRef.current;
    const canvas = canvasRef.current;
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

    // water droplets fall from above onto random spots (a shuffled grid, so the whole heart gets wet); each splash
    // slowly spreads and washes the foil away, one spot at a time
    const UP = 110; // the effects canvas reaches this far above the card, where the drops start
    const inHeart = (x, y) => { const u = ((x / w) - 0.5) * 2.7, v = 1.3 - (y / h) * 2.5; return Math.pow(u * u + v * v - 1, 3) - u * u * v * v * v <= 0.12; };
    const buildDrops = () => {
      const step = 40, cols = Math.ceil(w / step), rowsN = Math.ceil(h / step), cells = [];
      for (let r = 0; r < rowsN; r++) for (let c = 0; c < cols; c++) {
        const x = (c + 0.5) * step + (Math.random() - 0.5) * 18, y = (r + 0.5) * step + (Math.random() - 0.5) * 18;
        if (inHeart(x, y)) cells.push({ x, y });
      }
      for (let i = cells.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [cells[i], cells[j]] = [cells[j], cells[i]]; }
      const span = DROPS_MS - 1500;
      return cells.map((c, i) => ({ ...c, land: 900 + (i / cells.length) * span + Math.random() * 120, R: 38 + Math.random() * 8, size: 0.85 + Math.random() * 0.45 }));
    };
    const drawDrop = (fx, x, y, k) => {
      fx.save(); fx.translate(x, y); fx.scale(k, k);
      fx.beginPath(); fx.moveTo(0, -11); fx.bezierCurveTo(2, -6, 5.2, -1.5, 5.2, 2); fx.arc(0, 2, 5.2, 0, Math.PI, false); fx.bezierCurveTo(-5.2, -1.5, -2, -6, 0, -11); fx.closePath();
      const g = fx.createLinearGradient(-5, -6, 5, 7); g.addColorStop(0, "rgba(214,240,255,.95)"); g.addColorStop(0.6, "rgba(120,190,245,.9)"); g.addColorStop(1, "rgba(60,130,215,.92)");
      fx.fillStyle = g; fx.fill(); fx.strokeStyle = "rgba(40,100,180,.55)"; fx.lineWidth = 0.7; fx.stroke();
      fx.fillStyle = "rgba(255,255,255,.85)"; fx.beginPath(); fx.ellipse(-1.8, 0, 1.1, 2.4, 0.2, 0, 6.283); fx.fill();
      fx.restore();
    };

    const run = () => {
      startedRef.current = true;
      box.classList.add("is-scratching");
      const fxc = fxRef.current, fx = fxc.getContext("2d");
      fxc.width = Math.round(w * dpr); fxc.height = Math.round((h + UP) * dpr);
      const drops = buildDrops();
      const t0 = performance.now();
      const FALL = 620;
      const tick = () => {
        const t = performance.now() - t0;
        fx.setTransform(dpr, 0, 0, dpr, 0, 0); fx.clearRect(0, 0, w, h + UP);
        ctx.globalCompositeOperation = "destination-out";
        let live = false;
        for (const d of drops) {
          const since = t - d.land;
          if (since < -FALL) { live = true; continue; }
          if (since < 0) { // falling, speeding up
            const f = (since + FALL) / FALL;
            drawDrop(fx, d.x, UP + d.y - (1 - f * f) * (d.y + UP - 14), d.size); live = true;
          } else if (since < 1500) { // splash ring and a spreading wet spot
            live = true;
            const e = 1 - Math.pow(1 - since / 1500, 2.2), r = d.R * e;
            const gr = ctx.createRadialGradient(d.x, d.y, r * 0.55, d.x, d.y, r + 0.01);
            gr.addColorStop(0, "rgba(0,0,0,.34)"); gr.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(d.x, d.y, r + 1, 0, 6.283); ctx.fill();
            if (since < 700) {
              const q = since / 700;
              fx.strokeStyle = `rgba(120,190,245,${0.8 * (1 - q)})`; fx.lineWidth = 1.6 * (1 - q) + 0.4;
              fx.beginPath(); fx.ellipse(d.x, UP + d.y, 4 + q * 20, (4 + q * 20) * 0.45, 0, 0, 6.283); fx.stroke();
            }
          }
        }
        if (live && t < DROPS_MS + 800) raf = requestAnimationFrame(tick);
        else {
          fx.clearRect(0, 0, w, h + UP);
          canvas.style.transition = "opacity .9s ease"; canvas.style.opacity = "0";
          timer = setTimeout(() => { box.classList.remove("is-scratching"); setRevealed(true); }, 900);
        }
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
        <span className="scratch__bg" aria-hidden="true" />
        <div className="scratch__txt">
          <b className="scratch__day">{DAY}</b>
          <span className="scratch__mon">{MONTH_YEAR}</span>
        </div>
        <i className="scratch__sparks" aria-hidden="true">{Array.from({ length: 16 }, (_, k) => <u key={k} style={{ "--a": `${(k / 16) * 360}deg`, "--r": `${90 + (k % 4) * 26}px` }} />)}</i>
      </div>
      <svg className="scratch__rim" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path vectorEffect="non-scaling-stroke" d="M50 100 C12 72 0 50 0 29 C0 10 12 0 27 0 C39 0 46 6 50 16 C54 6 61 0 73 0 C88 0 100 10 100 29 C100 50 88 72 50 100Z" /></svg>
      {!revealed && <canvas className="scratch__foil" ref={canvasRef} aria-hidden="true" />}
      {!revealed && <canvas className="scratch__fx" ref={fxRef} aria-hidden="true" />}
    </div>
  );
}
