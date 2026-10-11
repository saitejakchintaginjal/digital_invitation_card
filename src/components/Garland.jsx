// Realistic flower garland (toran) for the hero corners.
// A swag of marigolds, roses and jasmine hangs along a curve; strands of flowers
// hang from it and swing like pendulums, with the lower half whipping behind.

const MARIGOLD = ["#f08a1c", "#f5a623", "#f9c22e", "#ff9d2e"];
const ROSE = ["#d6214a", "#e5557f", "#c4163d"];
const JASMINE = ["#fffdf5"];

// small seeded RNG so each side looks different but is stable between renders
function rng(seed) {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Shared flower shapes, drawn once (referenced with <use>, coloured via CSS `color`).
export function GarlandDefs() {
  return (
    <>
      <g id="fl-m">
        {Array.from({ length: 12 }, (_, k) => (
          <ellipse key={`o${k}`} cx="0" cy="-6.2" rx="3.7" ry="5.2" transform={`rotate(${k * 30})`} fill="currentColor" stroke="rgba(90,40,0,.25)" strokeWidth=".5" />
        ))}
        {Array.from({ length: 8 }, (_, k) => (
          <ellipse key={`i${k}`} cx="0" cy="-3.6" rx="2.6" ry="3.8" transform={`rotate(${k * 45 + 22})`} fill="currentColor" stroke="rgba(90,40,0,.3)" strokeWidth=".4" />
        ))}
        <circle r="3.2" fill="rgba(255,255,255,.18)" />
        <circle r="1.9" fill="#b45f06" />
      </g>
      <g id="fl-r">
        <circle r="9.5" fill="currentColor" stroke="rgba(70,0,15,.35)" strokeWidth=".6" />
        <path d="M-3 0 a3 3 0 1 1 6 0 a5 5 0 1 1 -10 0 a7 7 0 1 1 14 0" fill="none" stroke="rgba(60,0,10,.5)" strokeWidth=".9" strokeLinecap="round" />
        <ellipse cx="-3.5" cy="-4.5" rx="3" ry="1.8" fill="#fff" opacity=".22" transform="rotate(-35 -3.5 -4.5)" />
      </g>
      <g id="fl-j">
        {Array.from({ length: 5 }, (_, k) => (
          <ellipse key={k} cx="0" cy="-4.6" rx="2.9" ry="4.9" transform={`rotate(${k * 72})`} fill="#fffdf5" stroke="#e3d7b5" strokeWidth=".5" />
        ))}
        <circle r="1.7" fill="#f2c94c" />
      </g>
      <g id="fl-leaf">
        <path d="M0 0 C4 -5 13 -5 18 0 C13 5 4 5 0 0Z" fill="#2f7d3a" stroke="#1f5a28" strokeWidth=".5" />
        <path d="M1 0 H16" stroke="#8fd08a" strokeWidth=".7" opacity=".7" />
      </g>
    </>
  );
}

function pick(arr, r) { return arr[Math.floor(r() * arr.length)]; }

// Build one garland (positions only; React renders it).
function build(seed) {
  const r = rng(seed);
  const P0 = [-10, 6], C = [250, 128], P2 = [530, 4];
  const at = (t) => {
    const u = 1 - t;
    return [u * u * P0[0] + 2 * u * t * C[0] + t * t * P2[0], u * u * P0[1] + 2 * u * t * C[1] + t * t * P2[1]];
  };
  const tangent = (t) => {
    const u = 1 - t;
    const dx = 2 * u * (C[0] - P0[0]) + 2 * t * (P2[0] - C[0]);
    const dy = 2 * u * (C[1] - P0[1]) + 2 * t * (P2[1] - C[1]);
    return (Math.atan2(dy, dx) * 180) / Math.PI;
  };

  // swag flowers
  const N = 32;
  const swag = [];
  const leaves = [];
  const kinds = ["m", "m", "r", "m", "j", "m", "m", "r"];
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1);
    const [x, y] = at(t);
    const kind = kinds[(i + Math.floor(r() * 2)) % kinds.length];
    const color = kind === "m" ? pick(MARIGOLD, r) : kind === "r" ? pick(ROSE, r) : JASMINE[0];
    swag.push({ x: x + (r() - 0.5) * 2, y: y + (r() - 0.5) * 3, kind, color, s: 1.05 + r() * 0.35, rot: r() * 360 });
    const ang = tangent(t);
    leaves.push({ x, y: y + 2, rot: ang + (r() > 0.5 ? 40 : -40) + (r() - 0.5) * 30, s: 0.85 + r() * 0.35 });
  }

  // hanging strands
  const strands = [];
  const M = 9;
  for (let k = 0; k < M; k++) {
    const t = (k + 0.5) / M;
    const [ax, ay] = at(t);
    const len = 70 + r() * 175;
    const flowers = [];
    const tailLeaves = [];
    for (let y = ay + 12, j = 0; y < ay + len; y += 15, j++) {
      const frac = (y - ay) / len;
      const kind = j % 5 === 3 ? "r" : j % 5 === 1 ? "j" : "m";
      const color = kind === "m" ? pick(MARIGOLD.slice(0, 3), r) : kind === "r" ? pick(ROSE, r) : JASMINE[0];
      flowers.push({ x: ax + (r() - 0.5) * 2, y, kind, color, s: 1.05 - frac * 0.35, rot: r() * 360, tail: frac > 0.5 });
      if (j % 2 === 0) tailLeaves.push({ x: ax, y: y + 3, rot: (j % 4 === 0 ? 20 : 160) + (r() - 0.5) * 40, s: 0.6, tail: frac > 0.5 });
    }
    strands.push({
      ax, ay, len, flowers, tailLeaves,
      end: ay + len + 6,
      amp: 1.6 + r() * 2.4,
      amp2: 2.5 + r() * 3,
      dur: 3.4 + r() * 2.6,
      ph: r() * 6,
    });
  }
  return { swag, leaves, strands };
}

function Flower({ f }) {
  return <use href={`#fl-${f.kind}`} style={{ color: f.color }} transform={`translate(${f.x.toFixed(1)} ${f.y.toFixed(1)}) rotate(${f.rot.toFixed(0)}) scale(${f.s.toFixed(2)})`} />;
}
function Leaf({ l }) {
  return <use href="#fl-leaf" transform={`translate(${l.x.toFixed(1)} ${l.y.toFixed(1)}) rotate(${l.rot.toFixed(0)}) scale(${l.s.toFixed(2)})`} />;
}

function Tassel({ x, y }) {
  return (
    <g>
      <circle cx={x} cy={y} r="3.4" fill="url(#gold)" stroke="#8a5a14" strokeWidth=".6" />
      {[-6, -3, 0, 3, 6].map((dx) => (
        <g key={dx}>
          <path d={`M${x} ${y + 3} Q${x + dx * 0.6} ${y + 10} ${x + dx} ${y + 17}`} stroke="#d4a437" strokeWidth="1.1" fill="none" strokeLinecap="round" />
          <circle cx={x + dx} cy={y + 18} r="1.5" fill="#f7e08a" />
        </g>
      ))}
    </g>
  );
}

export default function Garland({ side }) {
  const g = build(side === "l" ? 11 : 47);
  return (
    <svg className={`garland garland--${side}`} viewBox="0 0 520 400" aria-hidden="true">
      {/* swag */}
      <g className="g-main">
        <path d="M-10 6 Q250 128 530 4" fill="none" stroke="#5b4a1a" strokeWidth="3" />
        {g.leaves.map((l, i) => <Leaf key={`l${i}`} l={l} />)}
        {g.swag.map((f, i) => <Flower key={`s${i}`} f={f} />)}
      </g>

      {/* hanging strands */}
      <g>
        {g.strands.map((s, i) => {
          const head = s.flowers.filter((f) => !f.tail);
          const tail = s.flowers.filter((f) => f.tail);
          return (
            <g key={i} className="strand" style={{ "--i": i, "--amp": `${s.amp}deg`, "--dur": `${s.dur}s`, "--ph": `${s.ph}s` }}>
              <path d={`M${s.ax} ${s.ay} V${s.end}`} stroke="#5b4a1a" strokeWidth="1.2" />
              {s.tailLeaves.filter((l) => !l.tail).map((l, j) => <Leaf key={`hl${j}`} l={l} />)}
              {head.map((f, j) => <Flower key={`h${j}`} f={f} />)}
              <g className="strand__tail" style={{ "--amp2": `${s.amp2}deg`, "--dur": `${s.dur * 0.85}s` }}>
                {s.tailLeaves.filter((l) => l.tail).map((l, j) => <Leaf key={`tl${j}`} l={l} />)}
                {tail.map((f, j) => <Flower key={`t${j}`} f={f} />)}
                <Tassel x={s.ax} y={s.end} />
              </g>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
