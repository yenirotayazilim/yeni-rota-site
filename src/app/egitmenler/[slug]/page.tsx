// Eğitmen detay sayfası — Claude Design "Eğitmen Detay.dc.html" handoff'unun kodu.
// SSR + eğitmene özel meta/OG (portre) + Person structured data.
// Portre kuralı: 4:5 dikey kadraj, porfir fon + iç altın hairline (yuvarlak yasak).
// Bio ham CV — 5 paragraftan uzunsa "Devamını okuyun" ile açılır; biosuzda bölüm gizli.
// İletişim ASLA gösterilmez (email/telefon DB seviyesinde de API'ye kapalı).

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '@/components/rota/SiteHeader';
import SiteFooter from '@/components/rota/SiteFooter';
import RevealInit from '@/components/rota/RevealInit';
import BioAcilir from '@/components/rota/BioAcilir';
import { getEgitmenDetay, getEgitmenSluglari } from '@/lib/rota';

export const revalidate = 3600;

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const sluglar = await getEgitmenSluglari();
  return sluglar.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const h = await getEgitmenDetay(slug);
  if (!h) return { title: 'Eğitmen bulunamadı' };

  const ham = h.bioParagraflar.join(' ');
  const desc = ham
    ? ham.length > 155
      ? `${ham.slice(0, 152).trimEnd()}…`
      : ham
    : `${h.ad} — Yeni Rota Eğitim Kurumları eğitmen kadrosu.`;

  return {
    title: h.ad,
    description: desc,
    alternates: { canonical: `/egitmenler/${h.slug}` },
    openGraph: {
      title: `${h.ad} | Yeni Rota Eğitim Kurumları`,
      description: desc,
      url: `https://yenirotaegitim.com/egitmenler/${h.slug}`,
      siteName: 'Yeni Rota Eğitim Kurumları',
      images: h.foto ? [{ url: h.foto, alt: h.ad }] : undefined,
      locale: 'tr_TR',
      type: 'profile',
    },
  };
}

function SaatIkon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--rt-fg-gold)" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function VideoIkon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--rt-fg-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="14" height="12" rx="2" />
      <path d="m22 8-6 4 6 4V8z" />
    </svg>
  );
}

function OkIkon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export default async function EgitmenDetaySayfasi({ params }: Params) {
  const { slug } = await params;
  const h = await getEgitmenDetay(slug);
  if (!h) notFound();

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: h.ad,
    ...(h.unvan ? { jobTitle: h.unvan } : {}),
    ...(h.foto ? { image: h.foto } : {}),
    url: `https://yenirotaegitim.com/egitmenler/${h.slug}`,
    worksFor: {
      '@type': 'EducationalOrganization',
      name: 'Yeni Rota Eğitim Kurumları',
      url: 'https://yenirotaegitim.com',
    },
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://yenirotaegitim.com' },
      { '@type': 'ListItem', position: 2, name: 'Eğitmenler', item: 'https://yenirotaegitim.com/egitmenler' },
      { '@type': 'ListItem', position: 3, name: h.ad, item: `https://yenirotaegitim.com/egitmenler/${h.slug}` },
    ],
  };

  return (
    <div className="rt-site">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <RevealInit />
      <SiteHeader />

      {/* ============ 1. ÜST ŞERİT (koyu-sabit) ============ */}
      <section className="rt-det-hero">
        <div className="rt-det-hero-glow" aria-hidden="true" />
        <span className="rt-tick tl" aria-hidden="true" />
        <span className="rt-tick tr" aria-hidden="true" />
        <div className="rt-det-hero-inner">
          <nav className="rt-crumbs" aria-label="Konum">
            <Link href="/">Ana sayfa</Link>
            <span className="sep">›</span>
            <Link href="/egitmenler">Eğitmenler</Link>
            <span className="sep">›</span>
            <span className="curr">{h.ad}</span>
          </nav>

          <div className="rt-hoca-split">
            {/* 4:5 dikey portre kartı */}
            {h.foto && (
              <div className="rt-hoca-portre-kart">
                <div className="rt-kadro-foto">
                  <Image
                    src={h.foto}
                    alt={`${h.ad} — eğitmen portresi`}
                    fill
                    sizes="(max-width: 760px) 260px, 300px"
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </div>
              </div>
            )}

            <div>
              {h.unvan && <div className="rt-hoca-unvan-eyebrow">{h.unvan}</div>}
              <h1 className="rt-hoca-ad">{h.ad}</h1>

              {h.egitimler.length > 0 && (
                <div className="rt-hoca-meta">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--rt-gold-500)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                  <span>{h.egitimler.length} eğitim veriyor</span>
                </div>
              )}

              <div style={{ marginTop: 'clamp(28px,4vh,38px)' }}>
                <a
                  className="rt-cta"
                  href="#bilgi"
                  style={{ padding: '14px 28px', letterSpacing: '0.08em', textTransform: 'uppercase', gap: 11, display: 'inline-flex' }}
                >
                  Bilgi istiyorum
                  <OkIkon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 2. ÖZGEÇMİŞ (biosuzda gizli) ============ */}
      {h.bioParagraflar.length > 0 && (
        <section style={{ padding: 'clamp(52px,7vw,88px) 0 clamp(8px,2vw,20px)' }}>
          <div className="rt-container rt-reveal" style={{ maxWidth: 868 }}>
            <div className="rt-det-h2row">
              <h2 className="rt-det-h2">Özgeçmiş</h2>
              <span className="line" aria-hidden="true" />
            </div>
            <BioAcilir paragraflar={h.bioParagraflar} />
          </div>
        </section>
      )}

      {/* ============ 3. VERDİĞİ EĞİTİMLER (yoksa gizli) ============ */}
      {h.egitimler.length > 0 && (
        <section style={{ padding: 'clamp(52px,7vw,88px) 0 clamp(56px,8vw,96px)' }}>
          <div className="rt-container rt-reveal">
            <div className="rt-det-h2row" style={{ marginBottom: 32 }}>
              <h2 className="rt-det-h2" style={{ whiteSpace: 'nowrap' }}>Verdiği eğitimler</h2>
              <span className="line" aria-hidden="true" />
              <span className="say">{h.egitimler.length} eğitim</span>
            </div>

            <div className="rt-hoca-dersler">
              {h.egitimler.map((e) => (
                <Link key={e.id} className="rt-card" href={`/egitimler/${e.slug}`}>
                  <div className="rt-card-cover" style={{ height: 148 }}>
                    <Image
                      src={e.kapak}
                      alt={`${e.ad} eğitimi kapak görseli`}
                      fill
                      sizes="(max-width: 640px) 100vw, 320px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="rt-card-body">
                    {e.kategori && <div className="rt-card-cat">{e.kategori}</div>}
                    <h3 className="rt-card-title" style={{ fontSize: '1.32rem' }}>{e.ad}</h3>
                    <div className="rt-card-meta">
                      {e.sure && (
                        <span>
                          <SaatIkon />
                          {e.sure}
                        </span>
                      )}
                      {e.videoSayisi ? (
                        <span>
                          <VideoIkon />
                          {e.videoSayisi} video
                        </span>
                      ) : null}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ 4. ALT BANT — BİLGİ TALEBİ ============ */}
      <section id="bilgi" className="rt-section" style={{ paddingTop: 'clamp(24px,4vw,40px)', scrollMarginTop: 110 }}>
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
              Eğitmenlerimizle çalışmak ister misiniz?
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
              Bilgilerinizi bırakın; eğitim danışmanınız sizi arayıp, size uygun programı ve doğru
              eğitmeni birlikte değerlendirelim.
            </p>
            <Link
              className="rt-cta"
              href="/#iletisim"
              style={{ marginTop: 28, padding: '14px 28px', letterSpacing: '0.08em', textTransform: 'uppercase', gap: 10, display: 'inline-flex' }}
            >
              Bilgi formunu açın
              <OkIkon />
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
