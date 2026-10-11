// Small animated SVG icons, one per ceremony.
const GRAIN_X = [14, 24, 33, 42, 51, 60, 68];

export default function EventIcon({ id }) {
  return (
    <svg className={`eicon eicon--${id}`} viewBox="0 0 80 80" aria-hidden="true">
      {id === "baraat" && (
        <>
          {/* dhol with beating sticks and floating notes */}
          <g className="e-drum">
            <ellipse cx="40" cy="48" rx="24" ry="18" fill="#b0142f" stroke="#d4a437" strokeWidth="3" />
            <path d="M18 44 L30 62 M30 44 L40 64 M42 44 L50 62 M54 44 L62 58" stroke="#f7e08a" strokeWidth="2" />
            <ellipse cx="40" cy="40" rx="24" ry="8" fill="#f7e08a" stroke="#9c6d12" strokeWidth="2" />
          </g>
          <path className="e-stick e-stick--l" d="M10 12 L34 38" stroke="#9c6d12" strokeWidth="4" strokeLinecap="round" />
          <path className="e-stick e-stick--r" d="M70 12 L46 38" stroke="#9c6d12" strokeWidth="4" strokeLinecap="round" />
          <text className="e-note n1" x="6" y="30" fontSize="14" fill="#d4a437">♪</text>
          <text className="e-note n2" x="62" y="30" fontSize="14" fill="#e5557f">♫</text>
        </>
      )}
      {id === "rukoth" && (
        <>
          {/* gift box, lid pops, sparkles */}
          <g className="e-box">
            <rect x="18" y="38" width="44" height="30" rx="3" fill="#d6214a" stroke="#d4a437" strokeWidth="2.5" />
            <rect x="37" y="38" width="6" height="30" fill="#f7e08a" />
          </g>
          <g className="e-lid">
            <rect x="14" y="28" width="52" height="12" rx="3" fill="#b0142f" stroke="#d4a437" strokeWidth="2.5" />
            <rect x="37" y="28" width="6" height="12" fill="#f7e08a" />
            <path d="M40 28 C28 10 18 22 40 28 C62 22 52 10 40 28Z" fill="#f4a6c0" stroke="#d4a437" strokeWidth="2" />
          </g>
          <path className="e-spark s1" d="M14 20 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2Z" fill="#f7e08a" />
          <path className="e-spark s2" d="M64 14 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2Z" fill="#f7e08a" />
          <path className="e-spark s3" d="M40 6 l1.5 4 4 1.5 -4 1.5 -1.5 4 -1.5 -4 -4 -1.5 4 -1.5Z" fill="#f08a4b" />
        </>
      )}
      {id === "muhurtham" && (
        <>
          {/* sacred fire with flickering flames and glow */}
          <circle className="e-glow" cx="40" cy="44" r="28" fill="#ffd36b" opacity=".35" />
          <path className="e-flame f1" d="M40 66 C22 56 28 38 40 18 C52 38 58 56 40 66Z" fill="#ff8a2a" />
          <path className="e-flame f2" d="M40 66 C30 58 34 46 40 34 C46 46 50 58 40 66Z" fill="#ffd36b" />
          <path className="e-flame f3" d="M24 66 C16 58 20 50 26 44 C28 54 32 60 24 66Z" fill="#f08a4b" />
          <path className="e-flame f3" d="M56 66 C64 58 60 50 54 44 C52 54 48 60 56 66Z" fill="#f08a4b" />
          <path d="M14 66 H66 L60 74 H20Z" fill="#c98a2a" stroke="#8a5a14" strokeWidth="2" />
        </>
      )}
      {id === "akshata" && (
        <>
          {/* rice grains showering down onto a plate */}
          <g className="e-grains">
            {GRAIN_X.map((x, i) => (
              <ellipse key={x} cx={x} cy="8" rx="2" ry="4.2" fill="#fff6d8" stroke="#d4a437" strokeWidth=".8" style={{ "--i": i }} transform={`rotate(${(i % 3) * 25 - 25} ${x} 8)`} />
            ))}
          </g>
          <ellipse cx="40" cy="64" rx="30" ry="9" fill="#d4a437" stroke="#9c6d12" strokeWidth="2" />
          <path d="M18 62 Q40 36 62 62Z" fill="#fff6d8" stroke="#d4a437" strokeWidth="1.5" />
          <circle cx="40" cy="50" r="4" fill="#d6214a" />
        </>
      )}
    </svg>
  );
}
