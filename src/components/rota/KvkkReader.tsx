'use client';

// Yasal sayfa okuma kabuğu: soldan sabit "İçindekiler" (masaüstü) + mobil
// akordeon. Kaydırınca görünen maddeyi IntersectionObserver ile vurgular.
// Gövde (statik maddeler) children olarak sunucudan gelir — SEO tam.

import { useEffect, useState } from 'react';

type Section = { num: string; id: string; title: string };

export default function KvkkReader({
  sections,
  children,
}: {
  sections: Section[];
  children: React.ReactNode;
}) {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.target.id) setActiveId(e.target.id);
        }
      },
      { rootMargin: '-92px 0px -68% 0px', threshold: 0 }
    );
    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
  }, [sections]);

  return (
    <>
      {/* ==== MOBİL İÇİNDEKİLER (akordeon) ==== */}
      <div className="rt-kvkk-toc-mobile rt-kvkk-mobwrap">
        <details className="rt-kvkk-details">
          <summary className="rt-kvkk-summary">
            İçindekiler
            <svg className="rt-kvkk-chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </summary>
          <nav className="rt-kvkk-mobnav">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="rt-kvkk-moblink">
                <span className="rt-kvkk-toc-num">{s.num}</span>
                <span style={{ fontSize: 14, lineHeight: 1.4 }}>{s.title}</span>
              </a>
            ))}
          </nav>
        </details>
      </div>

      {/* ==== OKUMA KABUĞU: masaüstü TOC + gövde ==== */}
      <div className="rt-kvkk-shell">
        <aside className="rt-kvkk-toc-desktop">
          <div className="rt-kvkk-toc-label">İçindekiler</div>
          <nav className="rt-kvkk-toc-nav">
            {sections.map((s) => {
              const active = s.id === activeId;
              return (
                <a key={s.id} href={`#${s.id}`} className={`rt-kvkk-toc-link${active ? ' is-active' : ''}`}>
                  <span className="rt-kvkk-toc-num">{s.num}</span>
                  <span className="rt-kvkk-toc-title">{s.title}</span>
                  {active && <span className="rt-kvkk-toc-bar" aria-hidden="true" />}
                </a>
              );
            })}
          </nav>
        </aside>
        <main className="rt-kvkk-body">{children}</main>
      </div>
    </>
  );
}
