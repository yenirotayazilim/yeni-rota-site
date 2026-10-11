'use client';

// Hero bölümü: metin her cihazda anında görünür (LCP + SEO);
// 3B spiral yalnızca güçlü cihazlarda, sayfa boyandıktan sonra arkaya süzülür.
// Zayıf cihaz statik hâli: porfir degrade + altın köşe tikleri (tasarımın kendisi).

import dynamic from 'next/dynamic';

const HeroSpiral = dynamic(() => import('./HeroSpiral'), { ssr: false });

export default function Hero({ covers }: { covers: string[] }) {
  return (
    <section id="top" className="rt-hero">
      <HeroSpiral covers={covers} />
      <div className="rt-hero-glow" />
      <div className="rt-tick tl" />
      <div className="rt-tick tr" />
      <div className="rt-tick bl" />
      <div className="rt-tick br" />
      <div className="rt-hero-core">
        <p className="rt-hero-eyebrow">Yeni Rota Eğitim Kurumları</p>
        <h1 className="rt-hero-title">Bilgiye giden yolda güvenilir rotanız</h1>
        <p className="rt-hero-sub">
          On yılı aşkın deneyimimizle; kişisel gelişim, sağlık ve psikoloji alanlarında hazırlanan
          sertifikalı eğitim programlarını kendi hızınızda tamamlayabilirsiniz.
        </p>
      </div>
      <div className="rt-scroll-cue" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14" />
          <path d="m19 12-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
