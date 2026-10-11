// Eğitimler kataloğu (/egitimler) — Claude Design "Eğitimler.dc.html" handoff'unun kodu.
// Sunucuda çizilir (SEO); veriler Supabase'den popülerlik sırasında, saatlik tazelenir.
// GA + Facebook Pixel kök layout'ta olduğu için PageView bu sayfada da otomatik atar.

import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/rota/SiteHeader';
import SiteFooter from '@/components/rota/SiteFooter';
import RevealInit from '@/components/rota/RevealInit';
import EgitimlerKatalog from '@/components/rota/EgitimlerKatalog';
import { getEgitimlerVitrin } from '@/lib/rota';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Eğitimler',
  description:
    'Kişisel gelişim, sağlık, psikoloji ve spor alanlarında sertifikalı eğitim programlarımızın tamamını inceleyin; size uygun rotayı seçin.',
  alternates: { canonical: '/egitimler' },
  openGraph: {
    title: 'Eğitimler | Yeni Rota Eğitim Kurumları',
    description:
      'Kişisel gelişim, sağlık, psikoloji ve spor alanlarında sertifikalı eğitim programlarımızın tamamı.',
    url: 'https://yenirotaegitim.com/egitimler',
    siteName: 'Yeni Rota Eğitim Kurumları',
    images: [{ url: '/marka/kare-on-dark-1080.png', width: 1080, height: 1080, alt: 'Yeni Rota Eğitim Kurumları' }],
    locale: 'tr_TR',
    type: 'website',
  },
};

function ProgramIkon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--rt-fg-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function AlanIkon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--rt-fg-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

export default async function EgitimlerSayfasi() {
  const egitimler = await getEgitimlerVitrin();
  const alanSayisi = new Set(egitimler.map((e) => e.kategori).filter(Boolean)).size;

  // Google zengin sonuçları için yapısal veri
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Yeni Rota Eğitim Kurumları — Eğitim Programları',
    numberOfItems: egitimler.length,
    itemListElement: egitimler.map((e, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: e.ad,
      url: `https://yenirotaegitim.com/egitimler/${e.slug}`,
    })),
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://yenirotaegitim.com' },
      { '@type': 'ListItem', position: 2, name: 'Eğitimler', item: 'https://yenirotaegitim.com/egitimler' },
    ],
  };

  return (
    <div className="rt-site">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <RevealInit />
      <SiteHeader />

      {/* ============ ÜST ŞERİT (koyu-sabit) ============ */}
      <section className="rt-cat-hero">
        <div className="rt-cat-glow" aria-hidden="true" />
        <span className="rt-tick tl" aria-hidden="true" />
        <span className="rt-tick tr" aria-hidden="true" />
        <div className="rt-cat-hero-inner">
          <div className="rt-cat-eyebrow">Eğitim Kataloğu</div>
          <h1 className="rt-cat-title">Eğitimler</h1>
          <p className="rt-cat-sub">
            Kişisel gelişimden sağlığa, psikolojiden spora; sertifikalı programlarımızın tamamını
            inceleyin ve size uygun rotayı seçin.
          </p>
          <div className="rt-cat-meta">
            <span className="item">
              <ProgramIkon />
              {egitimler.length} program
            </span>
            <span className="dot" aria-hidden="true" />
            <span className="item">
              <AlanIkon />
              {alanSayisi} alan
            </span>
          </div>
        </div>
      </section>

      {/* ============ KATEGORİ ÇİPLERİ + KART IZGARASI ============ */}
      <EgitimlerKatalog egitimler={egitimler} />

      {/* ============ ALT BANT — BİLGİ TALEBİ ============ */}
      <section className="rt-section" style={{ paddingTop: 0 }}>
        <div className="rt-container">
          <div className="rt-cat-cta rt-reveal">
            <div className="rt-cat-eyebrow" style={{ marginBottom: 16 }}>Bilgi Talebi</div>
            <h2
              style={{
                fontFamily: 'var(--rt-font-display)',
                fontWeight: 500,
                fontSize: 'clamp(1.7rem,2.6vw,2.3rem)',
                lineHeight: 1.12,
                color: '#f4ecdf',
                margin: 0,
                textWrap: 'pretty',
              }}
            >
              Aradığınız programı bulamadınız mı?
            </h2>
            <p
              style={{
                margin: '18px auto 0',
                maxWidth: '56ch',
                fontSize: 15,
                lineHeight: 1.65,
                color: '#b8a9c2',
                textWrap: 'pretty',
              }}
            >
              Katalogda göremediğiniz bir alan mı var, yoksa hangi programın size uygun olduğundan mı
              emin değilsiniz? Bilgilerinizi bırakın; eğitim danışmanınız sizi arayıp birlikte
              değerlendirsin.
            </p>
            <Link
              className="rt-cta"
              href="/#iletisim"
              style={{ marginTop: 28, padding: '14px 28px', letterSpacing: '0.08em', textTransform: 'uppercase' }}
            >
              Bilgi formunu açın
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginLeft: 10 }}
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
            <div
              style={{
                marginTop: 26,
                fontFamily: 'var(--rt-font-display)',
                fontStyle: 'italic',
                fontSize: 15,
                color: 'var(--rt-gold-400)',
                letterSpacing: '0.03em',
              }}
            >
              Doğru bilgiye, doğru rotadan.
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
