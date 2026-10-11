// İletişim sayfası — Claude Design "İletişim.dc.html" handoff'unun kodu.
// Solda kurum iletişim kartları (Ankara merkez + telefon/WhatsApp/e-posta/saatler
// + sosyal), sağda bilgi formu (ana sayfadaki BilgiFormu — /api/basvuru + Lead).
// İkinci merkez (İstanbul) MERKEZLER dizisine tek kayıt eklenerek açılır.

import type { Metadata } from 'next';
import SiteHeader from '@/components/rota/SiteHeader';
import SiteFooter from '@/components/rota/SiteFooter';
import RevealInit from '@/components/rota/RevealInit';
import BilgiFormu from '@/components/rota/BilgiFormu';

export const metadata: Metadata = {
  title: 'İletişim',
  description:
    'Yeni Rota Eğitim Kurumları iletişim: Şehit Daniş Tunalıgil Sk. No: 2/5 Maltepe, Çankaya/Ankara · +90 312 285 76 82 · info@yenirotaegitim.com',
  alternates: { canonical: '/iletisim' },
  openGraph: {
    title: 'İletişim | Yeni Rota Eğitim Kurumları',
    description: 'Sorularınız için buradayız; arayın, yazın ya da bilgilerinizi bırakın, biz sizi arayalım.',
    url: 'https://yenirotaegitim.com/iletisim',
    siteName: 'Yeni Rota Eğitim Kurumları',
    images: [{ url: '/marka/kare-on-dark-1080.png', width: 1080, height: 1080, alt: 'Yeni Rota Eğitim Kurumları' }],
    locale: 'tr_TR',
    type: 'website',
  },
};

// İstanbul merkezi açıldığında buraya ikinci kayıt eklenir.
const MERKEZLER = [
  {
    ad: 'Ankara Merkez',
    adres: ['Şehit Daniş Tunalıgil Sokak No: 2/5', 'Maltepe, Çankaya / Ankara'],
    yolTarifi:
      'https://www.google.com/maps/search/?api=1&query=%C5%9Eehit+Dani%C5%9F+Tunal%C4%B1gil+Sokak+No+2+Maltepe+%C3%87ankaya+Ankara',
  },
];

const iletisimJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'İletişim | Yeni Rota Eğitim Kurumları',
  url: 'https://yenirotaegitim.com/iletisim',
  mainEntity: {
    '@type': 'EducationalOrganization',
    name: 'Yeni Rota Eğitim Kurumları',
    url: 'https://yenirotaegitim.com',
    telephone: '+903122857682',
    email: 'info@yenirotaegitim.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Şehit Daniş Tunalıgil Sokak No: 2/5, Maltepe',
      addressLocality: 'Çankaya',
      addressRegion: 'Ankara',
      addressCountry: 'TR',
    },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '10:00', closes: '18:30' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '10:00', closes: '16:00' },
    ],
    sameAs: ['https://www.instagram.com/rotaedu.tr/', 'https://www.youtube.com/channel/UCY80SMr7A6CaLZgXH0GznYA'],
  },
};
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://yenirotaegitim.com' },
    { '@type': 'ListItem', position: 2, name: 'İletişim', item: 'https://yenirotaegitim.com/iletisim' },
  ],
};

function KonumIkon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function OkIkon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export default function IletisimSayfasi() {
  return (
    <div className="rt-site">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(iletisimJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <RevealInit />
      <SiteHeader />

      {/* ============ ÜST ŞERİT (koyu-sabit) ============ */}
      <section className="rt-cat-hero">
        <div className="rt-cat-glow" aria-hidden="true" />
        <span className="rt-tick tl" aria-hidden="true" />
        <span className="rt-tick tr" aria-hidden="true" />
        <div className="rt-cat-hero-inner">
          <div className="rt-cat-eyebrow">İletişim</div>
          <h1 className="rt-cat-title">İletişim</h1>
          <p className="rt-cat-sub">
            Sorularınız için buradayız; arayın, yazın ya da bilgilerinizi bırakın, biz sizi
            arayalım.
          </p>
        </div>
      </section>

      {/* ============ İKİ SÜTUNLU GÖVDE ============ */}
      <section className="rt-section" style={{ paddingTop: 'clamp(52px,7vw,88px)' }}>
        <div className="rt-container">
          <div className="rt-ilet-grid">
            {/* ==== SOL: İLETİŞİM KARTLARI ==== */}
            <div className="rt-reveal" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {MERKEZLER.map((m) => (
                <div key={m.ad} className="rt-ilet-kart">
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                    <span className="rt-ilet-ikon">
                      <KonumIkon />
                    </span>
                    <div style={{ minWidth: 0 }}>
                      <div className="rt-ilet-etiket" style={{ marginBottom: 8 }}>Merkez</div>
                      <h2
                        style={{
                          fontFamily: 'var(--rt-font-display)',
                          fontWeight: 500,
                          fontSize: '1.5rem',
                          lineHeight: 1.15,
                          color: 'var(--rt-fg)',
                          margin: 0,
                        }}
                      >
                        {m.ad}
                      </h2>
                      <p style={{ margin: '12px 0 0', fontSize: 15, lineHeight: 1.65, color: 'var(--rt-fg-muted)' }}>
                        {m.adres[0]}
                        <br />
                        {m.adres[1]}
                      </p>
                      <a className="rt-ilet-yoltarifi" href={m.yolTarifi} target="_blank" rel="noopener">
                        Yol tarifi alın
                        <OkIkon />
                      </a>
                    </div>
                  </div>
                </div>
              ))}

              {/* iletişim bilgileri */}
              <div className="rt-ilet-kart" style={{ paddingTop: 8, paddingBottom: 8 }}>
                <a className="rt-ilet-satir" href="tel:+903122857682">
                  <span className="rt-ilet-ikon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </span>
                  <span style={{ minWidth: 0 }}>
                    <span className="rt-ilet-etiket">Telefon</span>
                    <span className="rt-ilet-deger" style={{ fontVariantNumeric: 'tabular-nums' }}>+90 312 285 76 82</span>
                  </span>
                </a>

                <a className="rt-ilet-satir" href="https://wa.me/903122857682" target="_blank" rel="noopener">
                  <span className="rt-ilet-ikon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                    </svg>
                  </span>
                  <span style={{ minWidth: 0 }}>
                    <span className="rt-ilet-etiket">WhatsApp</span>
                    <span className="rt-ilet-deger">WhatsApp&apos;tan yazın</span>
                  </span>
                </a>

                <a className="rt-ilet-satir" href="mailto:info@yenirotaegitim.com">
                  <span className="rt-ilet-ikon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </span>
                  <span style={{ minWidth: 0 }}>
                    <span className="rt-ilet-etiket">E-posta</span>
                    <span className="rt-ilet-deger">info@yenirotaegitim.com</span>
                  </span>
                </a>

                <div className="rt-ilet-satir" style={{ alignItems: 'flex-start' }}>
                  <span className="rt-ilet-ikon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </span>
                  <span style={{ minWidth: 0 }}>
                    <span className="rt-ilet-etiket" style={{ marginBottom: 6 }}>Çalışma saatleri</span>
                    <span style={{ display: 'block', fontSize: 14.5, lineHeight: 1.7, color: 'var(--rt-fg-muted)' }}>
                      Hafta içi 10.00–18.30
                      <br />
                      Cumartesi 10.00–16.00
                      <br />
                      Pazar kapalı
                    </span>
                  </span>
                </div>
              </div>

              {/* sosyal medya */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '4px 4px 0' }}>
                <span className="rt-ilet-etiket" style={{ marginBottom: 0 }}>Bizi takip edin</span>
                <div className="rt-social">
                  <a href="https://www.instagram.com/rotaedu.tr/" target="_blank" rel="noopener" aria-label="Instagram">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
                    </svg>
                  </a>
                  <a href="https://www.youtube.com/channel/UCY80SMr7A6CaLZgXH0GznYA" target="_blank" rel="noopener" aria-label="YouTube">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* ==== SAĞ: BİLGİ FORMU ==== */}
            <div id="bilgi-formu" className="rt-reveal" style={{ scrollMarginTop: 110 }}>
              <BilgiFormu />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
