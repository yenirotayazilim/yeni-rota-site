'use client';

// Yeni ana sayfanın yapışkan üst menüsü.
// Logo: yeni kurumsal yatay wordmark (fontlar PNG'ye gömülü — SVG text sorunu yok).
// Tema düğmesi data-theme'i <html> üzerinde değiştirir, tercihi localStorage'da saklar.

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';

// Mutlak yollar: hem ana sayfada (aynı sayfa içi kaydırma) hem alt
// sayfalarda (/egitimler gibi) doğru çalışsın. "Eğitimler" artık katalog sayfası.
const NAV = [
  { href: '/#kurumsal', label: 'Kurumsal' },
  { href: '/egitimler', label: 'Eğitimler' },
  { href: '/egitmenler', label: 'Eğitmenler' },
  { href: '/iletisim', label: 'İletişim' },
];

export default function SiteHeader() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.dataset.theme === 'light');
  }, []);

  const toggle = useCallback(() => {
    const next = document.documentElement.dataset.theme === 'light' ? '' : 'light';
    if (next) document.documentElement.dataset.theme = next;
    else delete document.documentElement.dataset.theme;
    try {
      localStorage.setItem('rota-theme', next || 'dark');
    } catch {}
    setLight(next === 'light');
  }, []);

  return (
    <header className="rt-nav">
      <div className="rt-container rt-nav-inner">
        <Link href="/" aria-label="Yeni Rota Eğitim Kurumları — ana sayfa" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            className="rt-only-dark rt-logo"
            src="/marka/wordmark-light.png"
            srcSet="/marka/wordmark-light.png 1x, /marka/wordmark-light-2x.png 2x"
            alt="Yeni Rota Eğitim Kurumları"
          />
          <img
            className="rt-only-light rt-logo"
            src="/marka/wordmark-dark.png"
            srcSet="/marka/wordmark-dark.png 1x, /marka/wordmark-dark-2x.png 2x"
            alt="Yeni Rota Eğitim Kurumları"
          />
        </Link>

        <nav className="rt-nav-links" aria-label="Site bölümleri">
          {NAV.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>

        <div className="rt-nav-actions">
          <button type="button" className="rt-theme-btn" onClick={toggle} aria-label="Tema değiştir">
            {light ? (
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
          </button>
          <a className="rt-cta" href="https://app.yenirotaegitim.com" rel="noopener">
            Öğrenci Girişi
          </a>
        </div>
      </div>
    </header>
  );
}
