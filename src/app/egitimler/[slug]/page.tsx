// Eğitim detay sayfası — Claude Design "Eğitim Detay.dc.html" handoff'unun kodu.
// Reklam trafiğinin düştüğü dönüşüm sayfası: SSR + eğitime özel meta/OG +
// Course structured data + gömülü bilgi formu (Lead eğitim kırılımıyla atılır).
// 75 slug build'de önceden çizilir; içerik saatlik tazelenir.

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '@/components/rota/SiteHeader';
import SiteFooter from '@/components/rota/SiteFooter';
import RevealInit from '@/components/rota/RevealInit';
import EgitimDetayForm from '@/components/rota/EgitimDetayForm';
import { getEgitimDetay, getEgitimSluglari, getIlgiliEgitimler } from '@/lib/rota';

export const revalidate = 3600;

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const sluglar = await getEgitimSluglari();
  return sluglar.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const e = await getEgitimDetay(slug);
  if (!e) return { title: 'Eğitim bulunamadı' };

  // Description: eğitimin kendi açıklamasının ilk cümleleri (~155 karakter)
  const ham = e.paragraflar.join(' ');
  const desc = ham.length > 155 ? `${ham.slice(0, 152).trimEnd()}…` : ham || `${e.ad} sertifikalı eğitim programı.`;

  return {
    title: `${e.ad} Eğitimi`,
    description: desc,
    alternates: { canonical: `/egitimler/${e.slug}` },
    openGraph: {
      title: `${e.ad} Eğitimi | Yeni Rota Eğitim Kurumları`,
      description: desc,
      url: `https://yenirotaegitim.com/egitimler/${e.slug}`,
      siteName: 'Yeni Rota Eğitim Kurumları',
      // OG görseli = eğitimin kendi kapağı; paylaşımda o eğitim görünür
      images: e.kapak ? [{ url: e.kapak, alt: `${e.ad} eğitimi` }] : undefined,
      locale: 'tr_TR',
      type: 'website',
    },
  };
}

function SaatIkon({ boyut = 17 }: { boyut?: number }) {
  return (
    <svg width={boyut} height={boyut} viewBox="0 0 24 24" fill="none" stroke="var(--rt-fg-gold)" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function VideoIkon({ boyut = 17 }: { boyut?: number }) {
  return (
    <svg width={boyut} height={boyut} viewBox="0 0 24 24" fill="none" stroke="var(--rt-fg-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="14" height="12" rx="2" />
      <path d="m22 8-6 4 6 4V8z" />
    </svg>
  );
}

function AsideIkon({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        flexShrink: 0,
        width: 34,
        height: 34,
        borderRadius: 999,
        background: 'color-mix(in srgb, var(--rt-accent) 12%, transparent)',
        border: '1px solid var(--rt-border-strong)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--rt-accent)',
      }}
    >
      {children}
    </span>
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

export default async function EgitimDetaySayfasi({ params }: Params) {
  const { slug } = await params;
  const e = await getEgitimDetay(slug);
  if (!e) notFound();

  const ilgili = await getIlgiliEgitimler(e.kategori, e.slug, 4);
  const yarim = Math.ceil(e.mufredat.length / 2);
  const solKonular = e.mufredat.slice(0, yarim);
  const sagKonular = e.mufredat.slice(yarim);
  const num = (i: number) => String(i + 1).padStart(2, '0');

  const courseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: e.ad,
    description: e.paragraflar.join(' ').slice(0, 500),
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Yeni Rota Eğitim Kurumları',
      url: 'https://yenirotaegitim.com',
    },
    url: `https://yenirotaegitim.com/egitimler/${e.slug}`,
    ...(e.kapak ? { image: e.kapak } : {}),
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://yenirotaegitim.com' },
      { '@type': 'ListItem', position: 2, name: 'Eğitimler', item: 'https://yenirotaegitim.com/egitimler' },
      { '@type': 'ListItem', position: 3, name: e.ad, item: `https://yenirotaegitim.com/egitimler/${e.slug}` },
    ],
  };

  return (
    <div className="rt-site">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />
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
            <Link href="/egitimler">Eğitimler</Link>
            <span className="sep">›</span>
            <span className="curr">{e.ad}</span>
          </nav>

          {e.kategori && (
            <span className="rt-det-cat-pill">
              <i aria-hidden="true" />
              {e.kategori}
            </span>
          )}

          <h1 className="rt-det-title">{e.ad}</h1>

          <div className="rt-det-meta">
            {e.sure && (
              <span className="item">
                <SaatIkon />
                {e.sure}
              </span>
            )}
            {e.sure && e.videoSayisi ? <span className="dot" aria-hidden="true" /> : null}
            {e.videoSayisi ? (
              <span className="item">
                <VideoIkon />
                {e.videoSayisi} video
              </span>
            ) : null}
          </div>

          <div style={{ marginTop: 34 }}>
            <a
              className="rt-cta"
              href="#form"
              style={{ padding: '14px 28px', letterSpacing: '0.08em', textTransform: 'uppercase', gap: 11, display: 'inline-flex' }}
            >
              Bilgi istiyorum
              <OkIkon />
            </a>
          </div>
        </div>
      </section>

      {/* ============ İÇERİK — İKİ SÜTUN ============ */}
      <section>
        <div className="rt-det-grid">
          {/* ===== SOL: ANA İÇERİK ===== */}
          <div>
            {/* 2. Kapak */}
            {e.kapak && (
              <div className="rt-det-cover rt-reveal">
                <Image
                  src={e.kapak}
                  alt={`${e.ad} eğitimi kapak görseli`}
                  fill
                  sizes="(max-width: 960px) 100vw, 680px"
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            )}

            {/* 3. Açıklama */}
            {e.paragraflar.length > 0 && (
              <div className="rt-reveal" style={{ marginTop: 'clamp(40px,5vw,56px)' }}>
                <div className="rt-det-h2row">
                  <h2 className="rt-det-h2">Eğitim hakkında</h2>
                  <span className="line" aria-hidden="true" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {e.paragraflar.map((p, i) => (
                    <p key={i} className="rt-det-para">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Müfredat — madde = numara + başlık (+ transkript projesiyle açıklama slotu) */}
            {e.mufredat.length > 0 && (
              <div className="rt-reveal" style={{ marginTop: 'clamp(48px,6vw,68px)' }}>
                <div className="rt-det-h2row">
                  <h2 className="rt-det-h2">Müfredat</h2>
                  <span className="line" aria-hidden="true" />
                  <span className="say">{e.mufredat.length} konu başlığı</span>
                </div>
                <div className="rt-det-mufredat">
                  <div>
                    {solKonular.map((k, i) => (
                      <div key={i} className="rt-det-konu">
                        <span className="rt-det-konu-num">{num(i)}</span>
                        <div>
                          <div className="rt-det-konu-title">{k}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    {sagKonular.map((k, i) => (
                      <div key={i} className="rt-det-konu">
                        <span className="rt-det-konu-num">{num(i + yarim)}</span>
                        <div>
                          <div className="rt-det-konu-title">{k}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 5. Eğitmen — hoca yoksa bölüm hiç görünmez */}
            {e.hoca && (
              <div className="rt-reveal" style={{ marginTop: 'clamp(48px,6vw,68px)' }}>
                <div className="rt-det-h2row">
                  <h2 className="rt-det-h2">Eğitmen</h2>
                  <span className="line" aria-hidden="true" />
                </div>
                <div className="rt-det-hoca">
                  {e.hoca.foto && (
                    <div className="rt-det-hoca-foto">
                      <Image src={e.hoca.foto} alt={e.hoca.ad} fill sizes="148px" style={{ objectFit: 'cover' }} />
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: 240 }}>
                    <div className="rt-det-hoca-ad">{e.hoca.ad}</div>
                    {e.hoca.unvan && <div className="rt-det-hoca-unvan">{e.hoca.unvan}</div>}
                    {e.hoca.bio && <p className="rt-det-hoca-bio">{e.hoca.bio}</p>}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ===== SAĞ: YAPIŞKAN BİLGİ KARTI ===== */}
          <aside className="rt-det-aside">
            <div className="rt-det-cta-kart">
              <span className="rt-tick tl" style={{ top: 12, left: 12, width: 14, height: 14 }} aria-hidden="true" />
              <span className="rt-tick tr" style={{ top: 12, right: 12, width: 14, height: 14 }} aria-hidden="true" />

              <div className="rt-eyebrow" style={{ fontSize: 11, letterSpacing: '0.22em', marginBottom: 12 }}>
                Bilgi talebi
              </div>
              <div className="rt-det-cta-title">Bu eğitim hakkında bilgi alın</div>
              <p className="rt-det-cta-sub">
                Ad ve telefonunuzu bırakın; eğitim danışmanınız sizi arayıp tüm ayrıntıları anlatsın.
              </p>

              <div className="rt-det-cta-sep" aria-hidden="true" />

              <div className="rt-det-cta-rows">
                {e.sure && (
                  <div className="rt-det-cta-row">
                    <AsideIkon>
                      <SaatIkon boyut={16} />
                    </AsideIkon>
                    <span>{e.sure}</span>
                  </div>
                )}
                {e.videoSayisi ? (
                  <div className="rt-det-cta-row">
                    <AsideIkon>
                      <VideoIkon boyut={16} />
                    </AsideIkon>
                    <span>{e.videoSayisi} video · kendi hızınızda</span>
                  </div>
                ) : null}
                <div className="rt-det-cta-row">
                  <AsideIkon>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                  </AsideIkon>
                  <span>Canlı ders desteği</span>
                </div>
                <div className="rt-det-cta-row">
                  <AsideIkon>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <path d="m9 15 2 2 4-4" />
                    </svg>
                  </AsideIkon>
                  <span>Programın niteliğine uygun sertifika</span>
                </div>
              </div>

              <a
                className="rt-cta"
                href="#form"
                style={{
                  marginTop: 26,
                  width: '100%',
                  boxSizing: 'border-box',
                  justifyContent: 'center',
                  gap: 10,
                  padding: '15px 24px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Bilgi formunu doldurun
                <OkIkon />
              </a>
              <div className="rt-det-cta-note">Görüşmeler ücretsiz ve yükümlülük içermez.</div>
            </div>
          </aside>
        </div>
      </section>

      {/* ============ 6. BİLGİ FORMU (gömülü) ============ */}
      <section id="form" className="rt-section rt-section-alt" style={{ scrollMarginTop: 110 }}>
        <div className="rt-container">
          <div className="rt-form-grid rt-reveal">
            <div className="rt-pusula-kart">
              <svg className="watermark" viewBox="0 0 24 24" fill="none" stroke="#c9a961" strokeWidth="0.6" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88z" />
              </svg>
              <div className="rt-eyebrow">Bilgi Talebi</div>
              <div className="rt-pusula-title">Bu eğitim size uygun mu, birlikte değerlendirelim</div>
              <p className="rt-pusula-sub">
                “{e.ad}” hakkında ad ve telefon bilgilerinizi bırakın; eğitim danışmanınız en kısa
                sürede sizinle iletişime geçsin. Tüm görüşmeler ücretsiz ve yükümlülük içermez.
              </p>
              <div className="rt-pusula-motto">Doğru bilgiye, doğru rotadan.</div>
            </div>
            <EgitimDetayForm egitimAd={e.ad} kategori={e.kategori} />
          </div>
        </div>
      </section>

      {/* ============ 7. İLGİLİ EĞİTİMLER ============ */}
      {ilgili.length > 0 && (
        <section className="rt-section">
          <div className="rt-container">
            <div className="rt-section-head rt-reveal">
              <div>
                <div className="rt-eyebrow" style={{ marginBottom: 16 }}>Aynı alandan</div>
                <h2 className="rt-h2">İlgili eğitimler</h2>
              </div>
              <Link className="rt-pill-link" href="/egitimler">
                Tüm eğitimler
                <OkIkon />
              </Link>
            </div>

            <div className="rt-cat-grid" style={{ marginTop: 40 }}>
              {ilgili.map((k) => (
                <Link key={k.id} className="rt-card rt-reveal" href={`/egitimler/${k.slug}`}>
                  <div className="rt-card-cover" style={{ height: 150 }}>
                    <Image
                      src={k.kapak}
                      alt={`${k.ad} eğitimi kapak görseli`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 280px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="rt-card-body">
                    {k.kategori && <div className="rt-card-cat">{k.kategori}</div>}
                    <h3 className="rt-card-title" style={{ fontSize: '1.28rem' }}>{k.ad}</h3>
                    <div className="rt-card-meta">
                      {k.sure && (
                        <span>
                          <SaatIkon boyut={14} />
                          {k.sure}
                        </span>
                      )}
                      {k.videoSayisi ? (
                        <span>
                          <VideoIkon boyut={14} />
                          {k.videoSayisi} video
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

      <SiteFooter />
    </div>
  );
}
