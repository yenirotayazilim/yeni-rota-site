// Yeni ana sayfa — Claude Design "Yeni Rota Ana Sayfa" handoff'unun kodu.
// Sunucuda çizilir (SEO), veriler Supabase'den saatlik tazelenir.

import Image from 'next/image';
import Link from 'next/link';
import Hero from '@/components/rota/Hero';
import SiteHeader from '@/components/rota/SiteHeader';
import SiteFooter from '@/components/rota/SiteFooter';
import BilgiFormu from '@/components/rota/BilgiFormu';
import RevealInit from '@/components/rota/RevealInit';
import GuvenRakamlari from '@/components/rota/GuvenRakamlari';
import SssAkordeon from '@/components/rota/SssAkordeon';
import { getAktifEgitimSayisi, getEgitmenler, getOneCikanEgitimler, getTumKapaklar } from '@/lib/rota';
import { SSS_LISTESI } from '@/lib/sss';

export const revalidate = 3600;

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Yeni Rota Eğitim Kurumları',
  url: 'https://yenirotaegitim.com',
  logo: 'https://yenirotaegitim.com/marka/kare-on-dark-1080.png',
  telephone: '+903122857682',
  email: 'info@yenirotaegitim.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Şehit Daniş Tunalıgil Sokak No: 2/5, Maltepe',
    addressLocality: 'Çankaya',
    addressRegion: 'Ankara',
    addressCountry: 'TR',
  },
  sameAs: [
    'https://www.instagram.com/rotaedu.tr/',
    'https://www.youtube.com/channel/UCY80SMr7A6CaLZgXH0GznYA',
  ],
};

// SSS içeriğini Google'a da işaretle — arama sonucunda soru-cevap kutuları çıkar
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: SSS_LISTESI.map((s) => ({
    '@type': 'Question',
    name: s.soru,
    acceptedAnswer: { '@type': 'Answer', text: s.cevap },
  })),
};

const DURAKLAR = [
  { no: 1, baslik: 'Rotanızı çizin', metin: 'Eğitim danışmanınızla size uygun programı birlikte belirleyin.' },
  { no: 2, baslik: 'Kendi hızınızda ilerleyin', metin: 'Ders videolarını dilediğiniz yerde, dilediğiniz saatte izleyin.' },
  { no: 3, baslik: 'Canlı derslere katılın', metin: 'Eğitmenlerinizle çevrim içi canlı derslerde buluşun, sorularınızı sorun.' },
  { no: 4, baslik: 'Uygulamaya gelin', metin: 'Ankara ve İstanbul’daki eğitim merkezlerimizde hafta sonu yüz yüze uygulama ve süpervizyon eğitimi alın.' },
];

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
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 12.5-9.17 4.16a2 2 0 0 1-1.66 0L2 12.5" />
    </svg>
  );
}

export default async function AnaSayfa() {
  const [egitimler, egitmenler, kapaklar, programSayisi] = await Promise.all([
    getOneCikanEgitimler(),
    getEgitmenler(),
    getTumKapaklar(),
    getAktifEgitimSayisi(),
  ]);

  return (
    <div className="rt-site">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <RevealInit />
      <SiteHeader />

      <Hero covers={kapaklar} />

      {/* ============ 1. KURUM TANITIMI + GÜVEN RAKAMLARI ============ */}
      <section id="kurumsal" className="rt-section">
        <div className="rt-container">
          <div className="rt-reveal" style={{ maxWidth: 720 }}>
            <div className="rt-eyebrow" style={{ marginBottom: 20 }}>Kurumumuz</div>
            <h2 className="rt-h2">On yıldır, öğrenmeyi hak ettiği ciddiyetle ele alıyoruz</h2>
            <p className="rt-lead" style={{ margin: '26px 0 0' }}>
              Yeni Rota Eğitim Kurumları, Millî Eğitim Bakanlığı onaylı eğitim kurumu olarak;
              alanında yetkin eğitmenler eşliğinde hazırlanan programları binlerce yetişkin
              öğrenciye ulaştırmaktadır. Amacımız, mesleki ve kişisel gelişiminizi güvenilir, ölçülü
              ve erişilebilir bir çerçevede desteklemektir.
            </p>
          </div>

          <GuvenRakamlari
            rakamlar={[
              // Öğrenci sayısı: Mustafa gerçek rakamı verince güncellenecek yer tutucu
              { hedef: 5800, etiket: 'Mezun ve kayıtlı öğrenci', artiIsareti: true },
              { hedef: programSayisi, etiket: 'Sertifikalı ders programı' },
              { hedef: 11, etiket: 'Yıllık kurumsal deneyim' },
            ]}
          />

          <div className="rt-meb-note rt-reveal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--rt-fg-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <path d="m9 15 2 2 4-4" />
            </svg>
            Kurumumuz Millî Eğitim Bakanlığı ruhsatlı bir özel öğretim kurumudur; programı tamamlayan öğrencilere programın niteliğine uygun sertifika düzenlenir.
          </div>
        </div>
      </section>

      {/* ============ ROTANIZ — HİBRİT EĞİTİM YOLCULUĞU ============ */}
      <section id="rotaniz" className="rt-section rt-rota">
        <div className="rt-container">
          <div className="rt-reveal" style={{ maxWidth: 680 }}>
            <div className="rt-eyebrow" style={{ marginBottom: 20 }}>Rotanız</div>
            <h2 className="rt-h2">Video, canlı ders ve yüz yüze uygulama; tek bir rotada</h2>
            <p className="rt-lead" style={{ margin: '24px 0 0' }}>
              Eğitim modelimiz üç ayak üzerine kuruludur: kendi hızınızda izlediğiniz ders
              videoları, eğitmenlerinizle buluştuğunuz canlı dersler ve merkezimizde aldığınız yüz
              yüze uygulama. Bu üçü, aşağıdaki dört duraklı rotada birleşir.
            </p>
          </div>

          <div className="rt-rota-wrap rt-reveal">
            <div className="rt-rota-line" aria-hidden="true" />
            <div className="rt-rota-grid">
              {DURAKLAR.map((d) => (
                <div key={d.no} className="rt-durak">
                  <div className={`rt-durak-num${d.no === 4 ? ' son' : ''}`}>{d.no}</div>
                  <h3>{d.baslik}</h3>
                  <p>{d.metin}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 2. ÖNE ÇIKAN EĞİTİMLER ============ */}
      <section id="egitimler" className="rt-section rt-section-alt">
        <div className="rt-container">
          <div className="rt-section-head rt-reveal">
            <div style={{ maxWidth: 640 }}>
              <div className="rt-eyebrow" style={{ marginBottom: 18 }}>Eğitimlerimiz</div>
              <h2 className="rt-h2">Öne çıkan eğitimler</h2>
              <p className="rt-lead" style={{ margin: '20px 0 0' }}>
                Kişisel gelişim, psikoloji, sağlık ve spor alanlarında en çok tercih edilen
                programlarımızı sizin için derledik.
              </p>
            </div>
            <Link className="rt-pill-link" href="/egitimler">
              Tüm eğitimleri görün
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="rt-card-grid">
            {egitimler.map((e) => (
              <Link key={e.id} className="rt-card rt-reveal" href={e.slug ? `/egitimler/${e.slug}` : '/egitimler'}>
                <div className="rt-card-cover">
                  <Image
                    src={e.kapak}
                    alt={`${e.ad} eğitimi kapak görseli`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 360px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="rt-card-body">
                  {e.kategori && <div className="rt-card-cat">{e.kategori}</div>}
                  <h3 className="rt-card-title">{e.ad}</h3>
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

      {/* ============ ROTA PLUS — UYGULAMA BANDI ============ */}
      <section id="rotaplus" className="rt-section">
        <div className="rt-container">
          <div className="rt-band">
            <div className="rt-phone rt-reveal">
              <div className="rt-phone-notch" />
              <div className="rt-phone-screen">
                <img
                  src="/marka/app-ekran.png"
                  alt="Rota Plus uygulaması ana ekranı"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>

            <div className="rt-band-content rt-reveal">
              <img
                className="rt-only-dark"
                src="/marka/rotaplus-wordmark.png"
                srcSet="/marka/rotaplus-wordmark.png 1x, /marka/rotaplus-wordmark-2x.png 2x"
                alt="Rota Plus"
                style={{ height: 92, width: 'auto', marginBottom: 22, marginLeft: -10 }}
              />
              <img
                className="rt-only-light"
                src="/marka/rotaplus-wordmark-dark.png"
                srcSet="/marka/rotaplus-wordmark-dark.png 1x, /marka/rotaplus-wordmark-dark-2x.png 2x"
                alt="Rota Plus"
                style={{ height: 92, width: 'auto', marginBottom: 22, marginLeft: -10 }}
              />
              <h2 className="rt-h2">Eğitiminiz cebinizde</h2>
              <p className="rt-lead" style={{ margin: '22px 0 0', maxWidth: '46ch' }}>
                Rota Plus uygulamasıyla derslerinizi, canlı ders takviminizi ve sertifika sürecinizi
                tek bir yerden takip edin.
              </p>

              <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="rt-feature-row">
                  <span className="rt-feature-ikon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9" />
                      <path d="m10 8 5 3-5 3z" />
                      <path d="M2 20h20" />
                    </svg>
                  </span>
                  <span>Ders videolarına dilediğiniz an erişim</span>
                </div>
                <div className="rt-feature-row">
                  <span className="rt-feature-ikon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                  </span>
                  <span>Canlı ders takvimi ve hatırlatmalar</span>
                </div>
                <div className="rt-feature-row">
                  <span className="rt-feature-ikon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 11l3 3L22 4" />
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                  </span>
                  <span>Sınavlar ve karne</span>
                </div>
                <div className="rt-feature-row">
                  <span className="rt-feature-ikon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="6" />
                      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                    </svg>
                  </span>
                  <span>Sertifika süreç takibi</span>
                </div>
              </div>

              <div style={{ marginTop: 36, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <a className="rt-store-btn" href="https://apps.apple.com/tr/app/id6776734802" rel="noopener" target="_blank">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 12.04c-.03-2.6 2.13-3.85 2.22-3.91-1.21-1.77-3.1-2.01-3.76-2.04-1.6-.16-3.12.94-3.93.94-.81 0-2.06-.92-3.39-.9-1.74.03-3.35 1.01-4.25 2.57-1.81 3.14-.46 7.79 1.3 10.34.86 1.25 1.89 2.65 3.23 2.6 1.3-.05 1.79-.84 3.36-.84 1.57 0 2.01.84 3.38.81 1.4-.02 2.28-1.27 3.13-2.53.99-1.45 1.4-2.85 1.42-2.92-.03-.01-2.72-1.04-2.75-4.13zM14.53 4.6c.72-.87 1.2-2.08 1.07-3.29-1.03.04-2.28.69-3.02 1.56-.66.77-1.24 2-1.09 3.18 1.15.09 2.32-.58 3.04-1.45z" />
                  </svg>
                  <span>
                    <span className="ust">İndir</span>
                    <span className="alt">App Store</span>
                  </span>
                </a>
                <a className="rt-store-btn" href="https://play.google.com/store/apps/details?id=com.yenirotaegitim.rotaedu" rel="noopener" target="_blank">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M3.6 2.3 13.4 12 3.6 21.7c-.37-.2-.6-.6-.6-1.1V3.4c0-.5.23-.9.6-1.1z" fill="var(--rt-accent)" />
                    <path d="m16.9 8.5 2.9 1.6c.9.5.9 1.8 0 2.3l-2.9 1.6L14 12l2.9-3.5z" fill="var(--rt-fg-gold)" />
                    <path d="M3.6 2.3c.28-.15.63-.18.98.02L16.9 8.5 14 11.4 3.6 2.3zM14 12.6l2.9 2.9-12.32 6.16c-.35.2-.7.17-.98.02L14 12.6z" fill="var(--rt-fg-muted)" />
                  </svg>
                  <span>
                    <span className="ust">İndir</span>
                    <span className="alt">Google Play</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 3. EĞİTMEN ŞERİDİ ============ */}
      <section id="egitmenler" className="rt-section" style={{ paddingLeft: 0, paddingRight: 0 }}>
        <div className="rt-container rt-reveal">
          <div className="rt-eyebrow" style={{ marginBottom: 18 }}>Kadromuz</div>
          <h2 className="rt-h2">Eğitmenlerimiz</h2>
          <p className="rt-lead" style={{ margin: '20px 0 0', maxWidth: 640 }}>
            Programlarımız, alanında uzun yıllar deneyim kazanmış öğretim görevlileri ve uzmanlar
            tarafından hazırlanmaktadır.
          </p>
        </div>
        <div className="rt-strip">
          <div className="rt-strip-row">
            {egitmenler.map((h) => (
              <div key={h.ad} className="rt-instr rt-reveal">
                <div className="rt-instr-photo">
                  <Image src={h.foto} alt={h.ad} fill sizes="236px" style={{ objectFit: 'cover' }} />
                </div>
                <div className="rt-instr-name">{h.ad}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SSS AKORDEONU ============ */}
      <section id="sss" className="rt-section rt-section-alt">
        <div className="rt-container" style={{ maxWidth: 868 }}>
          <div className="rt-reveal" style={{ maxWidth: 640 }}>
            <div className="rt-eyebrow" style={{ marginBottom: 20 }}>S.S.S.</div>
            <h2 className="rt-h2">Sıkça sorulan sorular</h2>
          </div>
          <div className="rt-reveal">
            <SssAkordeon />
          </div>
        </div>
      </section>

      {/* ============ 4. BİLGİ İSTİYORUM ============ */}
      <section id="iletisim" className="rt-section">
        <div className="rt-container">
          <div className="rt-form-grid">
            <div className="rt-pusula-kart rt-reveal">
              <img className="watermark" src="/marka/muhur-gold.svg" alt="" aria-hidden="true" />
              <div className="rt-eyebrow" style={{ fontSize: 11, letterSpacing: '0.22em' }}>Bilgi Talebi</div>
              <div className="rt-pusula-title">Size en uygun programı birlikte belirleyelim</div>
              <p className="rt-pusula-sub">
                Ad ve telefon bilgilerinizi bırakın; eğitim danışmanınız en kısa sürede sizinle
                iletişime geçsin. Tüm görüşmeler ücretsiz ve yükümlülük içermez.
              </p>
              <div className="rt-pusula-motto">Doğru bilgiye, doğru rotadan.</div>
            </div>
            <div className="rt-reveal">
              <BilgiFormu />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
