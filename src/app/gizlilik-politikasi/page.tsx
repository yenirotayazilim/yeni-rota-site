// Gizlilik Politikası — Rota Plus mobil uygulamasının gizlilik politikası.
// KVKK sayfasıyla AYNI okuma kabuğunu (KvkkReader + .rt-kvkk-* şablonu) kullanır;
// yalnızca içerik farklı. İçerik eski siteden taşındı, uygulama adı Rota Plus'a
// güncellendi, gerçek kurum verileriyle dolduruldu.
// ⚠️ Mobil app BU SAYFAYI (yenirotaegitim.com/gizlilik-politikasi) WebView'de açar — slug SABİT.

import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/rota/SiteHeader';
import SiteFooter from '@/components/rota/SiteFooter';
import KvkkReader from '@/components/rota/KvkkReader';

const CONTACT_EMAIL = 'info@yenirotaegitim.com';
const LAST_UPDATED = '15 Kasım 2025';
const ADRES = 'Maltepe Mah. Şehit Daniş Tunalıgil Sk. No: 2/5 Çankaya / Ankara';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası',
  description:
    'Rota Plus mobil uygulaması gizlilik politikası: uygulamanın hangi verileri işlediği, hangi üçüncü taraf hizmetleri kullandığı, saklama süreleri, hesap silme ve kullanıcı haklarınız.',
  alternates: { canonical: '/gizlilik-politikasi' },
  openGraph: {
    title: 'Gizlilik Politikası | Yeni Rota Eğitim Kurumları',
    description: 'Rota Plus mobil uygulamasının kullanıcı verilerini nasıl işlediğine ilişkin gizlilik politikası.',
    url: 'https://yenirotaegitim.com/gizlilik-politikasi',
    siteName: 'Yeni Rota Eğitim Kurumları',
    images: [{ url: '/marka/kare-on-dark-1080.png', width: 1080, height: 1080, alt: 'Yeni Rota Eğitim Kurumları' }],
    locale: 'tr_TR',
    type: 'website',
  },
};

const SECTIONS = [
  { num: '01', id: 'madde-1', title: 'Geliştirici ve veri sorumlusu' },
  { num: '02', id: 'madde-2', title: 'Uygulamanın işlediği veriler' },
  { num: '03', id: 'madde-3', title: 'Toplanmayan veriler' },
  { num: '04', id: 'madde-4', title: 'Verilerin kullanım amaçları' },
  { num: '05', id: 'madde-5', title: 'Üçüncü taraf hizmet sağlayıcılar' },
  { num: '06', id: 'madde-6', title: 'Veri aktarımı ve saklama' },
  { num: '07', id: 'madde-7', title: 'Saklama süreleri' },
  { num: '08', id: 'madde-8', title: 'Kullanıcı haklarınız' },
  { num: '09', id: 'madde-9', title: 'Hesap silme' },
  { num: '10', id: 'madde-10', title: 'Çocukların gizliliği' },
  { num: '11', id: 'madde-11', title: 'Veri güvenliği' },
  { num: '12', id: 'madde-12', title: 'Politika değişiklikleri' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Gizlilik Politikası | Yeni Rota Eğitim Kurumları',
  url: 'https://yenirotaegitim.com/gizlilik-politikasi',
  inLanguage: 'tr-TR',
  isPartOf: { '@type': 'WebSite', name: 'Yeni Rota Eğitim Kurumları', url: 'https://yenirotaegitim.com' },
  about: { '@type': 'MobileApplication', name: 'Rota Plus', operatingSystem: 'iOS, Android' },
};
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://yenirotaegitim.com' },
    { '@type': 'ListItem', position: 2, name: 'Gizlilik Politikası', item: 'https://yenirotaegitim.com/gizlilik-politikasi' },
  ],
};

// ---- küçük yapı taşları (KVKK sayfasıyla aynı dil) ----
const pStyle: React.CSSProperties = { margin: '18px 0 0', fontSize: 16, lineHeight: 1.85, color: 'var(--rt-fg-muted)', textWrap: 'pretty' };
const ulStyle: React.CSSProperties = { listStyle: 'none', margin: '18px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 13 };

function Madde({ num, id, title, children }: { num: string; id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ scrollMarginTop: 92, marginTop: 56 }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
        <span style={{ fontFamily: 'var(--rt-font-display)', fontWeight: 600, fontSize: '1.5rem', color: 'var(--rt-fg-gold)', flex: '0 0 auto', fontVariantNumeric: 'tabular-nums' }}>{num}</span>
        <h2 style={{ fontFamily: 'var(--rt-font-display)', fontWeight: 500, fontSize: 'clamp(1.55rem,3vw,1.95rem)', lineHeight: 1.15, color: 'var(--rt-fg)', margin: 0 }}>{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Nokta({ children }: { children: React.ReactNode }) {
  return (
    <li style={{ display: 'flex', gap: 13, alignItems: 'flex-start', fontSize: 15.5, lineHeight: 1.75, color: 'var(--rt-fg-muted)' }}>
      <span style={{ flex: '0 0 auto', width: 6, height: 6, background: 'var(--rt-accent)', marginTop: 10, transform: 'rotate(45deg)' }} aria-hidden="true" />
      <span>{children}</span>
    </li>
  );
}

function Guclu({ children }: { children: React.ReactNode }) {
  return <strong style={{ color: 'var(--rt-fg)', fontWeight: 600 }}>{children}</strong>;
}

const SORUMLU = [
  ['Geliştirici / veri sorumlusu', 'Yeni Rota Eğitim Kurumları'],
  ['Yasal ünvan', 'Rota Aile Sağlığı ve Danışmanlığı Eğitim Hizmetleri Test Uygulamaları Psikoteknik Ticaret Limited Şirketi'],
  ['Adres', ADRES],
  ['E-posta', CONTACT_EMAIL],
  ['Uygulama', 'Rota Plus (iOS & Android)'],
];

const TOPLANMAYAN = [
  'Konum bilgisi (GPS)',
  'Kamera, mikrofon ve fotoğraf galerisi erişimi',
  'Rehber / kişiler',
  'Sağlık verileri',
  'Reklam tanımlayıcısı (IDFA / Advertising ID)',
  'Tarama geçmişi',
  'Kredi kartı veya diğer finansal bilgiler',
];

const SAGLAYICILAR = [
  ['Firebase Authentication (Google LLC)', 'Kullanıcı kimlik doğrulama — giriş ve şifre yönetimi', 'ABD'],
  ['Firebase Cloud Messaging (Google LLC)', 'Push bildirimlerinin gönderimi', 'ABD'],
  ['Firebase Crashlytics (Google LLC)', 'Uygulama çökmelerinin otomatik raporlanması', 'ABD'],
  ['Supabase (Supabase Inc.)', 'Eğitim ve profil verilerinin saklanması', 'Almanya (AB)'],
  ['YouTube Embedded Player (Google LLC)', 'Eğitim videolarının uygulama içinde gösterimi (gizlilik modu açık)', 'ABD'],
];

const kutuStyle: React.CSSProperties = {
  marginTop: 24,
  padding: '24px 26px',
  background: 'color-mix(in srgb, var(--rt-accent) 6%, var(--rt-bg-card))',
  border: '1px solid var(--rt-border)',
  borderLeft: '3px solid var(--rt-accent)',
  borderRadius: 8,
  boxShadow: 'var(--rt-hairline)',
};
const kutuEtiket: React.CSSProperties = {
  font: '500 10.5px/1 var(--rt-font-body)',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'var(--rt-fg-gold)',
  marginBottom: 14,
};

export default function GizlilikSayfasi() {
  return (
    <div className="rt-site">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <SiteHeader />

      {/* ============ KOYU HERO ============ */}
      <section className="rt-cat-hero">
        <div className="rt-cat-glow" aria-hidden="true" />
        <div className="rt-cat-hero-inner">
          <div className="rt-cat-eyebrow">Yasal Bilgilendirme · Gizlilik</div>
          <h1 className="rt-cat-title" style={{ fontSize: 'clamp(2.5rem,5.2vw,4rem)', lineHeight: 1.04 }}>
            Gizlilik Politikası
          </h1>
          <p className="rt-cat-sub" style={{ maxWidth: '60ch' }}>
            Rota Plus mobil uygulamasının hangi verileri işlediğini, bu verileri neden kullandığını ve
            gizliliğinizi korumak için aldığı tedbirleri bu metinde açıklıyoruz.
          </p>
          <div className="rt-cat-meta">
            <span className="item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--rt-gold-500)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
              Son güncelleme: {LAST_UPDATED}
            </span>
            <span className="dot" />
            <span className="item" style={{ fontFamily: 'var(--rt-font-display)', fontStyle: 'italic', fontSize: 15 }}>Rota Plus · iOS & Android</span>
          </div>
        </div>
      </section>

      {/* ============ OKUMA KABUĞU ============ */}
      <KvkkReader sections={SECTIONS}>
        <p style={{ margin: '0 0 8px', fontSize: 16, lineHeight: 1.85, color: 'var(--rt-fg-muted)', textWrap: 'pretty' }}>
          Bu Gizlilik Politikası, Yeni Rota Eğitim Kurumları tarafından geliştirilen <Guclu>Rota Plus</Guclu>{' '}
          mobil uygulamasının (iOS ve Android) kullanıcı verilerini nasıl işlediğini açıklar. <Guclu>Önemli
          not:</Guclu> Rota Plus uygulaması kullanıcılardan yeni kişisel veri toplamaz; uygulamaya giriş
          yapabilmek için önceden internet sitemiz veya danışmanlarımız üzerinden eğitim kaydı yaptırmış
          olmanız gerekir. Uygulama, daha önce paylaştığınız bilgileri görüntülemek ve eğitim hizmetini
          sunmak için kullanılır. Bununla birlikte, uygulamanın çalışabilmesi için bazı teknik veriler
          işlenir; bu politika söz konusu işlemleri şeffaf bir biçimde açıklar.
        </p>

        <Madde num="01" id="madde-1" title="Geliştirici ve veri sorumlusu">
          <p style={pStyle}>Rota Plus uygulaması, aşağıda bilgileri yer alan Kurum tarafından geliştirilmekte ve sunulmaktadır.</p>
          <div className="rt-kvkk-tbl two" style={{ marginTop: 24 }}>
            {SORUMLU.map(([k, v]) => (
              <div className="rt-kvkk-trow" key={k}>
                <div className="rt-kvkk-td k" data-label="Alan">{k}</div>
                <div className="rt-kvkk-td" data-label="Bilgi">{v}</div>
              </div>
            ))}
          </div>
        </Madde>

        <Madde num="02" id="madde-2" title="Uygulamanın işlediği veriler">
          <p style={pStyle}>Rota Plus uygulaması, hizmetin sunulabilmesi için aşağıdaki verileri işler:</p>
          <ul style={ulStyle}>
            <Nokta><Guclu>Kimlik ve hesap verileri:</Guclu> Giriş için e-posta adresi ve kullanıcı kimliği (UID). Şifreniz Firebase Authentication (Google LLC) tarafından güvenli biçimde yönetilir; Yeni Rota Eğitim Kurumları kullanıcı şifrelerine erişemez ve bunları kendi sistemlerinde saklamaz.</Nokta>
            <Nokta><Guclu>Sunucudan çekilen profil ve eğitim verileri:</Guclu> Ad-soyad, e-posta, telefon, doğum tarihi, T.C. kimlik numarası (uygulamada maskeli gösterilir), adres, kayıtlı programlar, ders ilerlemesi, canlı ders ve sertifika bilgileri, sınav sonuçları ile ödeme planı bilgileri.</Nokta>
            <Nokta><Guclu>Teknik ve cihaz verileri:</Guclu> Push bildirimi için cihaz tanımlayıcısı (device token), işletim sistemi ve sürümü, uygulama sürümü ve — çökme hâlinde otomatik gönderilen — kişisel veri içermeyen çökme raporları.</Nokta>
          </ul>
        </Madde>

        <Madde num="03" id="madde-3" title="Toplanmayan veriler">
          <p style={pStyle}>Rota Plus uygulaması, aşağıdaki verileri <Guclu>toplamaz</Guclu>:</p>
          <ul style={ulStyle}>
            {TOPLANMAYAN.map((t) => (
              <Nokta key={t}>{t}</Nokta>
            ))}
          </ul>
        </Madde>

        <Madde num="04" id="madde-4" title="Verilerin kullanım amaçları">
          <p style={pStyle}>İşlenen veriler yalnızca aşağıdaki amaçlarla kullanılır:</p>
          <ul style={ulStyle}>
            <Nokta><Guclu>Kimlik doğrulama:</Guclu> Hesabınıza güvenli biçimde giriş yapmanızı sağlamak,</Nokta>
            <Nokta><Guclu>Eğitim hizmetinin sunulması:</Guclu> Kayıtlı olduğunuz derslere erişiminizi sağlamak,</Nokta>
            <Nokta><Guclu>Bildirim gönderimi:</Guclu> Ders hatırlatmaları, duyurular ve önemli güncellemeler,</Nokta>
            <Nokta><Guclu>Uygulama performansı:</Guclu> Hataları tespit etmek ve gidermek,</Nokta>
            <Nokta><Guclu>Güvenlik:</Guclu> Yetkisiz erişimi tespit ve önlemek.</Nokta>
          </ul>
          <p style={{ margin: '20px 0 0', fontSize: 15, lineHeight: 1.75, color: 'var(--rt-fg-dim)', textWrap: 'pretty' }}>Verileriniz reklam, profil çıkarma veya üçüncü taraflara satış amacıyla kullanılmaz.</p>
        </Madde>

        <Madde num="05" id="madde-5" title="Üçüncü taraf hizmet sağlayıcılar">
          <p style={pStyle}>Uygulama, çalışabilmek için aşağıdaki üçüncü taraf hizmet sağlayıcıları kullanır. Bu sağlayıcılar yalnızca kendi işlevleri için gerekli verileri işler:</p>
          <div className="rt-kvkk-tbl three">
            <div className="rt-kvkk-trow head"><div className="rt-kvkk-th">Sağlayıcı</div><div className="rt-kvkk-th">Amaç</div><div className="rt-kvkk-th">Veri merkezi</div></div>
            {SAGLAYICILAR.map(([a, b, c]) => (
              <div className="rt-kvkk-trow" key={a}>
                <div className="rt-kvkk-td k" data-label="Sağlayıcı">{a}</div>
                <div className="rt-kvkk-td" data-label="Amaç">{b}</div>
                <div className="rt-kvkk-td" data-label="Veri merkezi">{c}</div>
              </div>
            ))}
          </div>
        </Madde>

        <Madde num="06" id="madde-6" title="Veri aktarımı ve saklama">
          <p style={pStyle}>Verileriniz, yukarıda belirtilen hizmet sağlayıcıların sunucularında saklanır; bu sunucular yurt dışında (ABD ve Avrupa Birliği) bulunabilir. Veri aktarımları SSL/TLS şifreleme ile yapılır, sağlayıcılarla veri işleme sözleşmeleri akdedilmiştir ve sağlayıcılar uluslararası güvenlik standartlarına (ISO 27001, SOC 2 vb.) uymaktadır.</p>
        </Madde>

        <Madde num="07" id="madde-7" title="Veri saklama süreleri">
          <ul style={ulStyle}>
            <Nokta><Guclu>Aktif hesap verileri:</Guclu> Hesabınız aktif olduğu sürece saklanır.</Nokta>
            <Nokta><Guclu>Çökme raporları:</Guclu> 90 gün sonra otomatik olarak silinir.</Nokta>
            <Nokta><Guclu>Push bildirimi token’ı:</Guclu> Uygulamayı silene veya çıkış yapana kadar saklanır.</Nokta>
            <Nokta><Guclu>Yasal saklama:</Guclu> Fatura ve sertifika kayıtları, Vergi Usul Kanunu ve MEB mevzuatı gereği 10 yıl saklanır; bu veriler anonim hâle getirilebilir.</Nokta>
          </ul>
        </Madde>

        <Madde num="08" id="madde-8" title="Kullanıcı haklarınız">
          <p style={pStyle}>Kişisel verilerinize ilişkin aşağıdaki haklara sahipsiniz:</p>
          <ul style={ulStyle}>
            <Nokta>Verilerinize erişim talep etme,</Nokta>
            <Nokta>Verilerinizin düzeltilmesini talep etme,</Nokta>
            <Nokta>Verilerinizin silinmesini talep etme,</Nokta>
            <Nokta>Hesabınızı silme (bkz. madde 09),</Nokta>
            <Nokta>Push bildirim izinlerini cihaz ayarlarından geri çekme.</Nokta>
          </ul>
          <p style={{ margin: '20px 0 0', fontSize: 15, lineHeight: 1.75, color: 'var(--rt-fg-dim)', textWrap: 'pretty' }}>Haklarınızı kullanmak için <Guclu>{CONTACT_EMAIL}</Guclu> adresine başvurabilirsiniz.</p>
        </Madde>

        <Madde num="09" id="madde-9" title="Hesap silme">
          <p style={pStyle}>Hesabınızı ve ilişkili verilerinizi silmek için iki yöntem sunuyoruz:</p>
          <div style={kutuStyle}>
            <div style={kutuEtiket}>Yöntem 1 — Uygulama içinden (önerilen)</div>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: 'var(--rt-fg-muted)', textWrap: 'pretty' }}>
              Profil sayfasına gidin, <Guclu>Ayarlar</Guclu>’a girin, <Guclu>“Hesabımı Sil”</Guclu>
              seçeneğine dokunun ve onay ekranını okuyup talebinizi onaylayın. Onay sonrası hesabınız
              anında Firebase Authentication sisteminden silinir.
            </p>
          </div>
          <div style={{ ...kutuStyle, marginTop: 20 }}>
            <div style={kutuEtiket}>Yöntem 2 — E-posta ile</div>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: 'var(--rt-fg-muted)', textWrap: 'pretty' }}>
              <Guclu>{CONTACT_EMAIL}</Guclu> adresine, kayıtlı e-posta adresinizi belirterek “Hesap Silme
              Talebi” konusuyla mesaj gönderin. Talebiniz en geç 30 gün içinde sonuçlandırılır.
            </p>
          </div>
          <p style={{ margin: '20px 0 0', fontSize: 15, lineHeight: 1.75, color: 'var(--rt-fg-dim)', textWrap: 'pretty' }}>
            Profil bilgileriniz, giriş kimlik bilgileriniz, push token’ınız ve oturum kayıtlarınız silinir.
            Fatura kayıtları (Vergi Usul Kanunu — 10 yıl) ve sertifika kayıtları (MEB mevzuatı) yasal
            nedenlerle saklanmaya devam eder; bu veriler anonim hâle getirilir ve sizinle ilişkilendirilemez.
          </p>
        </Madde>

        <Madde num="10" id="madde-10" title="Çocukların gizliliği">
          <p style={pStyle}>Rota Plus uygulaması 18 yaş ve üzeri bireylere yöneliktir. 18 yaş altı kullanıcılardan bilerek veri toplamayız. Bir çocuğun verisini topladığımızı tespit edersek derhal sileriz.</p>
        </Madde>

        <Madde num="11" id="madde-11" title="Veri güvenliği">
          <p style={pStyle}>Verilerinizi korumak için aşağıdaki tedbirleri uygularız:</p>
          <ul style={ulStyle}>
            <Nokta>Tüm veri iletimi SSL/TLS şifreleme ile yapılır,</Nokta>
            <Nokta>Kullanıcı şifreleri Firebase Authentication (Google) tarafından güvenli biçimde yönetilir,</Nokta>
            <Nokta>Yetkili erişim kontrolü ve rol bazlı yetkilendirme uygulanır,</Nokta>
            <Nokta>Düzenli güvenlik denetimleri yapılır,</Nokta>
            <Nokta>Veri ihlali durumunda müdahale prosedürü işletilir.</Nokta>
          </ul>
        </Madde>

        <Madde num="12" id="madde-12" title="Politika değişiklikleri">
          <p style={pStyle}>Bu Gizlilik Politikası, yasal düzenlemeler veya uygulama özelliklerindeki değişiklikler doğrultusunda güncellenebilir. Güncel sürüm her zaman bu sayfada yayımlanır; önemli değişikliklerde uygulama içi bildirim veya e-posta yoluyla bilgilendirilirsiniz. Bu metin en son <Guclu>{LAST_UPDATED}</Guclu> tarihinde güncellenmiştir.</p>
        </Madde>

        {/* ==== ALT İLETİŞİM ==== */}
        <div style={{ marginTop: 64, paddingTop: 40, borderTop: '1px solid var(--rt-border-strong)' }}>
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div style={{ maxWidth: 420 }}>
              <div style={{ ...kutuEtiket, marginBottom: 16 }}>Sorularınız için bize ulaşın</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.6, color: 'var(--rt-fg-muted)' }}>
                <span style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--rt-fg-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', marginTop: 2 }}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                  {ADRES}
                </span>
                <span style={{ display: 'flex', gap: 11, alignItems: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--rt-fg-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto' }}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                  <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: 'var(--rt-fg-muted)' }}>{CONTACT_EMAIL}</a>
                </span>
              </div>
            </div>
            <Link href="/kvkk" style={{ flex: '0 0 auto', display: 'inline-flex', alignItems: 'center', gap: 10, padding: '13px 22px', borderRadius: 4, background: 'var(--rt-bg-card)', border: '1px solid var(--rt-border-strong)', color: 'var(--rt-fg-gold)', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', boxShadow: 'var(--rt-hairline)', textDecoration: 'none' }}>
              KVKK Aydınlatma Metni
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </Link>
          </div>
          <p style={{ margin: '36px 0 0', fontSize: 12.5, color: 'var(--rt-fg-dim)' }}>© 2026 Yeni Rota Eğitim Kurumları. Tüm hakları saklıdır.</p>
        </div>
      </KvkkReader>

      <SiteFooter />
    </div>
  );
}
