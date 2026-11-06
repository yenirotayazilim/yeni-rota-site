// Rota Plus Hizmet Şartları — görsel dil KVKK sayfasından alındı.
// ⚠️ Google Play uygulama beyanındaki Hizmet Şartları linki bu adres — slug SABİT.
// Sayfa girişsiz, herkese açık ve PDF olmayan bir web sayfası kalmalı (Play şartı).

import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/rota/SiteHeader';
import SiteFooter from '@/components/rota/SiteFooter';
import KvkkReader from '@/components/rota/KvkkReader';

const CONTACT_EMAIL = 'info@yenirotaegitim.com';
const TELEFON = '+90 312 285 76 82';
const LAST_UPDATED = '6 Kasım 2026';
const ADRES = 'Maltepe Mah. Şehit Daniş Tunalıgil Sk. No: 2/5 Çankaya / Ankara';

export const metadata: Metadata = {
  title: 'Rota Plus Hizmet Şartları',
  description:
    'Rota Plus uygulamasını ve web sürümünü kullanırken geçerli kurallar: hesap ve erişim, ödeme, cayma hakkı, içerik hakları ve iletişim bilgileri.',
  alternates: { canonical: '/hizmet-sartlari' },
  openGraph: {
    title: 'Rota Plus Hizmet Şartları | Yeni Rota Eğitim Kurumları',
    description: 'Rota Plus uygulamasını ve web sürümünü kullanırken geçerli kurallar.',
    url: 'https://yenirotaegitim.com/hizmet-sartlari',
    siteName: 'Yeni Rota Eğitim Kurumları',
    images: [{ url: '/marka/kare-on-dark-1080.png', width: 1080, height: 1080, alt: 'Yeni Rota Eğitim Kurumları' }],
    locale: 'tr_TR',
    type: 'website',
  },
};

const SECTIONS = [
  { num: '01', id: 'madde-1', title: 'Biz kimiz' },
  { num: '02', id: 'madde-2', title: 'Rota Plus nedir' },
  { num: '03', id: 'madde-3', title: 'Hesap ve erişim' },
  { num: '04', id: 'madde-4', title: 'Ücret ve ödeme' },
  { num: '05', id: 'madde-5', title: 'Cayma hakkı' },
  { num: '06', id: 'madde-6', title: 'Ücret iadesi' },
  { num: '07', id: 'madde-7', title: 'Geciken taksit' },
  { num: '08', id: 'madde-8', title: 'İçerik hakları ve yasaklar' },
  { num: '09', id: 'madde-9', title: 'Sorumluluk' },
  { num: '10', id: 'madde-10', title: 'Kişisel veriler' },
  { num: '11', id: 'madde-11', title: 'Son maddeler' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Rota Plus Hizmet Şartları | Yeni Rota Eğitim Kurumları',
  url: 'https://yenirotaegitim.com/hizmet-sartlari',
  inLanguage: 'tr-TR',
  isPartOf: { '@type': 'WebSite', name: 'Yeni Rota Eğitim Kurumları', url: 'https://yenirotaegitim.com' },
  about: { '@type': 'EducationalOrganization', name: 'Yeni Rota Eğitim Kurumları' },
};
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://yenirotaegitim.com' },
    { '@type': 'ListItem', position: 2, name: 'Rota Plus Hizmet Şartları', item: 'https://yenirotaegitim.com/hizmet-sartlari' },
  ],
};

const KURUM = [
  ['Ticaret unvanı', 'Rota Aile Sağlığı ve Danışmanlığı Eğitim Hizmetleri Test Uygulamaları Psikoteknik Ticaret Limited Şirketi'],
  ['MERSİS No', '0735090380500011'],
  ['Ticaret sicil No', 'Ankara Ticaret Sicil Müdürlüğü, 396861'],
  ['Vergi dairesi / No', 'Maltepe Vergi Dairesi, 7350903805'],
  ['Adres', ADRES],
  ['Telefon', TELEFON],
  ['E-posta', CONTACT_EMAIL],
];

// ---- küçük yapı taşları ----
const pStyle: React.CSSProperties = { margin: '18px 0 0', fontSize: 16, lineHeight: 1.85, color: 'var(--rt-fg-muted)', textWrap: 'pretty' };
const ulStyle: React.CSSProperties = { listStyle: 'none', margin: '18px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 13 };
const linkStyle: React.CSSProperties = { color: 'var(--rt-fg-gold)' };
const kutuEtiket: React.CSSProperties = {
  font: '500 10.5px/1 var(--rt-font-body)',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'var(--rt-fg-gold)',
  marginBottom: 16,
};

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

export default function HizmetSartlariSayfasi() {
  return (
    <div className="rt-site">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <SiteHeader />

      {/* ============ KOYU HERO ============ */}
      <section className="rt-cat-hero">
        <div className="rt-cat-glow" aria-hidden="true" />
        <div className="rt-cat-hero-inner">
          <div className="rt-cat-eyebrow">Yasal Bilgilendirme · Hizmet Şartları</div>
          <h1 className="rt-cat-title" style={{ fontSize: 'clamp(2.5rem,5.2vw,4rem)', lineHeight: 1.04 }}>
            Rota Plus Hizmet Şartları
          </h1>
          <p className="rt-cat-sub" style={{ maxWidth: '60ch' }}>
            Rota Plus uygulamasını ve web sürümünü kullanırken geçerli kuralları bu sayfada açıklıyoruz.
          </p>
          <div className="rt-cat-meta">
            <span className="item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--rt-gold-500)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
              Son güncelleme: {LAST_UPDATED}
            </span>
          </div>
        </div>
      </section>

      {/* ============ OKUMA KABUĞU ============ */}
      <KvkkReader sections={SECTIONS}>
        <p style={{ margin: '0 0 8px', fontSize: 16, lineHeight: 1.85, color: 'var(--rt-fg-muted)', textWrap: 'pretty' }}>
          Bu şartlar, Rota Plus uygulamasını ve web sürümünü kullanırken geçerli kuralları anlatır. Eğitim kaydınız ve ücretiniz, sizinle yapılan eğitim sözleşmesiyle belirlenir. Yasadan doğan haklarınız saklıdır; bu şartlar ile sözleşmeniz arasında fark olursa sizin için daha yararlı olan hüküm uygulanır.
        </p>

        <Madde num="01" id="madde-1" title="Biz kimiz">
          <p style={pStyle}>Rota Plus, Yeni Rota Eğitim Kurumları’nın markasıdır. Kurumumuz, Millî Eğitim Bakanlığı ruhsatlı özel öğretim kurumudur.</p>
          <div className="rt-kvkk-tbl two" style={{ marginTop: 24 }}>
            {KURUM.map(([k, v]) => (
              <div className="rt-kvkk-trow" key={k}>
                <div className="rt-kvkk-td k" data-label="Alan">{k}</div>
                <div className="rt-kvkk-td" data-label="Bilgi">{v}</div>
              </div>
            ))}
          </div>
        </Madde>

        <Madde num="02" id="madde-2" title="Rota Plus nedir">
          <p style={pStyle}>Rota Plus, kayıtlı kursiyerlerimizin eğitimlerine çevrim içi erişmesini sağlar. Uygulamada ders videolarına, canlı derslere, sınavlara, faturalarınıza ve destek hizmetlerine ulaşabilirsiniz.</p>
        </Madde>

        <Madde num="03" id="madde-3" title="Hesap ve erişim">
          <p style={pStyle}>Hesabınızı kayıt işleminden sonra kurumumuz açar; uygulama içinden hesap oluşturulamaz.</p>
          <ul style={ulStyle}>
            <Nokta>İlk girişte size iletilen geçici şifreyi değiştirmeniz gerekir.</Nokta>
            <Nokta>Hesabınız kişiseldir; giriş bilgilerinizi başkasıyla paylaşmayın.</Nokta>
            <Nokta>Hesabınızda yetkisiz bir kullanım fark ederseniz bize hemen bildirin.</Nokta>
          </ul>
        </Madde>

        <Madde num="04" id="madde-4" title="Ücret ve ödeme">
          <p style={pStyle}>Uygulama üzerinden ödeme alınmaz. Eğitim ücreti, taksitler ve ödeme tarihleri eğitim sözleşmenizde yer alır.</p>
        </Madde>

        <Madde num="05" id="madde-5" title="Cayma hakkı">
          <p style={pStyle}>Eğitim sözleşmesinin kurulduğu günden itibaren 14 gün içinde, gerekçe göstermeden ve cezai şart ödemeden cayabilirsiniz.</p>
          <ul style={ulStyle}>
            <Nokta><Guclu>Bildirim:</Guclu> Kararınızı {CONTACT_EMAIL} adresine e-postayla veya kurum adresimize yazılı olarak iletebilirsiniz.</Nokta>
            <Nokta><Guclu>İade:</Guclu> Bildiriminiz bize ulaştıktan sonra en geç 14 gün içinde ödemenizin tamamını iade ederiz.</Nokta>
            <Nokta><Guclu>Dersleriniz açıldıysa:</Guclu> Derslerinize cayma süresi bitmeden erişim açılmasını açıkça onayladıysanız ve erişiminiz açıldıysa cayma hakkınız sona erer. Bu durumda 6. madde uygulanır.</Nokta>
          </ul>
        </Madde>

        <Madde num="06" id="madde-6" title="Ücret iadesi">
          <p style={pStyle}>Cayma süresi dışındaki ücret iadelerinde eğitim sözleşmeniz ve yürürlükteki mevzuat uygulanır.</p>
        </Madde>

        <Madde num="07" id="madde-7" title="Geciken taksit">
          <p style={pStyle}>Vadesinde ödenmeyen taksit için sözleşmenizdeki oran uygulanır; faize faiz yürütülmez.</p>
          <ul style={ulStyle}>
            <Nokta><Guclu>Uyarı:</Guclu> Sözleşme bedelinin en az onda birini oluşturan birbirini izleyen iki taksidi veya en az dörtte birini oluşturan bir taksidi ödemezseniz, size en az 30 gün süre veren yazılı bir uyarı gönderebiliriz.</Nokta>
            <Nokta><Guclu>Kalan borç:</Guclu> Bu sürede ödeme yapılmazsa, yasal koşullar oluştuğunda kalan borcun tamamını isteyebiliriz. Bu hesapta faiz, komisyon ve benzeri masraflar dikkate alınmaz.</Nokta>
            <Nokta><Guclu>Erişim:</Guclu> Uyarıdan sonra erişiminizi ödeme yapılana kadar geçici olarak durdurabiliriz. Ödeme yapıldığında yeniden açarız.</Nokta>
          </ul>
        </Madde>

        <Madde num="08" id="madde-8" title="İçerik hakları ve yasaklar">
          <p style={pStyle}>Ders videoları, dokümanlar, sınav soruları ve uygulamanın tasarımı kurumumuza veya lisans verenlerine aittir. Bunları yalnızca kendi eğitiminiz için kullanabilirsiniz.</p>
          <p style={pStyle}>Aşağıdaki davranışlar yasaktır:</p>
          <ul style={ulStyle}>
            <Nokta>İçerikleri kaydetmek, kopyalamak, satmak veya başkalarıyla paylaşmak,</Nokta>
            <Nokta>Sınav sorularını yaymak veya sınava başkasının girmesini sağlamak,</Nokta>
            <Nokta>Uygulamanın güvenliğini aşmaya veya başka bir kursiyerin hesabına erişmeye çalışmak,</Nokta>
            <Nokta>Canlı ders ve destek kanallarında eğitmenlere, kursiyerlere veya personele hakaret etmek ya da onları taciz etmek.</Nokta>
          </ul>
          <p style={pStyle}>Bu kuralların ihlali hâlinde erişiminiz kısıtlanabilir ve durum size bildirilir.</p>
        </Madde>

        <Madde num="09" id="madde-9" title="Sorumluluk">
          <p style={pStyle}>Uygulamada bakım veya teknik arıza nedeniyle geçici kesintiler olabilir; kesintiyi en kısa sürede gidermek için gerekli çabayı gösteririz. Cihazınızdan, internet bağlantınızdan veya kontrolümüz dışındaki olaylardan kaynaklanan erişim sorunlarında, yasanın izin verdiği ölçüde sorumluluk kabul etmeyiz. Bu madde, tüketici olarak yasadan doğan haklarınızı ortadan kaldırmaz.</p>
        </Madde>

        <Madde num="10" id="madde-10" title="Kişisel veriler">
          <p style={pStyle}>Kişisel verileriniz <Link href="/kvkk" style={linkStyle}>KVKK Aydınlatma Metni</Link> ve <Link href="/gizlilik-politikasi" style={linkStyle}>Gizlilik Politikası</Link> kapsamında işlenir. Hesabınızın silinmesini talep etme yolu da bu metinlerde yer alır.</p>
        </Madde>

        <Madde num="11" id="madde-11" title="Son maddeler">
          <ul style={ulStyle}>
            <Nokta><Guclu>Değişiklikler:</Guclu> Bu şartları mevzuat veya hizmet değişikliklerine göre güncelleyebiliriz. Güncel metni bu sayfada yayınlar, önemli değişiklikleri size ayrıca bildiririz. Bu güncellemeler sözleşmenizi aleyhinize değiştirmez.</Nokta>
            <Nokta><Guclu>Uygulanacak hukuk:</Guclu> Bu şartlara Türkiye Cumhuriyeti hukuku uygulanır. Bulunduğunuz ülkenin zorunlu tüketici koruma kuralları saklıdır.</Nokta>
            <Nokta><Guclu>Şikayet:</Guclu> Önce bize yazabilirsiniz. Yasal parasal sınırlar içinde Tüketici Hakem Heyetlerine, bu sınırların üzerinde Tüketici Mahkemelerine başvurabilirsiniz.</Nokta>
            <Nokta><Guclu>İletişim:</Guclu> {CONTACT_EMAIL} veya {TELEFON}.</Nokta>
          </ul>
        </Madde>

        {/* ==== ALT İLETİŞİM ==== */}
        <div style={{ marginTop: 64, paddingTop: 40, borderTop: '1px solid var(--rt-border-strong)' }}>
          <div style={kutuEtiket}>Bize ulaşın</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.6, color: 'var(--rt-fg-muted)' }}>
            <span>{ADRES}</span>
            <a href="tel:+903122857682" style={{ color: 'var(--rt-fg-muted)' }}>{TELEFON}</a>
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: 'var(--rt-fg-muted)' }}>{CONTACT_EMAIL}</a>
          </div>
          <p style={{ margin: '36px 0 0', fontSize: 12.5, color: 'var(--rt-fg-dim)' }}>© 2026 Yeni Rota Eğitim Kurumları. Tüm hakları saklıdır.</p>
        </div>
      </KvkkReader>

      <SiteFooter />
    </div>
  );
}
