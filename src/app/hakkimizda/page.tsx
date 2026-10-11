// Hakkımızda — Claude Design "Hakkımızda.dc.html" handoff'unun kodu.
// Fotoğrafsız, editoryal güven/hikaye sayfası. MEB dili korunuyor:
// "MEB ruhsatlı özel öğretim kurumu" (kurum düzeyi) + "akreditasyon içeriğe göre değişir";
// "tüm programlar MEB onaylı" / "uzaktan eğitim kurumu" ASLA yazılmaz.
// ⚠️ Mobil app BU SAYFAYI (yenirotaegitim.com/hakkimizda) WebView'de açar — slug SABİT.
// Design'ın kendi nav/footer'ı yerine standart SiteHeader/SiteFooter (gerçek veri).

import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/rota/SiteHeader';
import SiteFooter from '@/components/rota/SiteFooter';

export const metadata: Metadata = {
  title: 'Hakkımızda',
  description:
    'Yeni Rota Eğitim Kurumları: Millî Eğitim Bakanlığı ruhsatlı özel öğretim kurumu. On bir yılı aşkın deneyim; video, canlı ders ve yüz yüze uygulamayı birleştiren üç ayaklı eğitim anlayışı.',
  alternates: { canonical: '/hakkimizda' },
  openGraph: {
    title: 'Hakkımızda | Yeni Rota Eğitim Kurumları',
    description: 'Doğru bilgiye, doğru rotadan. On bir yılı aşkın süredir yetişkin eğitimini hak ettiği ciddiyetle ele alan bir kurum.',
    url: 'https://yenirotaegitim.com/hakkimizda',
    siteName: 'Yeni Rota Eğitim Kurumları',
    images: [{ url: '/marka/kare-on-dark-1080.png', width: 1080, height: 1080, alt: 'Yeni Rota Eğitim Kurumları' }],
    locale: 'tr_TR',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Hakkımızda | Yeni Rota Eğitim Kurumları',
  url: 'https://yenirotaegitim.com/hakkimizda',
  inLanguage: 'tr-TR',
  mainEntity: {
    '@type': 'EducationalOrganization',
    name: 'Yeni Rota Eğitim Kurumları',
    url: 'https://yenirotaegitim.com',
    description:
      'Millî Eğitim Bakanlığı ruhsatlı özel öğretim kurumu. Kişisel gelişim, sağlık ve psikoloji alanlarında sertifikalı programlar.',
    areaServed: 'TR',
  },
};
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://yenirotaegitim.com' },
    { '@type': 'ListItem', position: 2, name: 'Hakkımızda', item: 'https://yenirotaegitim.com/hakkimizda' },
  ],
};

const eyebrow: React.CSSProperties = { font: '500 12px/1 var(--rt-font-body)', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--rt-fg-gold)' };
const h2Style: React.CSSProperties = { fontFamily: 'var(--rt-font-display)', fontWeight: 500, fontSize: 'clamp(1.9rem,3.4vw,2.9rem)', lineHeight: 1.12, letterSpacing: '-0.01em', color: 'var(--rt-fg)', margin: 0, textWrap: 'pretty' };

function Filigran({ style, innerFill }: { style: React.CSSProperties; innerFill: string }) {
  return (
    <div style={style} aria-hidden="true">
      <svg width="600" height="600" viewBox="0 0 100 100" fill="none" style={{ display: 'block', color: 'var(--rt-fg-gold)', maxWidth: '90vw' }}>
        <g stroke="currentColor" fill="none"><circle cx="50" cy="50" r="46" strokeWidth="0.6" /><circle cx="50" cy="50" r="34" strokeWidth="0.5" /><circle cx="50" cy="50" r="22" strokeWidth="0.4" /></g>
        <g stroke="currentColor" strokeWidth="0.7" strokeLinecap="round"><line x1="50" y1="6" x2="50" y2="14" /><line x1="94" y1="50" x2="86" y2="50" /><line x1="50" y1="94" x2="50" y2="86" /><line x1="6" y1="50" x2="14" y2="50" /></g>
        <path d="M46 50 L50 82 L54 50 Z" fill="currentColor" opacity="0.5" />
        <path d="M46 50 L50 18 L54 50 Z" fill="currentColor" />
        <circle cx="50" cy="50" r="3" stroke="currentColor" strokeWidth="0.6" fill={innerFill} />
        <circle cx="50" cy="50" r="1.2" fill="currentColor" />
      </svg>
    </div>
  );
}

const UC_AYAK = [
  {
    no: 'i.',
    baslik: 'Kendi hızınızda video',
    metin: 'Bir yetişkinin işi, ailesi, kendi ritmi vardır. Öğrenmenin bir konuyu geri sarabilmeyi, ertesi gün yeniden izleyebilmeyi hak ettiğine inanıyoruz. Sabit bir sınıf takvimi çoğu öğreneni geride bırakır; kendi hızında izlenen ders, öğrenmeyi ulaşılabilir kılar.',
    ikon: <><path d="M21 15V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9" /><path d="m10 8 5 3-5 3z" /><path d="M2 20h20" /></>,
  },
  {
    no: 'ii.',
    baslik: 'Canlı derste karşılıklı',
    metin: 'Bir kayıt sizin sorunuza cevap veremez. Canlı ders, eğitmenle öğrenen arasındaki o insani bağı geri getirir: sorabilmek, tartışabilmek, yanlış anladığınız yerde durup düzeltebilmek. Bu buluşmalar, öğrenmeyi hem sürdürülebilir hem de hesap verebilir kılar.',
    ikon: <><path d="M15 10l4.55-2.28A1 1 0 0 1 21 8.62v6.76a1 1 0 0 1-1.45.9L15 14" /><rect x="3" y="6" width="12" height="12" rx="2" /></>,
  },
  {
    no: 'iii.',
    baslik: 'Yüz yüze uygulama',
    metin: "Bazı beceriler ancak elden ele, bir gözetmenin gözü önünde yerleşir. Ankara ve İstanbul'daki merkezlerimizde verdiğimiz yüz yüze uygulama ve süpervizyon, bizi salt çevrim içi içerik satan kurumlardan ayıran şey. Bilgi, uygulandığında kalıcı olur.",
    ikon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
  },
];

const ILKELER = [
  { no: '01', baslik: 'Doğru bilgi', metin: 'Programlarımız, alanının içinden gelen, uygulamayı bilen eğitmenlerce hazırlanır. İçeriği güncel, kaynağı belli ve olduğu gibi anlatılan bir bilgi sunarız — abartısız.' },
  { no: '02', baslik: 'Doğru rota', metin: 'Herkese aynı paketi satmayız. Nereden başladığınızı ve nereye varmak istediğinizi dinler, size uygun programı birlikte belirleriz. Rota kişiseldir.' },
  { no: '03', baslik: 'Yanınızda', metin: 'Kayıttan sertifikaya kadar tek bir eğitim danışmanı yanınızda olur. Yolun ortasında sorularınızla yalnız kalmazsınız; süreç boyunca ulaşabileceğiniz bir muhatabınız vardır.' },
];

export default function HakkimizdaSayfasi() {
  return (
    <div className="rt-site">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <SiteHeader />

      {/* ============ 1. AÇILIŞ HERO ============ */}
      {/* Hero KOYU-SABİT: her iki temada porfir + parşömen yazı (ana sayfa hero'suyla tutarlı) */}
      <section id="top" style={{ position: 'relative', background: 'linear-gradient(180deg, var(--rt-porphyry-900) 0%, var(--rt-porphyry-800) 100%)', borderBottom: '1px solid rgba(201,169,97,0.18)', overflow: 'hidden' }}>
        <Filigran style={{ position: 'absolute', top: '50%', right: -130, transform: 'translateY(-50%)', opacity: 0.07, pointerEvents: 'none' }} innerFill="#12021a" />
        <span style={{ position: 'absolute', top: 20, left: 20, width: 16, height: 16, borderTop: '1px solid rgba(201,169,97,0.38)', borderLeft: '1px solid rgba(201,169,97,0.38)' }} />
        <span style={{ position: 'absolute', bottom: 20, left: 20, width: 16, height: 16, borderBottom: '1px solid rgba(201,169,97,0.38)', borderLeft: '1px solid rgba(201,169,97,0.38)' }} />
        <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', padding: 'clamp(80px,13vh,150px) clamp(24px,5vw,80px) clamp(80px,12vh,140px)' }}>
          <div style={{ maxWidth: '20ch' }}>
            <div style={{ font: '500 12px/1 var(--rt-font-body)', letterSpacing: '0.36em', textTransform: 'uppercase', color: '#c9a961', marginBottom: 32 }}>Hakkımızda</div>
            <h1 style={{ fontFamily: 'var(--rt-font-display)', fontWeight: 500, fontSize: 'clamp(2.9rem,6.6vw,5.6rem)', lineHeight: 1.02, letterSpacing: '-0.015em', color: '#f4ecdf', margin: 0, textWrap: 'balance' }}>
              Doğru bilgiye, <span style={{ color: '#c9a961' }}>doğru rotadan.</span>
            </h1>
          </div>
          <p style={{ margin: '34px 0 0', fontSize: 'clamp(1.05rem,1.7vw,1.35rem)', lineHeight: 1.62, color: '#b8a9c2', maxWidth: '56ch', textWrap: 'pretty' }}>
            On bir yılı aşkın süredir, yetişkin eğitimini hak ettiği ciddiyetle ele alan bir kurumuz. Kişisel gelişim, sağlık ve psikoloji alanlarında; öğreneni yolun başından sonuna kadar yalnız bırakmayan bir eğitim anlayışını savunuyoruz.
          </p>
          <div style={{ marginTop: 44, display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ width: 52, height: 1, background: 'linear-gradient(to right,#c9a961,transparent)' }} />
            <span style={{ fontFamily: 'var(--rt-font-display)', fontStyle: 'italic', fontSize: '1.05rem', color: '#7d6d88', letterSpacing: '0.02em' }}>Yeni Rota Eğitim Kurumları</span>
          </div>
        </div>
      </section>

      {/* ============ 2. HİKÂYE ============ */}
      <section style={{ padding: 'clamp(72px,10vw,120px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0,1.15fr) minmax(0,0.85fr)', gap: 'clamp(40px,6vw,88px)', alignItems: 'start' }} className="rt-hk-hikaye">
          <div>
            <div style={{ ...eyebrow, marginBottom: 22 }}>Neden yola çıktık</div>
            <h2 style={{ ...h2Style, margin: '0 0 30px' }}>Öğrenmek, satın alınan bir dosya değildir</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22, maxWidth: '60ch' }}>
              <p style={{ margin: 0, fontSize: '1.075rem', lineHeight: 1.78, color: 'var(--rt-fg-muted)', textWrap: 'pretty' }}>Yeni Rota Eğitim Kurumları, Millî Eğitim Bakanlığı ruhsatlı bir özel öğretim kurumu olarak on bir yılı aşkın süredir yetişkin öğrencilerle çalışıyor. Bu yıllar boyunca gördük ki bir eğitimin değeri, satılan içeriğin hacminde değil; öğrenenin o bilgiyle gerçekten ne yapabildiğinde saklı.</p>
              <p style={{ margin: 0, fontSize: '1.075rem', lineHeight: 1.78, color: 'var(--rt-fg-muted)', textWrap: 'pretty' }}>Bir video koleksiyonunu indirip yalnız bırakmak kolaydır. Zor olan; öğrenenin sorusunu yanıtlamak, ilerleyişini takip etmek, bildiğini uygulamada sınamaktır. Biz zoru seçtik. Kendi hızında izlenen dersleri, canlı buluşmaları ve yüz yüze uygulamayı tek bir bütünde topladık.</p>
              <p style={{ margin: 0, fontSize: '1.075rem', lineHeight: 1.78, color: 'var(--rt-fg-muted)', textWrap: 'pretty' }}>İnandığımız şey basit: doğru bilgi, doğru rotayla buluştuğunda öğrenen ilerler. Kurum olarak varlık sebebimiz, bu rotayı sizinle birlikte çizmek ve sonuna kadar yanınızda yürümektir.</p>
            </div>
          </div>
          <div style={{ position: 'relative', background: 'var(--rt-bg-card)', borderRadius: 12, boxShadow: 'var(--rt-hairline), var(--rt-shadow-2)', padding: 'clamp(36px,4vw,56px) clamp(32px,3.5vw,48px)', minHeight: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
            <span style={{ position: 'absolute', top: 22, right: 22, width: 14, height: 14, borderTop: '1px solid var(--rt-border-strong)', borderRight: '1px solid var(--rt-border-strong)' }} />
            <span style={{ position: 'absolute', bottom: 22, left: 22, width: 14, height: 14, borderBottom: '1px solid var(--rt-border-strong)', borderLeft: '1px solid var(--rt-border-strong)' }} />
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--rt-fg-gold)', opacity: 0.9, marginBottom: 8 }} aria-hidden="true"><path d="M10 11H6a1 1 0 0 1-1-1V7a3 3 0 0 1 3-3h1M10 11v3a4 4 0 0 1-4 4M19 11h-4a1 1 0 0 1-1-1V7a3 3 0 0 1 3-3h1M19 11v3a4 4 0 0 1-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <p style={{ margin: 0, fontFamily: 'var(--rt-font-display)', fontWeight: 500, fontSize: 'clamp(1.55rem,2.6vw,2.1rem)', lineHeight: 1.28, letterSpacing: '-0.005em', color: 'var(--rt-fg)', textWrap: 'pretty' }}>Bir eğitim, birlikte yürünen bir yoldur; uzaktan gönderilen bir paket değil.</p>
            <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 36, height: 1, background: 'var(--rt-border-strong)' }} />
              <span style={{ font: '500 11px/1 var(--rt-font-body)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--rt-fg-gold)' }}>İlkemiz</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 3. RAKAMLAR ============ */}
      <section style={{ background: 'var(--rt-porphyry-900)', borderTop: '1px solid var(--rt-border)', borderBottom: '1px solid var(--rt-border)', padding: 'clamp(56px,7vw,88px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }} className="rt-hk-rakam">
          {[
            ['11', 'Yıllık kurumsal deneyim', false],
            ['10.412', 'Mezun ve kayıtlı öğrenci', true],
            ['110', 'Sertifikalı ders programı', true],
          ].map(([sayi, etiket, arti], i) => (
            <div key={etiket as string} style={{ padding: '12px clamp(24px,3vw,44px)', borderRight: i < 2 ? '1px solid var(--rt-border)' : 'none' }}>
              <div style={{ fontFamily: 'var(--rt-font-display)', fontWeight: 600, fontSize: 'clamp(2.8rem,5vw,4rem)', lineHeight: 1, color: '#c9a961', fontVariantNumeric: 'tabular-nums' }}>
                {sayi}{arti && <span style={{ fontSize: '0.5em', verticalAlign: 'super' }}>+</span>}
              </div>
              <div style={{ marginTop: 14, font: '500 12px/1.4 var(--rt-font-body)', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#b8a9c2' }}>{etiket}</div>
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 1200, margin: '28px auto 0', display: 'flex', alignItems: 'flex-start', gap: 12, color: '#7d6d88', fontSize: 13, lineHeight: 1.6, letterSpacing: '0.01em' }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#c9a961" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
          <span style={{ maxWidth: '78ch' }}>Millî Eğitim Bakanlığı ruhsatlı özel öğretim kurumuyuz. Programlarımızın akreditasyon niteliği içeriğine göre değişir; her programın sertifika ve tamamlama koşulunu kayıt öncesinde açıkça paylaşırız.</span>
        </div>
      </section>

      {/* ============ 4. NEDEN ÜÇ AYAK ============ */}
      <section style={{ padding: 'clamp(72px,10vw,120px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ maxWidth: 680 }}>
            <div style={{ ...eyebrow, marginBottom: 22 }}>Neye inanıyoruz</div>
            <h2 style={h2Style}>Öğrenmenin üç ayağı, birlikte anlam kazanır</h2>
            <p style={{ margin: '24px 0 0', fontSize: '1.075rem', lineHeight: 1.75, color: 'var(--rt-fg-muted)', textWrap: 'pretty' }}>Pek çok kurum eğitimi tek bir kanala sıkıştırır: bir video arşivi ya da bir PDF paketi. Biz bunun eksik kaldığına inanıyoruz. Video, canlı ders ve yüz yüze uygulama; hiçbiri tek başına yeterli değil, ama birlikte gerçekten öğreten bir bütün oluşturuyor. Farkımız, bu üç ayağı bir arada tutmakta.</p>
          </div>
          <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 26 }} className="rt-hk-uc">
            {UC_AYAK.map((k) => (
              <div key={k.baslik} className="rt-hk-card" style={{ position: 'relative', background: 'var(--rt-bg-card)', borderRadius: 12, boxShadow: 'var(--rt-hairline), var(--rt-shadow-1)', padding: '36px 32px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ width: 48, height: 48, borderRadius: 999, background: 'color-mix(in srgb, var(--rt-accent) 12%, transparent)', border: '1px solid var(--rt-border-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--rt-accent)' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{k.ikon}</svg>
                  </span>
                  <span style={{ fontFamily: 'var(--rt-font-display)', fontStyle: 'italic', fontSize: '1.3rem', color: 'var(--rt-fg-dim)' }}>{k.no}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--rt-font-display)', fontWeight: 500, fontSize: '1.55rem', lineHeight: 1.18, color: 'var(--rt-fg)', margin: '26px 0 0', textWrap: 'pretty' }}>{k.baslik}</h3>
                <p style={{ margin: '14px 0 0', fontSize: 15, lineHeight: 1.7, color: 'var(--rt-fg-muted)', textWrap: 'pretty' }}>{k.metin}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 5. İLKELERİMİZ ============ */}
      <section style={{ background: 'var(--rt-bg-elevated)', borderTop: '1px solid var(--rt-border)', borderBottom: '1px solid var(--rt-border)', padding: 'clamp(72px,10vw,120px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ maxWidth: 620, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ ...eyebrow, marginBottom: 22 }}>İlkelerimiz</div>
            <h2 style={h2Style}>“Doğru bilgiye, doğru rotadan” ne demek</h2>
          </div>
          <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', border: '1px solid var(--rt-border)', borderRadius: 12, overflow: 'hidden', boxShadow: 'var(--rt-hairline)' }} className="rt-hk-ilke">
            {ILKELER.map((k, i) => (
              <div key={k.no} style={{ padding: 'clamp(32px,3.2vw,44px)', borderRight: i < 2 ? '1px solid var(--rt-border)' : 'none' }}>
                <div style={{ fontFamily: 'var(--rt-font-display)', fontWeight: 600, fontSize: '2.4rem', lineHeight: 1, color: 'var(--rt-accent)', marginBottom: 20 }}>{k.no}</div>
                <h3 style={{ fontFamily: 'var(--rt-font-display)', fontWeight: 500, fontSize: '1.5rem', lineHeight: 1.2, color: 'var(--rt-fg)', margin: '0 0 12px' }}>{k.baslik}</h3>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.72, color: 'var(--rt-fg-muted)', textWrap: 'pretty' }}>{k.metin}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 6. YENİ BİR EV ============ */}
      <section style={{ position: 'relative', padding: 'clamp(80px,12vw,150px) clamp(24px,5vw,80px)', overflow: 'hidden' }}>
        <Filigran style={{ position: 'absolute', top: '50%', left: -160, transform: 'translateY(-50%)', opacity: 0.05, pointerEvents: 'none' }} innerFill="var(--rt-bg)" />
        <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ ...eyebrow, marginBottom: 26 }}>Sıradaki durak</div>
          <h2 style={{ fontFamily: 'var(--rt-font-display)', fontWeight: 500, fontSize: 'clamp(2.1rem,4.2vw,3.4rem)', lineHeight: 1.12, letterSpacing: '-0.01em', color: 'var(--rt-fg)', margin: 0, textWrap: 'balance' }}>Ankara&apos;da yeni bir ev hazırlıyoruz</h2>
          <p style={{ margin: '30px auto 0', maxWidth: '56ch', fontSize: '1.1rem', lineHeight: 1.78, color: 'var(--rt-fg-muted)', textWrap: 'pretty' }}>Öğrencilerimizle yüz yüze buluşacağımız, uygulama ve süpervizyon için tasarlanmış yeni eğitim alanımızı Ankara&apos;da hazırlıyoruz. Rotanın bu durağını da sizinle birlikte açmayı sabırsızlıkla bekliyoruz.</p>
          <div style={{ marginTop: 40, display: 'inline-flex', alignItems: 'center', gap: 14, padding: '12px 24px', border: '1px solid var(--rt-border-strong)', borderRadius: 999, boxShadow: 'var(--rt-hairline)' }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--rt-accent)', boxShadow: '0 0 0 4px color-mix(in srgb, var(--rt-accent) 18%, transparent)' }} />
            <span style={{ font: '500 12px/1 var(--rt-font-body)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--rt-fg-gold)' }}>2026 Sonbaharında kapılarımızı açıyoruz</span>
          </div>
        </div>
      </section>

      {/* ============ 7. KAPANIŞ CTA ============ */}
      <section style={{ background: 'var(--rt-porphyry-900)', borderTop: '1px solid var(--rt-border)', padding: 'clamp(72px,10vw,120px) clamp(24px,5vw,80px)' }}>
        <div style={{ position: 'relative', maxWidth: 1000, margin: '0 auto', background: 'var(--rt-bg-card)', borderRadius: 16, boxShadow: 'var(--rt-hairline), var(--rt-shadow-3)', padding: 'clamp(44px,5.5vw,72px) clamp(32px,5vw,72px)', textAlign: 'center', overflow: 'hidden' }}>
          <span style={{ position: 'absolute', top: 20, left: 20, width: 15, height: 15, borderTop: '1px solid var(--rt-border-strong)', borderLeft: '1px solid var(--rt-border-strong)' }} />
          <span style={{ position: 'absolute', top: 20, right: 20, width: 15, height: 15, borderTop: '1px solid var(--rt-border-strong)', borderRight: '1px solid var(--rt-border-strong)' }} />
          <span style={{ position: 'absolute', bottom: 20, left: 20, width: 15, height: 15, borderBottom: '1px solid var(--rt-border-strong)', borderLeft: '1px solid var(--rt-border-strong)' }} />
          <span style={{ position: 'absolute', bottom: 20, right: 20, width: 15, height: 15, borderBottom: '1px solid var(--rt-border-strong)', borderRight: '1px solid var(--rt-border-strong)' }} />
          <div style={{ ...eyebrow, marginBottom: 22 }}>Rotanıza başlayın</div>
          <h2 style={{ fontFamily: 'var(--rt-font-display)', fontWeight: 500, fontSize: 'clamp(2rem,3.8vw,3.1rem)', lineHeight: 1.12, letterSpacing: '-0.01em', color: 'var(--rt-fg)', margin: '0 auto', maxWidth: '22ch', textWrap: 'balance' }}>Size en uygun programı birlikte belirleyelim</h2>
          <p style={{ margin: '24px auto 0', maxWidth: '52ch', fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--rt-fg-muted)', textWrap: 'pretty' }}>Eğitimlerimize göz atın ya da bilgi formunu doldurun; eğitim danışmanınız en kısa sürede sizinle iletişime geçsin. Görüşmeler ücretsizdir ve yükümlülük içermez.</p>
          <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            <Link href="/egitimler" className="rt-hk-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '15px 30px', borderRadius: 4, background: 'var(--rt-accent)', color: 'var(--rt-accent-ink)', fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', boxShadow: 'var(--rt-shadow-1)' }}>
              Eğitimleri inceleyin
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </Link>
            <Link href="/iletisim" className="rt-hk-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '15px 30px', borderRadius: 4, background: 'transparent', border: '1px solid var(--rt-border-strong)', color: 'var(--rt-fg-gold)', fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none' }}>Bilgi formu</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
