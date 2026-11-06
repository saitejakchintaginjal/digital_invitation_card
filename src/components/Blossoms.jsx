// Realistic flowers drawn in SVG (shaded petals, layered rings, soft highlights), defined once in <Defs />
// and reused with <use href="#bl-..."/> for the flower shower and the hanging decorations.
// Every flower is centred on (0,0) with a radius of about 15.

const ring = (n, cy, rx, ry, rot, fill, key, stroke = "rgba(110,50,0,.3)") =>
  Array.from({ length: n }, (_, k) => (
    <ellipse key={`${key}${k}`} cx="0" cy={cy} rx={rx} ry={ry} fill={fill} stroke={stroke} strokeWidth=".3" transform={`rotate(${rot + (k * 360) / n})`} />
  ));

/* marigold: three ruffled rings of petals, deep at the base, bright at the tips */
function Marigold({ id, base, mid, tip }) {
  return (
    <>
      <linearGradient id={`${id}-p`} x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stopColor={base} /><stop offset=".5" stopColor={mid} /><stop offset="1" stopColor={tip} />
      </linearGradient>
      <radialGradient id={`${id}-c`} cx=".4" cy=".35" r=".8">
        <stop offset="0" stopColor={mid} /><stop offset="1" stopColor={base} />
      </radialGradient>
      <g id={id}>
        
        {ring(15, -9.4, 4.3, 6.4, 0, `url(#${id}-p)`, "o")}
        {ring(12, -6.6, 3.6, 5.2, 15, `url(#${id}-p)`, "m")}
        {ring(9, -4, 2.9, 3.9, 8, `url(#${id}-p)`, "i")}
        <circle r="4.6" fill={`url(#${id}-c)`} stroke="rgba(110,50,0,.35)" strokeWidth=".3" />
        {Array.from({ length: 7 }, (_, k) => <circle key={k} cx={Math.cos((k / 7) * 6.283) * 2} cy={Math.sin((k / 7) * 6.283) * 2} r=".55" fill={tip} opacity=".75" />)}
        <ellipse cx="-4" cy="-6" rx="4" ry="1.5" fill="#fff" opacity=".16" transform="rotate(-35 -4 -6)" />
      </g>
    </>
  );
}

/* rose seen from above: overlapping petals spiralling in to a dark heart */
function Rose({ id, edge, mid, deep }) {
  const blob = (n, r, rx, ry, rot, key) =>
    Array.from({ length: n }, (_, k) => (
      <ellipse key={`${key}${k}`} cx="0" cy={-r} rx={rx} ry={ry} fill={`url(#${id}-p)`} stroke="rgba(70,0,20,.4)" strokeWidth=".35" transform={`rotate(${rot + (k * 360) / n})`} />
    ));
  return (
    <>
      <radialGradient id={`${id}-p`} cx=".5" cy=".3" r=".85">
        <stop offset="0" stopColor={edge} /><stop offset=".6" stopColor={mid} /><stop offset="1" stopColor={deep} />
      </radialGradient>
      <g id={id}>
        <circle r="11" fill={deep} />
        {blob(6, 8.6, 6.6, 6, 0, "a")}
        {blob(5, 5.4, 5.2, 4.6, 24, "b")}
        {blob(4, 3, 3.6, 3.2, 10, "c")}
        <path d="M-2.2 0 a2.2 2.2 0 1 1 4.4 0 a3.6 3.6 0 1 1 -7.2 0 a5.2 5.2 0 1 1 10.4 0" fill="none" stroke={deep} strokeWidth=".7" strokeLinecap="round" />
        <circle r="1.2" fill={deep} />
        <ellipse cx="-4.5" cy="-6" rx="4" ry="1.8" fill="#fff" opacity=".22" transform="rotate(-35 -4.5 -6)" />
      </g>
    </>
  );
}

/* jasmine (mogra): slender white petals with a pale yellow heart */
function Jasmine() {
  const petal = "M0 0 C-3.2 -4 -3.8 -10 0 -15 C3.8 -10 3.2 -4 0 0Z";
  return (
    <>
      <linearGradient id="bl-jas-p" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stopColor="#e9e1c8" /><stop offset=".45" stopColor="#fffdf6" /><stop offset="1" stopColor="#ffffff" />
      </linearGradient>
      <g id="bl-jasmine">
        {Array.from({ length: 6 }, (_, k) => <path key={`b${k}`} d={petal} fill="url(#bl-jas-p)" stroke="#d9cfae" strokeWidth=".35" transform={`rotate(${k * 60 + 30}) scale(.92)`} opacity=".92" />)}
        {Array.from({ length: 6 }, (_, k) => <path key={`f${k}`} d={petal} fill="url(#bl-jas-p)" stroke="#d9cfae" strokeWidth=".35" transform={`rotate(${k * 60})`} />)}
        <circle r="2.4" fill="#e6d27c" stroke="#b9a24a" strokeWidth=".3" />
        <circle r="1" fill="#c9b24d" />
      </g>
    </>
  );
}

/* a loose rose petal */
function Petal({ id, light, deep }) {
  return (
    <>
      <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={light} /><stop offset="1" stopColor={deep} />
      </linearGradient>
      <g id={id}>
        <path d="M0 11 C-9 7 -11 -5 -1 -12 C0 -9 2 -9 3 -12 C11 -5 9 7 0 11Z" fill={`url(#${id}-g)`} stroke="rgba(90,0,30,.35)" strokeWidth=".4" />
        <path d="M0 9 C-1 3 -1 -3 0 -8" fill="none" stroke="rgba(90,0,30,.28)" strokeWidth=".5" />
        <ellipse cx="-3" cy="-3" rx="2.2" ry="5" fill="#fff" opacity=".2" transform="rotate(12 -3 -3)" />
      </g>
    </>
  );
}

export default function BlossomDefs() {
  return (
    <>
      <Marigold id="bl-marigold" base="#c25400" mid="#ff9a1a" tip="#ffd34a" />
      <Marigold id="bl-marigold2" base="#d37a00" mid="#ffb81f" tip="#ffe978" />
      <Rose id="bl-rose" edge="#ff8aa4" mid="#e23a62" deep="#9c0f33" />
      <Rose id="bl-rose2" edge="#ffc4d2" mid="#f27a9c" deep="#c23a62" />
      <Jasmine />
      <Petal id="bl-petal" light="#ff9bb5" deep="#d93a66" />
      <Petal id="bl-petal2" light="#ffd2dc" deep="#f08aa6" />
    </>
  );
}

export const BLOSSOM_IDS = ["bl-marigold", "bl-marigold2", "bl-rose", "bl-rose2", "bl-jasmine", "bl-petal", "bl-petal2", "bl-marigold", "bl-jasmine", "bl-petal"];
