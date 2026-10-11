'use client';

// Özgeçmiş açılır bileşeni — bio ham CV, kimisi çok uzun (26k karaktere kadar).
// İlk 5 paragraf açık; fazlası solmayla gizlenir, "Devamını okuyun" ile açılır.
// SEO notu: TÜM paragraflar her zaman DOM'da — gizleme sadece görsel (CSS),
// Google metnin tamamını görür.

import { useState } from 'react';

const ACIK_PARAGRAF = 5;

export default function BioAcilir({ paragraflar }: { paragraflar: string[] }) {
  const [acik, setAcik] = useState(false);
  const uzun = paragraflar.length > ACIK_PARAGRAF;

  return (
    <>
      <div className="rt-bio-sarici">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {paragraflar.map((p, i) => (
            <p
              key={i}
              className="rt-det-para"
              style={{ lineHeight: 1.82, ...(uzun && !acik && i >= ACIK_PARAGRAF ? { display: 'none' } : {}) }}
            >
              {p}
            </p>
          ))}
        </div>
        {uzun && !acik && <div className="rt-bio-solma" aria-hidden="true" />}
      </div>

      {uzun && (
        <button
          type="button"
          className={`rt-bio-devam${acik ? ' acik' : ''}`}
          onClick={() => setAcik((v) => !v)}
          aria-expanded={acik}
        >
          <span>{acik ? 'Daha az göster' : 'Devamını okuyun'}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      )}
    </>
  );
}
