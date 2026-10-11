// Eğitmenler kadro sayfası — Claude Design "Eğitmenler.dc.html" handoff'unun kodu.
// Sunucuda çizilir (SEO); kadro Supabase'den saatlik tazelenir.
// Portre hizası: yuvarlak kırpma TEPE kilitli (yüzler fotoğrafların üst bandında,
// oranlar karışık — merkez kilidi kafaları kesiyordu). Aykırı fotoğraf çıkarsa
// FOTO_ODAK haritasına hoca slug'ı + odak yüzdesi eklenir, tek satırlık iş.

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SiteHeader from '@/components/rota/SiteHeader';
import SiteFooter from '@/components/rota/SiteFooter';
import RevealInit from '@/components/rota/RevealInit';
import { getEgitmenKadro, type KadroEgitmeni } from '@/lib/rota';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Eğitmenler',
  description:
    'Yeni Rota Eğitim Kurumları eğitmen kadrosu: alanında uzman eğitmenlerimizle videodan canlı derse ve yüz yüze uygulamaya uzanan bir eğitim yolculuğu.',
  alternates: { canonical: '/egitmenler' },
  openGraph: {
    title: 'Eğitmenler | Yeni Rota Eğitim Kurumları',
    description: 'Alanında uzman eğitmen kadromuzla tanışın.',
    url: 'https://yenirotaegitim.com/egitmenler',
    siteName: 'Yeni Rota Eğitim Kurumları',
    images: [{ url: '/marka/kare-on-dark-1080.png', width: 1080, height: 1080, alt: 'Yeni Rota Eğitim Kurumları' }],
    locale: 'tr_TR',
    type: 'website',
  },
};

// Hoca bazlı foto odak ince ayarı: varsayılan tepe kilidi (50% 0%) hepsine
// oturuyor (28 foto tek tek incelendi, 2026-07-12). Aykırı foto gelirse:
// 'hoca-slug': '50% 15%' satırı eklenir.
const FOTO_ODAK: Record<string, string> = {};

function EgitmenIkon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--rt-fg-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function KonumIkon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--rt-fg-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function EgitimRozetIkon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 12.5-9.17 4.16a2 2 0 0 1-1.66 0L2 12.5" />
      <path d="M6 9.4v4.6c0 1 2.7 2.4 6 2.4s6-1.4 6-2.4V9.4" />
    </svg>
  );
}

function KadroKarti({ hoca }: { hoca: KadroEgitmeni }) {
  const govde = (
    <>
      <div className="rt-kadro-foto">
        <Image
          src={hoca.foto}
          alt={`${hoca.ad} — eğitmen`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1000px) 33vw, 280px"
          style={{ objectFit: 'cover', ...(hoca.slug && FOTO_ODAK[hoca.slug] ? { objectPosition: FOTO_ODAK[hoca.slug] } : {}) }}
        />
      </div>
      <div className="rt-kadro-body">
        <div className="rt-kadro-ad">{hoca.ad}</div>
        {hoca.unvan && <div className="rt-kadro-unvan">{hoca.unvan}</div>}
        {hoca.egitimSayisi > 0 && (
          <div className="rt-kadro-rozet-alan">
            <span className="rt-kadro-rozet">
              <EgitimRozetIkon />
              {hoca.egitimSayisi} eğitim
            </span>
          </div>
        )}
      </div>
    </>
  );

  // Slug'sız hoca linksiz kart (noloco'dan slug eklenince otomatik tıklanır olur)
  return hoca.slug ? (
    <Link className="rt-kadro-card rt-reveal" href={`/egitmenler/${hoca.slug}`}>
      {govde}
    </Link>
  ) : (
    <div className="rt-kadro-card rt-reveal">{govde}</div>
  );
}

export default async function EgitmenlerSayfasi() {
  const kadro = await getEgitmenKadro();

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Yeni Rota Eğitim Kurumları — Eğitmen Kadrosu',
    numberOfItems: kadro.length,
    itemListElement: kadro.map((h, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Person',
        name: h.ad,
        ...(h.unvan ? { jobTitle: h.unvan } : {}),
        ...(h.slug ? { url: `https://yenirotaegitim.com/egitmenler/${h.slug}` } : {}),
        worksFor: { '@type': 'EducationalOrganization', name: 'Yeni Rota Eğitim Kurumları' },
      },
    })),
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://yenirotaegitim.com' },
      { '@type': 'ListItem', position: 2, name: 'Eğitmenler', item: 'https://yenirotaegitim.com/egitmenler' },
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
          <div className="rt-cat-eyebrow">Eğitmen Kadrosu</div>
          <h1 className="rt-cat-title">Eğitmenler</h1>
          <p className="rt-cat-sub">
            Alanında uzman eğitmenlerimizle; videodan canlı derse ve yüz yüze uygulamaya uzanan
            bir eğitim yolculuğu.
          </p>
          <div className="rt-cat-meta">
            <span className="item">
              <EgitmenIkon />
              {kadro.length} eğitmen
            </span>
            <span className="dot" aria-hidden="true" />
            <span className="item">
              <KonumIkon />
              Ankara ve İstanbul
            </span>
          </div>
        </div>
      </section>

      {/* ============ PORTRE IZGARASI ============ */}
      <section className="rt-section" style={{ paddingTop: 'clamp(48px,7vw,80px)' }}>
        <div className="rt-container">
          <div className="rt-kadro-grid">
            {kadro.map((h) => (
              <KadroKarti key={`${h.ad}-${h.slug ?? 'x'}`} hoca={h} />
            ))}
          </div>
        </div>
      </section>

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
              Hangi programın size uygun olduğundan emin değil misiniz?
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
              Bilgilerinizi bırakın; eğitim danışmanınız sizi arayıp, ilgi alanınıza en uygun
              programı ve doğru eğitmeni birlikte değerlendirelim.
            </p>
            <Link
              className="rt-cta"
              href="/#iletisim"
              style={{ marginTop: 28, padding: '14px 28px', letterSpacing: '0.08em', textTransform: 'uppercase', gap: 10, display: 'inline-flex' }}
            >
              Bilgi formunu açın
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
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
