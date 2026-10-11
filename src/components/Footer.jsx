export default function Footer() {
  return (
    <>
<footer className="footer">
  <svg className="footer__logo" viewBox="0 0 120 120" aria-label="Golden peacock logo">
    <g fill="none" stroke="url(#gold)" strokeWidth="3" strokeLinecap="round">
      <path d="M60 78 C20 70 10 30 30 12"/><path d="M60 78 C30 66 26 34 40 18"/><path d="M60 78 C44 62 44 38 52 22"/>
      <path d="M60 78 C100 70 110 30 90 12"/><path d="M60 78 C90 66 94 34 80 18"/><path d="M60 78 C76 62 76 38 68 22"/>
    </g>
    <g fill="url(#gold)">
      <circle cx="30" cy="14" r="4"/><circle cx="90" cy="14" r="4"/><circle cx="42" cy="20" r="4"/><circle cx="78" cy="20" r="4"/><circle cx="52" cy="22" r="4"/><circle cx="68" cy="22" r="4"/>
      <ellipse cx="60" cy="86" rx="11" ry="16"/>
      <circle cx="60" cy="62" r="7"/>
      <path d="M57 54 l3 -12 l3 12Z"/><circle cx="60" cy="40" r="2.5"/>
    </g>
  </svg>
  <p className="footer__brand">Teja Designs</p>
  <p className="footer__small">Crafted with love · Rochan &amp; Nikita · 2026</p>
</footer>
    </>
  );
}
