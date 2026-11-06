// Animated gold borders for the empty tops and bottoms of the one-screen sections:
//  - top: a swag of gold beads with hanging bells and marigolds that sway gently
//  - bottom: a row of lotuses that breathe, with twinkling sparkles
//  - a few golden motes drifting up through the middle
// Pure SVG/CSS (the gold gradient lives in <Defs />). Paused automatically while off-screen.
const N = 10; // units across; the CSS hides some on narrow screens

// a temple bell in cast brass: lit from the left, with a crown ring, a flared body, a thick rim and a swinging clapper
function Bell({ i }) {
  return (
    <>
      <g className="orn__bell" style={{ "--d": `${-i * 0.55}s` }}>
        <line x1="40" y1="15" x2="40" y2="21" stroke="#8a6a24" strokeWidth="1.2" />
        <circle cx="40" cy="22.4" r="2.4" fill="none" stroke="url(#brass-v)" strokeWidth="1.5" />
        {/* crown */}
        <rect x="36.2" y="24" width="7.6" height="4.2" rx="1.4" fill="url(#brass-h)" stroke="#6b4a10" strokeWidth=".5" />
        {/* body */}
        <path d="M36.6 28 C36.6 31 34.6 34 32.6 39 C31 43 29.4 47 28.2 51 H51.8 C50.6 47 49 43 47.4 39 C45.4 34 43.4 31 43.4 28 Z" fill="url(#brass-h)" stroke="#6b4a10" strokeWidth=".6" />
        {/* turned grooves */}
        <path d="M35.2 33 Q40 35 44.8 33 M33.6 38 Q40 40.4 46.4 38 M31.6 44.4 Q40 47.2 48.4 44.4" fill="none" stroke="#7a5614" strokeWidth=".55" opacity=".7" />
        <path d="M35.2 32.2 Q40 34.2 44.8 32.2 M33.6 37.2 Q40 39.6 46.4 37.2" fill="none" stroke="#ffeeb0" strokeWidth=".4" opacity=".55" />
        {/* thick rim */}
        <path d="M27.4 51 H52.6 V54.2 Q40 56.8 27.4 54.2 Z" fill="url(#brass-h)" stroke="#6b4a10" strokeWidth=".6" />
        <ellipse cx="40" cy="54.4" rx="12.6" ry="2.2" fill="url(#brass-in)" />
        {/* highlight down the lit side */}
        <path d="M35.8 29 C35 33 33 38 31 44.5" fill="none" stroke="#fffbe0" strokeWidth="1.5" strokeLinecap="round" opacity=".5" />
        <path d="M33.4 36 C33 38.6 32 41 31 44" fill="none" stroke="#fff" strokeWidth=".7" strokeLinecap="round" opacity=".6" />
        {/* clapper */}
        <g className="orn__clap" style={{ "--d": `${-i * 0.55 - 0.35}s` }}>
          <line x1="40" y1="55" x2="40" y2="59" stroke="#7a5614" strokeWidth=".9" />
          <circle cx="40" cy="61.4" r="2.9" fill="url(#brass-ball)" stroke="#6b4a10" strokeWidth=".5" />
          <circle cx="39" cy="60.4" r=".9" fill="#fff" opacity=".7" />
        </g>
      </g>
    </>
  );
}

function TopUnit({ i }) {
  const bell = i % 2 === 0;
  return (
    <svg className="orn__unit" viewBox="0 0 80 68" aria-hidden="true">
      <path d="M0 6 Q40 24 80 6" fill="none" stroke="url(#gold)" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="0" cy="6" r="2.4" fill="url(#gold)" /><circle cx="80" cy="6" r="2.4" fill="url(#gold)" />
      <circle className="orn__bead" cx="20" cy="13.6" r="1.6" fill="#f7e08a" style={{ "--d": `${(i % 5) * 0.5}s` }} />
      <circle className="orn__bead" cx="60" cy="13.6" r="1.6" fill="#f7e08a" style={{ "--d": `${((i + 2) % 5) * 0.5}s` }} />
      {bell ? (
        <Bell i={i} />
      ) : (
        <g className="orn__sway" style={{ "--d": `${-i * 0.55}s` }}>
          <line x1="40" y1="15" x2="40" y2="28" stroke="#b98a24" strokeWidth="1.1" />
          <use href={i % 4 === 1 ? "#bl-marigold" : "#bl-rose"} transform="translate(40 40) scale(.9)" />
          <path d="M40 54 V62" stroke="#3f8a45" strokeWidth="1.2" /><path d="M40 58 C34 56 32 60 34 62 C37 62 40 60 40 58Z" fill="#3f8a45" />
        </g>
      )}
    </svg>
  );
}

function BottomUnit({ i }) {
  return (
    <svg className="orn__unit" viewBox="0 0 80 44" aria-hidden="true">
      <path d="M0 40 H80" stroke="url(#gold)" strokeWidth="1.2" />
      <path d="M0 40 Q20 30 40 40 T80 40" fill="none" stroke="url(#gold)" strokeWidth="1" opacity=".7" />
      <g className="orn__lotus" style={{ "--d": `${-i * 0.45}s` }}>
        <g transform="translate(40 40)">
          <path d="M0 0 C-9 -3 -12 -14 -7 -22 C-3 -16 -1 -9 0 0Z" fill="#f4a6c0" stroke="#d9487f" strokeWidth=".6" />
          <path d="M0 0 C9 -3 12 -14 7 -22 C3 -16 1 -9 0 0Z" fill="#f4a6c0" stroke="#d9487f" strokeWidth=".6" />
          <path d="M0 0 C-16 -2 -21 -10 -19 -17 C-12 -14 -4 -9 0 0Z" fill="#ee86a8" stroke="#d9487f" strokeWidth=".6" />
          <path d="M0 0 C16 -2 21 -10 19 -17 C12 -14 4 -9 0 0Z" fill="#ee86a8" stroke="#d9487f" strokeWidth=".6" />
          <path d="M0 0 C-6 -6 -6 -20 0 -29 C6 -20 6 -6 0 0Z" fill="#fbc9d9" stroke="#d9487f" strokeWidth=".6" />
          <circle cy="-12" r="2" fill="#f7d35c" />
        </g>
      </g>
      <path className="orn__spark" d="M12 14 l1.4 3.6 3.6 1.4 -3.6 1.4 -1.4 3.6 -1.4 -3.6 -3.6 -1.4 3.6 -1.4Z" fill="#f7e08a" style={{ "--d": `${(i % 4) * 0.6}s` }} />
      <path className="orn__spark" d="M68 10 l1.2 3 3 1.2 -3 1.2 -1.2 3 -1.2 -3 -3 -1.2 3 -1.2Z" fill="#f7e08a" style={{ "--d": `${((i + 2) % 4) * 0.6}s` }} />
    </svg>
  );
}

const MOTES = Array.from({ length: 7 }, (_, i) => ({ left: 8 + ((i * 41) % 84), size: 3 + (i % 3), dur: 9 + (i % 4) * 2.2, delay: -(i * 1.7), x: ((i % 5) - 2) * 18 }));

export default function Ornaments({ top = true, bottom = true }) {
  return (
    <>
      {top && <div className="orn orn--top" aria-hidden="true">{Array.from({ length: N }, (_, i) => <TopUnit key={i} i={i} />)}</div>}
      {bottom && <div className="orn orn--bottom" aria-hidden="true">{Array.from({ length: N }, (_, i) => <BottomUnit key={i} i={i} />)}</div>}
      <div className="orn__motes" aria-hidden="true">
        {MOTES.map((m, i) => <span key={i} style={{ left: `${m.left}%`, width: m.size, height: m.size, animationDuration: `${m.dur}s`, animationDelay: `${m.delay}s`, "--x": `${m.x}px` }} />)}
      </div>
    </>
  );
}
