import { useEffect, useState } from "react";

const calc = (target) => {
  const diff = target - Date.now();
  if (diff <= 0) return { done: true, d: 0, h: 0, m: 0, s: 0 };
  return {
    done: false,
    d: Math.floor(diff / 864e5),
    h: Math.floor(diff / 36e5) % 24,
    m: Math.floor(diff / 6e4) % 60,
    s: Math.floor(diff / 1e3) % 60,
  };
};

export default function useCountdown(target) {
  const [t, setT] = useState(() => calc(target));
  useEffect(() => {
    const id = setInterval(() => {
      const next = calc(target);
      setT(next);
      if (next.done) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}
