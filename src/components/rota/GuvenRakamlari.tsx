'use client';

// Güven rakamları — görünüme girince 0'dan hedefe akan sayaç.
// Sayılar Türkçe biçimde (10.412 gibi nokta ayraçlı) yazılır.
// "Animasyonları azalt" diyen kullanıcıda sayaç atlanır, sayı direkt görünür.

import { useEffect, useRef, useState } from 'react';

interface Rakam {
  hedef: number;
  artiIsareti?: boolean;
  etiket: string;
}

const SURE_MS = 1800;
const trBicim = new Intl.NumberFormat('tr-TR');

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export default function GuvenRakamlari({ rakamlar }: { rakamlar: Rakam[] }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [degerler, setDegerler] = useState<number[]>(rakamlar.map(() => 0));
  const [basladi, setBasladi] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setBasladi(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -15% 0px' }
    );
    io.observe(host);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!basladi) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDegerler(rakamlar.map((r) => r.hedef));
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - t0) / SURE_MS, 1);
      const e = easeOutCubic(t);
      setDegerler(rakamlar.map((r) => Math.round(r.hedef * e)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basladi]);

  return (
    <div ref={hostRef} className="rt-stats rt-reveal">
      {rakamlar.map((r, i) => (
        <div key={r.etiket} className="rt-stat">
          <div className="rt-stat-num">
            {trBicim.format(degerler[i])}
            {r.artiIsareti && <sup>+</sup>}
          </div>
          <div className="rt-stat-label">{r.etiket}</div>
        </div>
      ))}
    </div>
  );
}
