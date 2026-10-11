'use client';

// SSS akordeonu — tek seferde bir soru açık.
// Soru/cevap verisi src/lib/sss.ts'de: aynı liste sayfadaki FAQPage
// yapılandırılmış verisini de besler (Google SSS zengin sonucu).

import { useState } from 'react';
import { SSS_LISTESI } from '@/lib/sss';

export default function SssAkordeon() {
  const [acik, setAcik] = useState<number | null>(null);

  return (
    <div className="rt-sss-list">
      {SSS_LISTESI.map((item, i) => {
        const open = acik === i;
        return (
          <div key={item.soru} className="rt-sss-item">
            <button
              type="button"
              className="rt-sss-q"
              aria-expanded={open}
              onClick={() => setAcik(open ? null : i)}
            >
              <span>{item.soru}</span>
              <span className="rt-sss-ikon" aria-hidden="true">
                {open ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                    <path d="M5 12h14" />
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                )}
              </span>
            </button>
            {open && (
              <div className="rt-sss-a">
                <p>{item.cevap}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
