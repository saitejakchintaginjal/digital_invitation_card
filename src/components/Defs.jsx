import BlossomDefs from "./Blossoms.jsx";

export default function Defs() {
  return (
    <>
<svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
  <defs>
    <clipPath id="heart-clip" clipPathUnits="objectBoundingBox"><path d="M.5 1 C.12 .72 0 .5 0 .29 C0 .1 .12 0 .27 0 C.39 0 .46 .06 .5 .16 C.54 .06 .61 0 .73 0 C.88 0 1 .1 1 .29 C1 .5 .88 .72 .5 1Z"/></clipPath>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#f7e08a"/><stop offset=".5" stopColor="#d4a437"/><stop offset="1" stopColor="#9c6d12"/>
    </linearGradient>
    <radialGradient id="eye" cx=".5" cy=".5" r=".5">
      <stop offset="0" stopColor="#1c3f8a"/><stop offset=".45" stopColor="#17a08a"/><stop offset="1" stopColor="#d4a437"/>
    </radialGradient>
    <linearGradient id="heart-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#ff7aa2" /><stop offset=".55" stopColor="#e5265a" /><stop offset="1" stopColor="#a50f33" />
    </linearGradient>
    <BlossomDefs />
    <linearGradient id="brass-h" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#7a5412" /><stop offset=".18" stopColor="#c8962c" /><stop offset=".34" stopColor="#fff0a8" /><stop offset=".52" stopColor="#d9a63a" /><stop offset=".8" stopColor="#9a6a16" /><stop offset="1" stopColor="#5e3e0a" />
    </linearGradient>
    <linearGradient id="brass-v" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f3d27a" /><stop offset="1" stopColor="#8a5d12" /></linearGradient>
    <radialGradient id="brass-ball" cx=".35" cy=".3" r=".85"><stop offset="0" stopColor="#fff3b8" /><stop offset=".5" stopColor="#d6a232" /><stop offset="1" stopColor="#7a5210" /></radialGradient>
    <linearGradient id="brass-in" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2a1804" /><stop offset="1" stopColor="#6b4a10" /></linearGradient>
    <g id="lotus">
      <path d="M0 0 C-30 -10 -42 -40 -30 -70 C-12 -50 -4 -30 0 0Z" fill="#f4a6c0"/>
      <path d="M0 0 C30 -10 42 -40 30 -70 C12 -50 4 -30 0 0Z" fill="#f4a6c0"/>
      <path d="M0 0 C-48 -2 -70 -25 -66 -52 C-40 -44 -14 -28 0 0Z" fill="#ee86a8"/>
      <path d="M0 0 C48 -2 70 -25 66 -52 C40 -44 14 -28 0 0Z" fill="#ee86a8"/>
      <path d="M0 0 C-14 -30 -14 -70 0 -98 C14 -70 14 -30 0 0Z" fill="#fbc9d9" stroke="#ee86a8" strokeWidth="1.5"/>
      <circle cx="0" cy="-30" r="5" fill="#f7d35c"/>
    </g>
    <path id="flourish" d="M0 0 C40 0 70 10 90 40 C70 30 45 28 25 40 C40 45 50 55 50 70 C35 55 20 50 0 50Z" fill="none" stroke="url(#gold)" strokeWidth="2"/>
    <pattern id="jaali" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M30 4 L56 30 L30 56 L4 30Z M30 18 L42 30 L30 42 L18 30Z" fill="none" stroke="#d4a437" strokeWidth="1" opacity=".35"/>
      <circle cx="30" cy="30" r="2" fill="#d4a437" opacity=".4"/>
    </pattern>
  </defs>
</svg>
    </>
  );
}
