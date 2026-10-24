import { useEffect, useRef } from "react";

/*
  Fireworks over the countdown sky (canvas, drawn only while the section is on screen).
  Rockets rise with a glowing trail, then burst as one of: peony (round), ring, willow (long drooping gold)
  or crackle (a burst that pops again into tiny sparks). Sparks fall with gravity and fade.
*/
const PALETTES = [
  ["#ffd36b", "#ffb347", "#fff1b8"],        // gold
  ["#ff7aa2", "#ff4f81", "#ffc2d4"],        // rose
  ["#ff9a4d", "#ff6a2a", "#ffd0a0"],        // sunset orange
  ["#ffe7a0", "#ffffff", "#f7c948"],        // champagne
  ["#c58bff", "#8f6bff", "#e5d0ff"],        // violet
  ["#7fe0ff", "#4fb8ff", "#d4f3ff"],        // sky
];
const rand = (a, b) => a + Math.random() * (b - a);
const pick = (a) => a[Math.floor(Math.random() * a.length)];

export default function Fireworks() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const section = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    if (!ctx || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let W = 0, H = 0, horizon = 0, dpr = 1;
    let rockets = [], sparks = [];
    let raf = 0, last = 0, nextLaunch = 0, running = false;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = section.clientWidth; H = section.clientHeight;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      const scene = section.querySelector(".cd-scene-wrap");
      horizon = H - (scene ? scene.offsetHeight : H * 0.4) * 0.5; // the palace sits on this line
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const launch = () => {
      const x = rand(W * 0.08, W * 0.92);
      const topY = rand(H * 0.1, Math.max(H * 0.16, horizon * 0.62));
      rockets.push({ x, y: horizon - 8, tx: x + rand(-40, 40), ty: topY, vy: -rand(380, 520), color: pick(PALETTES), trail: [] });
    };

    const burst = (x, y, palette) => {
      const kind = pick(["peony", "peony", "ring", "willow", "crackle", "willow"]);
      const n = Math.round(rand(90, 130) * (W < 500 ? 0.8 : 1));
      const speed = rand(150, 230) * (W < 500 ? 0.85 : 1.45);
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + rand(-0.05, 0.05);
        let v = kind === "ring" ? speed : speed * rand(0.5, 1);
        if (kind === "ring") v *= rand(0.96, 1.04);
        sparks.push({
          x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v,
          life: 1, decay: kind === "willow" ? rand(0.18, 0.28) : rand(0.34, 0.6),
          g: kind === "willow" ? 70 : 95, drag: kind === "willow" ? 0.985 : 0.975, size: rand(1.1, 2.0),
          color: kind === "willow" ? "#ffd36b" : pick(palette), crackle: kind === "crackle" && Math.random() < 0.35, twinkle: Math.random() < 0.4,
        });
      }
      // soft flash at the centre
      sparks.push({ x, y, vx: 0, vy: 0, life: 1, decay: 4, g: 0, drag: 1, size: 18, color: "#fff6d8", flash: true });
    };

    const step = (t) => {
      raf = requestAnimationFrame(step);
      const dt = Math.min(0.05, (t - last) / 1000 || 0.016);
      last = t;
      // fade the previous frame to leave trails (the canvas stays transparent)
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.22)";
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";

      if (t > nextLaunch) {
        launch();
        if (Math.random() < 0.4) setTimeout(launch, rand(150, 420));
        nextLaunch = t + rand(650, 1500);
      }

      rockets = rockets.filter((r) => {
        r.y += r.vy * dt; r.x += ((r.tx - r.x) * 0.9) * dt; r.vy *= 0.992;
        r.trail.push([r.x, r.y]); if (r.trail.length > 12) r.trail.shift();
        for (let i = 0; i < r.trail.length; i++) {
          const [px, py] = r.trail[i];
          ctx.globalAlpha = (i / r.trail.length) * 0.8;
          ctx.fillStyle = "#ffe7a8";
          ctx.beginPath(); ctx.arc(px, py, 1.7 * (i / r.trail.length) + 0.4, 0, 7); ctx.fill();
        }
        ctx.globalAlpha = 1;
        if (r.y <= r.ty || r.vy > -90) { burst(r.x, r.y, r.color); return false; }
        return true;
      });

      const born = [];
      sparks = sparks.filter((s) => {
        s.life -= s.decay * dt;
        if (s.life <= 0) {
          if (s.crackle) for (let k = 0; k < 7; k++) { const a = rand(0, 7), v = rand(25, 70); born.push({ x: s.x, y: s.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 1, decay: rand(1.4, 2.2), g: 60, drag: 0.96, size: 1.1, color: "#fff2c4", twinkle: true }); }
          return false;
        }
        s.vx *= s.drag; s.vy = s.vy * s.drag + s.g * dt; s.x += s.vx * dt; s.y += s.vy * dt;
        if (s.flash) {
          const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * (1.6 - s.life));
          g.addColorStop(0, "rgba(255,246,216,.55)"); g.addColorStop(1, "rgba(255,246,216,0)");
          ctx.globalAlpha = s.life; ctx.fillStyle = g; ctx.fillRect(s.x - 40, s.y - 40, 80, 80); ctx.globalAlpha = 1;
          return true;
        }
        ctx.globalAlpha = 0.92 * Math.max(0, s.life) * (s.twinkle && Math.random() < 0.3 ? 0.35 : 1);
        ctx.fillStyle = s.color;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.size * (0.5 + s.life * 0.5), 0, 7); ctx.fill();
        return true;
      });
      ctx.globalAlpha = 1;
      if (born.length) sparks.push(...born);
      if (sparks.length > 900) sparks.splice(0, sparks.length - 900);
    };

    const start = () => { if (running) return; running = true; resize(); last = performance.now(); nextLaunch = last + 400; raf = requestAnimationFrame(step); };
    const stop = () => { running = false; cancelAnimationFrame(raf); rockets = []; sparks = []; ctx.clearRect(0, 0, W, H); };

    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0.12 });
    io.observe(section);
    const ro = new ResizeObserver(() => { if (running) resize(); });
    ro.observe(section);
    return () => { io.disconnect(); ro.disconnect(); stop(); };
  }, []);

  return <canvas ref={ref} className="fireworks" aria-hidden="true" />;
}
