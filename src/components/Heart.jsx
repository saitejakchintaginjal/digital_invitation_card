// Heart used between the couple's names. Gradient is defined once in <Defs />.
export default function Heart({ className = "heart" }) {
  return (
    <svg className={className} viewBox="-12 -12 24 24" role="img" aria-label="and">
      <path d="M0 10 C-22 -4 -13 -19 0 -9 C13 -19 22 -4 0 10Z" />
    </svg>
  );
}
