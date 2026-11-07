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

const FL = ["#bl-marigold2", "#bl-rose2", "#bl-jasmine", "#bl-marigold", "#bl-rose"];
const swagPt = (t) => [80 * t, 6 * (1 - t) * (1 - t) + 48 * (1 - t) * t + 6 * t * t];

// a hanging string of little flowers, tipped with a bud
function Strand({ x, y0, i, k }) {
  return (
    <g className="orn__sway" style={{ "--d": `${-(i + k) * 0.7}s`, transformOrigin: `${x}px ${y0}px` }}>
      <line x1={x} y1={y0} x2={x} y2={y0 + 30} stroke="#b98a24" strokeWidth="1.3" />
      {[0, 1, 2].map((n) => <use key={n} href={FL[(i + k + n) % FL.length]} transform={`translate(${x} ${y0 + 6 + n * 9.5}) scale(${0.3 - n * 0.02})`} />)}
      <circle cx={x} cy={y0 + 33} r="2.2" fill="url(#gold)" />
    </g>
  );
}

function TopUnit({ i }) {
  const bell = i % 2 === 0;
  return (
    <svg className="orn__unit" viewBox="0 0 80 72" aria-hidden="true">
      {/* thick gold rope with a bright edge */}
      <path d="M0 6 Q40 24 80 6" fill="none" stroke="#8a5f12" strokeWidth="4.4" strokeLinecap="round" />
      <path d="M0 6 Q40 24 80 6" fill="none" stroke="url(#gold)" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M0 5.2 Q40 22.8 80 5.2" fill="none" stroke="#fff3b8" strokeWidth=".7" strokeLinecap="round" opacity=".8" />
      <circle cx="0" cy="6" r="3.4" fill="url(#gold)" stroke="#8a5f12" strokeWidth=".5" /><circle cx="80" cy="6" r="3.4" fill="url(#gold)" stroke="#8a5f12" strokeWidth=".5" />
      {/* a garland of small flowers along the swag */}
      {[0.1, 0.22, 0.34, 0.66, 0.78, 0.9].map((t, n) => { const [x, y] = swagPt(t); return <use key={n} href={FL[(i + n) % FL.length]} transform={`translate(${x} ${y + 1}) scale(${n % 2 ? 0.27 : 0.33})`} />; })}
      <Strand x={14} y0={9} i={i} k={0} />
      <Strand x={66} y0={9} i={i} k={2} />
      {bell ? (
        <Bell i={i} />
      ) : (
        <g className="orn__sway" style={{ "--d": `${-i * 0.55}s` }}>
          <line x1="40" y1="15" x2="40" y2="26" stroke="#b98a24" strokeWidth="1.6" />
          <use href={i % 4 === 1 ? "#bl-marigold" : "#bl-rose"} transform="translate(40 38) scale(1.05)" />
          <use href="#bl-jasmine" transform="translate(30 50) scale(.34)" /><use href="#bl-jasmine" transform="translate(50 50) scale(.34)" />
          <path d="M40 53 V64" stroke="#3f8a45" strokeWidth="1.4" /><path d="M40 58 C34 56 32 60 34 62 C37 62 40 60 40 58Z" fill="#3f8a45" /><path d="M40 58 C46 56 48 60 46 62 C43 62 40 60 40 58Z" fill="#3f8a45" />
        </g>
      )}
    </svg>
  );
}

function BottomUnit({ i }) {
  return (
    <svg className="orn__unit" viewBox="0 0 80 56" aria-hidden="true">
      <path d="M0 50 H80" stroke="url(#gold)" strokeWidth="1.6" />
      <path d="M0 50 Q20 41 40 50 T80 50" fill="none" stroke="url(#gold)" strokeWidth="1" opacity=".7" />
      <g className="orn__lotus" style={{ "--d": `${-i * 0.45}s` }}>
        <use href="#bl-lotus" transform="translate(40 49.5)" />
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
