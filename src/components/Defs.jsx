import { PeacockDefs } from "./Peacock.jsx";
import { GarlandDefs } from "./Garland.jsx";

export default function Defs() {
  return (
    <>
<svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
  <defs>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#f7e08a"/><stop offset=".5" stopColor="#d4a437"/><stop offset="1" stopColor="#9c6d12"/>
    </linearGradient>
    <radialGradient id="eye" cx=".5" cy=".5" r=".5">
      <stop offset="0" stopColor="#1c3f8a"/><stop offset=".45" stopColor="#17a08a"/><stop offset="1" stopColor="#d4a437"/>
    </radialGradient>
    <PeacockDefs />
    <GarlandDefs />
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
