'use client';

// .rt-reveal elemanlarını görünüme girince bir kez yumuşakça belirtir.
// GSAP yerine yerleşik IntersectionObserver: sıfır ek paket, aynı etki.

import { useEffect } from 'react';

export default function RevealInit() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.rt-reveal'));
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
