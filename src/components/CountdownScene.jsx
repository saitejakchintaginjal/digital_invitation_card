// Dusk scene for the countdown: a palace across a still pond, lotuses on lily pads,
// floating diyas and two caparisoned elephants, backlit by the horizon glow.
// Everything is drawn in a 1000x600 box; the horizon sits at y = 300.

const PETAL = "M0 0 C-15 -10 -17 -38 0 -64 C17 -38 15 -10 0 0Z";

// [x, y, scale, rotation, delay]
const BLOOMS = [
  [500, 524, 1.2, 0, 0],
  [418, 482, 0.82, -7, -1.2],
  [588, 490, 0.9, 6, -2.1],
  [338, 548, 0.78, -4, -3],
  [668, 552, 0.74, 5, -0.6],
];
const BUDS = [[455, 470, 0.7], [548, 462, 0.62], [372, 520, 0.6], [632, 520, 0.6]];
const PADS = [[500, 540, 1.3], [418, 500, 1], [590, 508, 1.05], [338, 560, 0.9], [668, 565, 0.85], [455, 552, 0.8], [548, 556, 0.8], [260, 575, 0.9], [740, 578, 0.9]];
// [x, y, scale, drift-duration]
const DIYAS = [
  [455, 352, 0.38, 7], [548, 357, 0.4, 8], [330, 392, 0.55, 9], [672, 388, 0.55, 6.5], [500, 402, 0.6, 7.5],
  [405, 568, 0.95, 8.5], [618, 566, 1, 7], [250, 548, 0.8, 9.5], [752, 550, 0.8, 8],
];
const WINDOWS = [[392, 272], [414, 272], [436, 272], [558, 272], [580, 272], [602, 272], [488, 252], [508, 252], [488, 280], [508, 280], [348, 268], [650, 268]];
const RIPPLES = [[500, 548, 90, 14], [420, 505, 60, 9], [592, 512, 64, 9], [190, 492, 70, 9], [310, 494, 50, 7], [810, 492, 70, 9], [690, 494, 50, 7], [405, 570, 52, 8], [618, 568, 56, 8]];

export default function CountdownScene() {
  return (
    <svg className="cd-scene" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <radialGradient id="cd-glow" cx="500" cy="300" r="520" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffd08a" stopOpacity=".95" />
          <stop offset=".18" stopColor="#ff9a4d" stopOpacity=".75" />
          <stop offset=".5" stopColor="#d0463f" stopOpacity=".35" />
          <stop offset="1" stopColor="#6b1530" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cd-water" x1="0" y1="300" x2="0" y2="600" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#c0603c" />
          <stop offset=".2" stopColor="#843046" />
          <stop offset=".55" stopColor="#3a1022" />
          <stop offset="1" stopColor="#1a0812" />
        </linearGradient>
        <linearGradient id="cd-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".9" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="cd-refmask" maskUnits="userSpaceOnUse" x="0" y="300" width="1000" height="300">
          <rect x="0" y="300" width="1000" height="200" fill="url(#cd-fade)" />
        </mask>
        <linearGradient id="cd-skyfade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset=".55" stopColor="#fff" stopOpacity="1" /></linearGradient>
        <mask id="cd-skymask" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="305"><rect width="1000" height="305" fill="url(#cd-skyfade)" /></mask>
        <filter id="cd-blur" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="2.2" /></filter>

        {/* lotus petals: pale at the base, deeper pink at the tip */}
        <linearGradient id="pt-back" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="-64">
          <stop offset="0" stopColor="#f7d9e2" /><stop offset=".5" stopColor="#f2a5c0" /><stop offset="1" stopColor="#d9487f" />
        </linearGradient>
        <linearGradient id="pt-mid" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="-64">
          <stop offset="0" stopColor="#fff1ee" /><stop offset=".45" stopColor="#fbc3d4" /><stop offset="1" stopColor="#ea6a9a" />
        </linearGradient>
        <linearGradient id="pt-front" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="-64">
          <stop offset="0" stopColor="#fffaf5" /><stop offset=".5" stopColor="#fdd6e2" /><stop offset="1" stopColor="#f08cb0" />
        </linearGradient>
        <radialGradient id="cd-pad" cx=".4" cy=".4" r=".7">
          <stop offset="0" stopColor="#4a9a4e" /><stop offset=".7" stopColor="#25633a" /><stop offset="1" stopColor="#143d25" />
        </radialGradient>
        <radialGradient id="cd-flame" cx=".5" cy=".7" r=".6">
          <stop offset="0" stopColor="#fffbe0" /><stop offset=".4" stopColor="#ffc247" /><stop offset="1" stopColor="#f2631b" />
        </radialGradient>
        <radialGradient id="cd-dglow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#ffc86b" stopOpacity=".95" /><stop offset=".4" stopColor="#ff9a3c" stopOpacity=".4" /><stop offset="1" stopColor="#ff9a3c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cd-streak" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffc86b" stopOpacity=".6" /><stop offset="1" stopColor="#ffc86b" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="cd-terra" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9783c" /><stop offset="1" stopColor="#7a3216" />
        </linearGradient>
        <linearGradient id="e-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4e3345" /><stop offset=".55" stopColor="#2a1624" /><stop offset="1" stopColor="#150912" />
        </linearGradient>
        <linearGradient id="e-cloth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c4163a" /><stop offset="1" stopColor="#6a0a1f" />
        </linearGradient>

        {/* ---- lotus bloom ---- */}
        <g id="lt-bloom">
          {[-62, -31, 0, 31, 62].map((r) => (
            <path key={`b${r}`} d={PETAL} transform={`rotate(${r}) scale(.78 .92)`} fill="url(#pt-back)" stroke="#c63c76" strokeOpacity=".35" strokeWidth=".7" />
          ))}
          {[-46, -15, 15, 46].map((r) => (
            <path key={`m${r}`} d={PETAL} transform={`rotate(${r}) scale(.88 1)`} fill="url(#pt-mid)" stroke="#d9487f" strokeOpacity=".3" strokeWidth=".7" />
          ))}
          {[-24, 0, 24].map((r) => (
            <g key={`f${r}`} transform={`rotate(${r}) scale(.8 .86)`}>
              <path d={PETAL} fill="url(#pt-front)" stroke="#e0618f" strokeOpacity=".3" strokeWidth=".7" />
              <path d="M0 -6 L0 -50" stroke="#fff" strokeOpacity=".35" strokeWidth=".8" />
            </g>
          ))}
          <ellipse cx="0" cy="-9" rx="8" ry="4" fill="#d9b13a" />
          {[-10, -5, 0, 5, 10].map((x) => <circle key={x} cx={x} cy={-12 - Math.abs(x) * 0.2} r="1.8" fill="#f6d35c" />)}
        </g>
        <g id="lt-bud">
          <path d="M0 0 C-12 -8 -12 -34 0 -50 C12 -34 12 -8 0 0Z" fill="url(#pt-back)" stroke="#d9487f" strokeOpacity=".4" strokeWidth=".7" />
          <path d="M-5 0 C-14 -10 -10 -30 0 -48 C-3 -28 -4 -12 -5 0Z" fill="url(#pt-front)" opacity=".9" />
          <path d="M5 0 C14 -10 10 -30 0 -48 C3 -28 4 -12 5 0Z" fill="url(#pt-mid)" opacity=".9" />
        </g>
        <g id="lt-pad">
          <ellipse rx="36" ry="11" fill="url(#cd-pad)" />
          <path d="M-30 -2 L30 2 M-24 -7 L24 7 M-12 -10 L12 10 M-34 3 L34 -3" stroke="#8fd08a" strokeOpacity=".28" strokeWidth=".8" />
          <ellipse cx="-8" cy="-3" rx="20" ry="4" fill="#9be08f" opacity=".18" />
        </g>

        {/* ---- diya ---- */}
        <g id="dy">
          <circle className="dy-glow" cy="-9" r="30" fill="url(#cd-dglow)" />
          <path d="M-15 0 C-13 10 13 10 15 0 Z" fill="url(#cd-terra)" />
          <ellipse cy="0" rx="15" ry="3.4" fill="#e28a4b" />
          <ellipse cy="-.6" rx="11" ry="2" fill="#5a240e" />
          <path className="dy-flame" d="M0 -2 C-6 -10 -2 -18 0 -25 C2 -18 6 -10 0 -2Z" fill="url(#cd-flame)" />
        </g>

        <ElephantDefs />

        {/* ---- palace (also reused, flipped, as its reflection) ---- */}
        <g id="palace">
          <rect x="352" y="262" width="296" height="38" />
          <rect x="468" y="224" width="64" height="76" />
          <path d="M458 226 Q500 150 542 226Z" />
          <rect x="497" y="140" width="6" height="20" />
          <circle cx="500" cy="138" r="4" />
          <path d="M376 262 Q408 214 440 262Z" /><path d="M560 262 Q592 214 624 262Z" />
          <path d="M440 262 Q470 238 468 262Z" /><path d="M532 262 Q530 238 560 262Z" />
          <rect x="328" y="236" width="16" height="64" /><path d="M324 236 Q336 216 348 236Z" /><rect x="334" y="208" width="4" height="12" />
          <rect x="656" y="236" width="16" height="64" /><path d="M652 236 Q664 216 676 236Z" /><rect x="662" y="208" width="4" height="12" />
          <rect x="356" y="250" width="14" height="12" /><path d="M354 250 Q363 238 372 250Z" />
          <rect x="630" y="250" width="14" height="12" /><path d="M628 250 Q637 238 646 250Z" />
        </g>
      </defs>

      {/* horizon glow */}
      <rect x="0" y="0" width="1000" height="305" fill="url(#cd-glow)" mask="url(#cd-skymask)" />

      {/* far hills + palace */}
      <path d="M0 300 L0 268 C70 252 130 276 200 284 C250 290 300 298 336 300Z" fill="#26091a" />
      <path d="M1000 300 L1000 268 C930 252 870 276 800 284 C750 290 700 298 664 300Z" fill="#26091a" />
      <g fill="#2a0b1d"><use href="#palace" /></g>
      <g fill="#ffd27a">
        {WINDOWS.map(([x, y], i) => (
          <rect key={i} className="cd-win" x={x} y={y} width="5" height="9" rx="2.5" style={{ "--d": `${(i * 0.7) % 4}s` }} />
        ))}
      </g>

      {/* water */}
      <rect x="0" y="300" width="1000" height="300" fill="url(#cd-water)" />
      <g mask="url(#cd-refmask)" opacity=".5" filter="url(#cd-blur)">
        <g fill="#2a0b1d" transform="translate(0 600) scale(1 -1)"><use href="#palace" /></g>
      </g>
      {/* glittering horizon reflection */}
      <g className="cd-shimmer" stroke="#ffe0a0" strokeLinecap="round" opacity=".55">
        {[[470, 312, 60], [430, 322, 130], [520, 330, 90], [450, 342, 160], [500, 356, 110], [420, 372, 190], [510, 392, 140]].map(([x, y, w], i) => (
          <path key={i} d={`M${x} ${y} h${w}`} strokeWidth={1.4 + (i % 3) * 0.4} style={{ "--d": `${i * 0.6}s` }} />
        ))}
      </g>

      {/* elephant reflections */}
      <g mask="url(#cd-refmask)" opacity=".28" filter="url(#cd-blur)" transform="translate(0 952)">
        <g transform="scale(1 -1)">
          <use href="#ele" transform="translate(128 304) scale(.85)" />
          <use href="#ele" transform="translate(872 304) scale(-.85 .85)" />
        </g>
      </g>

      {/* ripples */}
      {RIPPLES.map(([x, y, r, d], i) => (
        <ellipse key={i} className="cd-ripple" cx={x} cy={y} rx={r} ry={r * 0.22} fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="1.2" style={{ "--d": `${-i * 0.9}s`, "--t": `${d / 2 + 2}s` }} />
      ))}

      {/* elephants (feet in the shallows) */}
      <use href="#ele" transform="translate(128 304) scale(.85)" />
      <use href="#ele" transform="translate(872 304) scale(-.85 .85)" />

      {/* lily pads, buds and blooms */}
      {PADS.map(([x, y, s], i) => <use key={i} href="#lt-pad" transform={`translate(${x} ${y}) scale(${s})`} />)}
      {BUDS.map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <path d={`M0 0 Q${i % 2 ? 6 : -6} 14 0 24`} stroke="#2c6b3a" strokeWidth="2" fill="none" />
          <use className="cd-bob" href="#lt-bud" transform={`scale(${s})`} style={{ "--d": `${-i * 0.9}s` }} />
        </g>
      ))}
      {BLOOMS.map(([x, y, s, r, d], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <ellipse cy="6" rx={44 * s} ry={9 * s} fill="#000" opacity=".28" />
          <use className="cd-bob" href="#lt-bloom" transform={`scale(${s})`} style={{ "--d": `${d}s` }} />
        </g>
      ))}

      {/* floating diyas with their reflections */}
      {DIYAS.map(([x, y, s, dur], i) => (
        <g key={i} className="cd-drift" style={{ "--dur": `${dur}s`, "--d": `${-i * 1.3}s` }}>
          <g transform={`translate(${x} ${y}) scale(${s})`}>
            <rect className="cd-streak" x="-5" y="8" width="10" height="64" fill="url(#cd-streak)" style={{ "--d": `${-i * 0.4}s` }} />
            <use href="#dy" style={{ "--d": `${-i * 0.5}s` }} />
          </g>
        </g>
      ))}
    </svg>
  );
}

/* ---- the decorated elephant (drawn separately so it can sit in <defs> of the page) ---- */
export function ElephantDefs() {
  return (
    <g id="ele">
      {/* tail */}
      <g className="el-tail">
        <path d="M30 98 C14 118 16 150 24 170" stroke="#1c0c16" strokeWidth="5" fill="none" strokeLinecap="round" />
        <ellipse cx="24" cy="174" rx="4.5" ry="8" fill="#1c0c16" />
      </g>
      {/* far legs */}
      <rect x="62" y="138" width="30" height="64" rx="13" fill="#1a0b14" />
      <rect x="150" y="138" width="30" height="64" rx="13" fill="#1a0b14" />
      {/* body */}
      <ellipse cx="120" cy="108" rx="94" ry="62" fill="url(#e-body)" stroke="#ffb86b" strokeOpacity=".3" strokeWidth="1.2" />
      {/* near legs + anklets */}
      <rect x="36" y="128" width="38" height="74" rx="16" fill="#241320" stroke="#ffb86b" strokeOpacity=".22" strokeWidth="1" />
      <rect x="108" y="138" width="34" height="64" rx="14" fill="#211020" />
      <rect x="172" y="132" width="38" height="70" rx="16" fill="#241320" stroke="#ffb86b" strokeOpacity=".22" strokeWidth="1" />
      {[[34, 186, 42], [170, 186, 42]].map(([x, y, w]) => (
        <g key={x}><rect x={x} y={y} width={w} height="7" rx="3" fill="url(#gold)" />{[0, 1, 2, 3, 4].map((k) => <circle key={k} cx={x + 6 + k * 7.5} cy={y + 10} r="2" fill="#f7e08a" />)}</g>
      ))}
      {/* embroidered caparison */}
      <path d="M52 78 C96 56 162 58 198 84 L208 152 C192 166 170 158 156 168 C142 158 124 168 110 158 C94 168 78 160 64 166 C56 150 50 120 52 78Z" fill="url(#e-cloth)" stroke="url(#gold)" strokeWidth="2.4" />
      <path d="M62 84 C100 66 160 68 190 90 L198 146 C184 156 168 150 156 158 C142 150 124 158 110 150 C94 158 80 152 70 156 C62 142 60 114 62 84Z" fill="none" stroke="#f7e08a" strokeOpacity=".7" strokeWidth="1" strokeDasharray="3 3" />
      {[[88, 100], [122, 94], [156, 100], [100, 128], [136, 124], [170, 126]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <circle r="7" fill="none" stroke="#f7e08a" strokeWidth="1.4" /><circle r="2.6" fill="#f7e08a" />
          {[0, 60, 120, 180, 240, 300].map((a) => <ellipse key={a} cx="0" cy="-10" rx="1.8" ry="3" fill="#d4a437" transform={`rotate(${a})`} />)}
        </g>
      ))}
      {[66, 80, 94, 108, 122, 136, 150, 164, 178, 192].map((x, i) => (
        <g key={x}><path d={`M${x} ${i % 2 ? 160 : 163} v10`} stroke="#d4a437" strokeWidth="1.6" /><circle cx={x} cy={i % 2 ? 175 : 178} r="2.4" fill="#f7e08a" /></g>
      ))}
      {/* howdah canopy */}
      <path d="M84 68 L190 68 L184 80 L90 80Z" fill="url(#gold)" stroke="#8a5a14" strokeWidth="1" />
      {[98, 124, 150, 176].map((x) => <rect key={x} x={x} y="40" width="4" height="28" fill="url(#gold)" />)}
      <rect x="100" y="44" width="76" height="22" fill="#8c1230" opacity=".55" />
      <path d="M80 42 Q137 4 194 42 L186 48 Q137 20 88 48Z" fill="url(#gold)" stroke="#8a5a14" strokeWidth="1" />
      <path d="M122 26 Q137 -2 152 26" fill="url(#gold)" /><rect x="135" y="-8" width="4" height="14" fill="url(#gold)" /><circle cx="137" cy="-10" r="3.5" fill="#f7e08a" />
      {/* ear */}
      <g className="el-ear">
        <path d="M198 50 C168 40 158 84 172 114 C182 130 200 122 208 98 C212 80 210 62 198 50Z" fill="#2a1626" stroke="#ffb86b" strokeOpacity=".35" strokeWidth="1.2" />
        <path d="M190 62 C176 70 174 96 182 112" stroke="#ffb86b" strokeOpacity=".18" strokeWidth="2" fill="none" />
      </g>
      {/* head */}
      <path d="M198 54 C226 30 266 48 268 88 C270 112 258 124 246 130 L232 130 C222 116 208 110 196 108Z" fill="url(#e-body)" stroke="#ffb86b" strokeOpacity=".35" strokeWidth="1.2" />
      {/* trunk */}
      <g className="el-trunk">
        <path d="M252 98 C284 102 294 136 288 166 C285 184 294 192 308 184" stroke="#231220" strokeWidth="26" strokeLinecap="round" fill="none" />
        <path d="M252 98 C284 102 294 136 288 166 C285 184 294 192 308 184" stroke="#ffb86b" strokeOpacity=".16" strokeWidth="3" strokeLinecap="round" fill="none" transform="translate(-6 -4)" />
        {[118, 132, 146, 160].map((y, i) => <path key={y} d={`M${278 + (i % 2) * 2} ${y} q10 3 20 0`} stroke="#0f060c" strokeOpacity=".5" strokeWidth="1" fill="none" />)}
      </g>
      {/* tusk with gold cap */}
      <path d="M248 114 C274 118 292 132 294 150" stroke="#f2e6c8" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M290 140 L298 152" stroke="url(#gold)" strokeWidth="8" strokeLinecap="round" />
      {/* eye */}
      <circle cx="240" cy="80" r="2.4" fill="#ffd9a0" opacity=".85" />
      {/* forehead ornament (nettipattam) */}
      <path d="M198 58 C218 44 244 50 256 70" stroke="url(#gold)" strokeWidth="8" strokeLinecap="round" fill="none" />
      {[206, 216, 228, 240, 250].map((x, i) => <circle key={x} cx={x} cy={[52, 49, 50, 56, 64][i]} r="2" fill="#7a0e26" />)}
      <path d="M226 54 L220 74 L232 74Z" fill="url(#gold)" /><circle cx="226" cy="70" r="3" fill="#c4163a" />
      {/* neck garland of bells */}
      {[172, 182, 192, 202, 212, 222].map((x, i) => (
        <g key={x}><circle cx={x} cy={[104, 112, 118, 120, 118, 112][i]} r="3.2" fill="url(#gold)" /><path d={`M${x} ${[107, 115, 121, 123, 121, 115][i]} v6`} stroke="#d4a437" strokeWidth="1.4" /></g>
      ))}
    </g>
  );
}
