// Animated peacock on a palace balcony. Facing right; mirror with side="r".
// The tail fan opens and closes, feathers shimmer, the neck sways, the head
// pecks, the crest flutters and the eye blinks (see "Peacock" in styles.css).

const BACK = [-80, -67, -54, -41, -28, -15, -2, 11, 24, 37, 50, 63, 76];
const FRONT = [-73, -60, -47, -34, -21, -8, 5, 18, 31, 44, 57, 70];
const BARBS = Array.from({ length: 13 }, (_, i) => 18 + i * 9);

// Shared gradients and the single feather shape; rendered once in <Defs />.
export function PeacockDefs() {
  return (
    <>
      <linearGradient id="pf-vane" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stopColor="#7a5a1c" />
        <stop offset=".25" stopColor="#2c7a4b" />
        <stop offset=".7" stopColor="#14876f" />
        <stop offset="1" stopColor="#c9a233" />
      </linearGradient>
      <linearGradient id="pf-body" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#1b78b8" />
        <stop offset=".6" stopColor="#0f4f86" />
        <stop offset="1" stopColor="#0a3360" />
      </linearGradient>
      <linearGradient id="pf-neck" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#0f5a99" />
        <stop offset=".55" stopColor="#2a9ad6" />
        <stop offset="1" stopColor="#0f5a99" />
      </linearGradient>
      <g id="pfeather">
        <path d="M0 0 C-17 -32 -23 -92 0 -152 C23 -92 17 -32 0 0Z" fill="url(#pf-vane)" />
        <g stroke="#e9c75a" strokeWidth="1" strokeLinecap="round" opacity=".55">
          {BARBS.map((y) => (
            <path key={y} d={`M0 ${-y} L-${14 - y / 14} ${-y - 9} M0 ${-y} L${14 - y / 14} ${-y - 9}`} />
          ))}
        </g>
        <path d="M0 0 V-148" stroke="#8a5a14" strokeWidth="1.4" />
        <ellipse cx="0" cy="-116" rx="15" ry="20" fill="#c9a233" />
        <ellipse cx="0" cy="-116" rx="12" ry="17" fill="#1fa39a" />
        <ellipse cx="0" cy="-115" rx="9" ry="13" fill="#14439a" />
        <ellipse cx="0" cy="-114" rx="5" ry="8" fill="#0a1f4a" />
        <ellipse cx="-1.6" cy="-117" rx="1.6" ry="2.4" fill="#7fd8e6" opacity=".8" />
      </g>
    </>
  );
}

function Fan() {
  return (
    <g transform="translate(104 218)" className="pfan">
      {BACK.map((a, i) => (
        <g className="pf pf--back" key={`b${a}`} style={{ "--a": `${a}deg`, "--i": i }}>
          <use href="#pfeather" style={{ "--s": 1.12 }} />
        </g>
      ))}
      {FRONT.map((a, i) => (
        <g className="pf pf--front" key={`f${a}`} style={{ "--a": `${a}deg`, "--i": i + 3 }}>
          <use href="#pfeather" style={{ "--s": 0.9 }} />
        </g>
      ))}
    </g>
  );
}

function Balcony() {
  return (
    <g>
      <rect x="6" y="268" width="288" height="16" rx="3" fill="url(#gold)" stroke="#8a5a14" strokeWidth="1.5" />
      <rect x="0" y="262" width="300" height="8" rx="3" fill="#e8c46a" stroke="#8a5a14" strokeWidth="1.5" />
      <g fill="#ecd08a" stroke="#9c6d12" strokeWidth="1.5">
        {[22, 82, 142, 202, 262].map((x) => (
          <path key={x} d={`M${x - 10} 330 V310 Q${x - 10} 296 ${x} 296 Q${x + 10} 296 ${x + 10} 310 V330Z`} />
        ))}
        <path d="M6 284 H294 V292 H6Z" fill="#d4a437" />
      </g>
      <path d="M0 330 V292" stroke="#9c6d12" strokeWidth="3" />
    </g>
  );
}

export default function Peacock({ side = "l" }) {
  return (
    <svg className={`peacock peacock--${side}`} viewBox="0 0 300 330" aria-hidden="true">
      <Fan />

      {/* legs */}
      <g stroke="#7b6a52" strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M138 244 L134 266 M134 266 l-7 2 M134 266 l1 4 M134 266 l6 2" />
        <path d="M160 242 L162 266 M162 266 l-7 2 M162 266 l1 4 M162 266 l6 2" />
      </g>

      {/* body */}
      <path d="M76 222 C84 190 140 178 178 196 C196 206 192 236 168 246 C140 258 94 254 78 236 Z" fill="url(#pf-body)" stroke="#d4a437" strokeWidth="1.5" />
      <path d="M92 210 C122 196 154 202 174 218 C152 236 112 240 92 228Z" fill="#2f7d4f" stroke="#d4a437" strokeWidth="1.5" />
      <g fill="none" stroke="#e9c75a" strokeWidth="1.2" opacity=".8">
        <path d="M100 214 q6 6 12 0 M116 210 q6 6 12 0 M132 210 q6 6 12 0 M148 214 q6 6 12 0 M106 224 q6 6 12 0 M122 222 q6 6 12 0 M138 222 q6 6 12 0" />
      </g>
      <ellipse cx="170" cy="222" rx="16" ry="20" fill="#2a9ad6" opacity=".45" />

      {/* neck + head */}
      <g className="p-neck">
        <path d="M156 214 C168 190 172 152 190 128 L214 130 C206 154 204 192 194 220 Z" fill="url(#pf-neck)" stroke="#0a3360" strokeWidth="1" />
        <g fill="none" stroke="#7fd0f0" strokeWidth="1" opacity=".6">
          <path d="M176 196 q6 4 12 0 M176 180 q6 4 12 0 M180 164 q6 4 12 0 M184 148 q6 4 12 0" />
        </g>
        <g className="p-head">
          <circle cx="203" cy="114" r="12" fill="#14609e" stroke="#0a3360" strokeWidth="1" />
          <ellipse cx="208" cy="113" rx="7" ry="4.5" fill="#fff" />
          <path d="M213 113 L230 119 L213 122Z" fill="#c9a233" stroke="#8a5a14" strokeWidth=".8" />
          <circle className="p-eye" cx="206" cy="111" r="2.4" fill="#111" />
          <g className="p-crest" stroke="#2a7a6a" strokeWidth="1.4" strokeLinecap="round" fill="#1fa39a">
            <path d="M198 104 L188 80" /><path d="M201 103 L196 76" /><path d="M204 102 L204 73" /><path d="M207 103 L212 76" /><path d="M210 105 L219 82" />
            <circle cx="188" cy="79" r="3" /><circle cx="196" cy="75" r="3" /><circle cx="204" cy="72" r="3" /><circle cx="212" cy="75" r="3" /><circle cx="219" cy="81" r="3" />
          </g>
        </g>
      </g>

      <Balcony />
    </svg>
  );
}
