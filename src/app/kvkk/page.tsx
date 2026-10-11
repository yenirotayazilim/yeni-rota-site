// KVKK Aydınlatma Metni — Claude Design "KVKK Aydınlatma Metni.dc.html" handoff.
// Koyu hero + soldan sabit "İçindekiler" (madde takipli) + 14 madde + tablolar.
// ⚠️ Mobil app BU SAYFAYI (yenirotaegitim.com/kvkk) WebView'de açıyor — slug SABİT.
// Legal veriler gerçek değerlerle dolduruldu; KEP adresi (gerçeği gelene dek) çıkarıldı.

import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/rota/SiteHeader';
import SiteFooter from '@/components/rota/SiteFooter';
import KvkkReader from '@/components/rota/KvkkReader';

const CONTACT_EMAIL = 'info@yenirotaegitim.com';
const LAST_UPDATED = '15 Kasım 2025';
const ADRES = 'Maltepe Mah. Şehit Daniş Tunalıgil Sk. No: 2/5 Çankaya / Ankara';

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni',
  description:
    'Yeni Rota Eğitim Kurumları KVKK aydınlatma metni: kişisel verilerinizin hangi amaçlarla işlendiği, kimlere aktarıldığı, saklama süreleri ve 6698 sayılı Kanun kapsamındaki haklarınız.',
  alternates: { canonical: '/kvkk' },
  openGraph: {
    title: 'KVKK Aydınlatma Metni | Yeni Rota Eğitim Kurumları',
    description:
      '6698 sayılı Kanun kapsamında kişisel verilerinizin işlenmesine ilişkin aydınlatma metni.',
    url: 'https://yenirotaegitim.com/kvkk',
    siteName: 'Yeni Rota Eğitim Kurumları',
    images: [{ url: '/marka/kare-on-dark-1080.png', width: 1080, height: 1080, alt: 'Yeni Rota Eğitim Kurumları' }],
    locale: 'tr_TR',
    type: 'website',
  },
};

const SECTIONS = [
  { num: '01', id: 'madde-1', title: 'Veri sorumlusunun kimliği' },
  { num: '02', id: 'madde-2', title: 'Kapsam ve tanımlar' },
  { num: '03', id: 'madde-3', title: 'İşlediğimiz kişisel verileriniz' },
  { num: '04', id: 'madde-4', title: 'İşlenme amaçları' },
  { num: '05', id: 'madde-5', title: 'Toplanma yöntemi' },
  { num: '06', id: 'madde-6', title: 'İşlemenin hukuki sebepleri' },
  { num: '07', id: 'madde-7', title: 'Verilerin aktarılması' },
  { num: '08', id: 'madde-8', title: 'Yurt dışına aktarım' },
  { num: '09', id: 'madde-9', title: 'Saklanma süreleri' },
  { num: '10', id: 'madde-10', title: 'Veri güvenliği tedbirleri' },
  { num: '11', id: 'madde-11', title: 'Çerezler' },
  { num: '12', id: 'madde-12', title: 'İlgili kişi hakları' },
  { num: '13', id: 'madde-13', title: 'Haklarınızı nasıl kullanırsınız' },
  { num: '14', id: 'madde-14', title: 'Metindeki değişiklikler' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'KVKK Aydınlatma Metni | Yeni Rota Eğitim Kurumları',
  url: 'https://yenirotaegitim.com/kvkk',
  inLanguage: 'tr-TR',
  isPartOf: { '@type': 'WebSite', name: 'Yeni Rota Eğitim Kurumları', url: 'https://yenirotaegitim.com' },
  about: { '@type': 'EducationalOrganization', name: 'Yeni Rota Eğitim Kurumları' },
};
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://yenirotaegitim.com' },
    { '@type': 'ListItem', position: 2, name: 'KVKK Aydınlatma Metni', item: 'https://yenirotaegitim.com/kvkk' },
  ],
};

// ---- küçük yapı taşları ----
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
  ['Ticari unvan', 'Rota Aile Sağlığı ve Danışmanlığı Eğitim Hizmetleri Test Uygulamaları Psikoteknik Ticaret Limited Şirketi'],
  ['MERSİS No', '0735090380500011'],
  ['Ticaret sicil No', 'Ankara Ticaret Sicil Müdürlüğü — 396861'],
  ['Vergi dairesi / No', 'Maltepe Vergi Dairesi — 7350903805'],
  ['Adres', ADRES],
  ['E-posta', CONTACT_EMAIL],
];

const ALICILAR = [
  ['Yetkili kamu kurum ve kuruluşları', 'Yasal yükümlülüklerin yerine getirilmesi, sertifika ve denklik süreçlerinin yürütülmesi.'],
  ['Bankalar ve ödeme kuruluşları', 'Program ücretlerinin tahsilatı ve iade işlemlerinin gerçekleştirilmesi.'],
  ['Bilişim ve bulut hizmeti sağlayıcıları', 'Uygulama ve web altyapısının barındırılması, teknik destek ve bakım hizmetleri.'],
  ['Canlı ders ve iletişim platformu iş ortakları', 'Canlı derslerin yürütülmesi ve hatırlatma iletilerinin gönderilmesi.'],
  ['Hukuk, mali müşavirlik ve denetim danışmanları', 'Hukuki yükümlülükler ile muhasebe ve denetim süreçlerinin yerine getirilmesi.'],
];

const SAKLAMA = [
  ['Kimlik ve iletişim verileri', 'İlişkinin sona ermesinden itibaren 10 yıl', 'Türk Borçlar Kanunu — genel zamanaşımı'],
  ['Öğrenim ve sertifika kayıtları', 'Mevzuatın öngördüğü arşiv süresi', 'MEB mevzuatı, sertifika denetimi'],
  ['Ödeme ve fatura verileri', '10 yıl', 'Vergi Usul Kanunu, Türk Ticaret Kanunu'],
  ['Ders izleme ve ilerleme verileri', 'İlişki süresi + 2 yıl', 'Meşru menfaat — hizmet iyileştirme'],
  ['Çağrı kaydı ve destek yazışmaları', '2 yıl', 'Meşru menfaat — uyuşmazlıkta ispat'],
  ['Pazarlama izinleri', 'Rızanın geri alınmasına kadar', 'Açık rıza — Kanun m.5/1'],
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

export default function KvkkSayfasi() {
  return (
    <div className="rt-site">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <SiteHeader />

      {/* ============ KOYU HERO ============ */}
      <section className="rt-cat-hero">
        <div className="rt-cat-glow" aria-hidden="true" />
        <div className="rt-cat-hero-inner">
          <div className="rt-cat-eyebrow">Yasal Bilgilendirme · KVKK</div>
          <h1 className="rt-cat-title" style={{ fontSize: 'clamp(2.5rem,5.2vw,4rem)', lineHeight: 1.04 }}>
            Kişisel Verilerin Korunması Aydınlatma Metni
          </h1>
          <p className="rt-cat-sub" style={{ maxWidth: '60ch' }}>
            Kişisel verilerinizin Yeni Rota Eğitim Kurumları tarafından hangi amaçlarla, hangi hukuki
            sebeplere dayanarak işlendiğini ve 6698 sayılı Kanun kapsamındaki haklarınızı bu metinde
            açıklıyoruz.
          </p>
          <div className="rt-cat-meta">
            <span className="item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--rt-gold-500)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
              Son güncelleme: {LAST_UPDATED}
            </span>
            <span className="dot" />
            <span className="item" style={{ fontFamily: 'var(--rt-font-display)', fontStyle: 'italic', fontSize: 15 }}>6698 sayılı KVKK</span>
          </div>
        </div>
      </section>

      {/* ============ OKUMA KABUĞU ============ */}
      <KvkkReader sections={SECTIONS}>
        <p style={{ margin: '0 0 8px', fontSize: 16, lineHeight: 1.85, color: 'var(--rt-fg-muted)', textWrap: 'pretty' }}>
          Yeni Rota Eğitim Kurumları (“Kurum”) olarak, veri sorumlusu sıfatıyla; öğrencilerimizin,
          bilgi talebinde bulunan ziyaretçilerimizin ve iş ilişkisi içinde olduğumuz kişilerin kişisel
          verilerinin güvenliğine ve gizliliğine önem veriyoruz. İşbu aydınlatma metni, 6698 sayılı
          Kişisel Verilerin Korunması Kanunu’nun (“Kanun”) 10. maddesi kapsamında hazırlanmıştır.
        </p>

        <Madde num="01" id="madde-1" title="Veri sorumlusunun kimliği">
          <p style={pStyle}>Kanun uyarınca kişisel verileriniz, aşağıda bilgileri yer alan Kurum tarafından, veri sorumlusu sıfatıyla işlenmektedir.</p>
          <div className="rt-kvkk-tbl two" style={{ marginTop: 24 }}>
            {SORUMLU.map(([k, v]) => (
              <div className="rt-kvkk-trow" key={k}>
                <div className="rt-kvkk-td k" data-label="Alan">{k}</div>
                <div className="rt-kvkk-td" data-label="Bilgi">{v}</div>
              </div>
            ))}
          </div>
        </Madde>

        <Madde num="02" id="madde-2" title="Kapsam ve tanımlar">
          <p style={pStyle}>İşbu metin; Kurum tarafından sunulan eğitim programları, canlı dersler, Rota Plus uygulaması ve internet siteleri aracılığıyla işlenen kişisel verilere ilişkindir. Metinde geçen temel kavramlar aşağıdaki anlamları taşır:</p>
          <ul style={ulStyle}>
            <Nokta><Guclu>Kişisel veri:</Guclu> Kimliği belirli veya belirlenebilir gerçek kişiye ilişkin her türlü bilgi.</Nokta>
            <Nokta><Guclu>İlgili kişi:</Guclu> Kişisel verisi işlenen öğrenci, ziyaretçi veya diğer gerçek kişi.</Nokta>
            <Nokta><Guclu>İşleme:</Guclu> Verilerin elde edilmesi, kaydedilmesi, saklanması, aktarılması dâhil her türlü işlem.</Nokta>
            <Nokta><Guclu>Açık rıza:</Guclu> Belirli bir konuya ilişkin, bilgilendirmeye dayanan ve özgür iradeyle açıklanan onay.</Nokta>
          </ul>
        </Madde>

        <Madde num="03" id="madde-3" title="İşlediğimiz kişisel verileriniz">
          <p style={pStyle}>Kurumumuzla kurduğunuz ilişkinin niteliğine göre aşağıdaki kişisel veri kategorileri işlenebilmektedir:</p>
          <ul style={ulStyle}>
            <Nokta><Guclu>Kimlik verileri:</Guclu> Ad, soyad, T.C. kimlik numarası, doğum tarihi.</Nokta>
            <Nokta><Guclu>İletişim verileri:</Guclu> Telefon numarası, e-posta adresi, açık adres.</Nokta>
            <Nokta><Guclu>Öğrencilik ve eğitim verileri:</Guclu> Kayıtlı programlar, ders ilerlemesi, sınav sonuçları, sertifika bilgileri.</Nokta>
            <Nokta><Guclu>Finansal veriler:</Guclu> Ödeme tutarı, fatura bilgileri, ödeme yöntemi (kart bilgileriniz Kurum tarafından saklanmaz).</Nokta>
            <Nokta><Guclu>İşlem güvenliği verileri:</Guclu> IP adresi, oturum kayıtları, uygulama kullanım logları.</Nokta>
          </ul>
          <p style={{ margin: '20px 0 0', fontSize: 15, lineHeight: 1.75, color: 'var(--rt-fg-dim)', textWrap: 'pretty' }}>Kurumumuz, zorunlu olmadıkça özel nitelikli kişisel veri (sağlık, din, biyometrik veri vb.) işlememeyi ilke edinmiştir.</p>
        </Madde>

        <Madde num="04" id="madde-4" title="Kişisel verilerinizin işlenme amaçları">
          <p style={pStyle}>Kişisel verileriniz, Kanun’un 5. ve 6. maddelerinde belirtilen şartlar çerçevesinde ve aşağıdaki amaçlarla işlenmektedir:</p>
          <ul style={ulStyle}>
            <Nokta>Kayıt, eğitim ve öğrencilik süreçlerinin yürütülmesi ile ders içeriklerinin sunulması,</Nokta>
            <Nokta>Sınav, tamamlama ve sertifika süreçlerinin yönetilmesi,</Nokta>
            <Nokta>Bilgi taleplerinizin karşılanması ve sizinle iletişim kurulması,</Nokta>
            <Nokta>Ödeme, faturalandırma ve muhasebe işlemlerinin gerçekleştirilmesi,</Nokta>
            <Nokta>Mevzuattan doğan yükümlülüklerin yerine getirilmesi ve yetkili kurumlara bilgi verilmesi,</Nokta>
            <Nokta>Açık rızanız bulunması hâlinde, kampanya ve duyuruların iletilmesi.</Nokta>
          </ul>
        </Madde>

        <Madde num="05" id="madde-5" title="Kişisel verilerinizin toplanma yöntemi">
          <p style={pStyle}>Kişisel verileriniz; internet sitelerimizdeki bilgi ve kayıt formları, Rota Plus mobil uygulaması, telefon görüşmeleri, e-posta yazışmaları ve yüz yüze başvurularınız aracılığıyla, otomatik ve otomatik olmayan yöntemlerle toplanmaktadır. Her bir toplama kanalı, yalnızca ilgili sürecin gerektirdiği verilerle sınırlıdır.</p>
        </Madde>

        <Madde num="06" id="madde-6" title="İşlemenin hukuki sebepleri">
          <p style={pStyle}>Verileriniz, Kanun’un 5. maddesinde düzenlenen aşağıdaki hukuki sebeplere dayanılarak işlenir:</p>
          <ul style={ulStyle}>
            <Nokta>Bir sözleşmenin kurulması veya ifası için verilerin işlenmesinin zorunlu olması,</Nokta>
            <Nokta>Kurumun bir hukuki yükümlülüğünü yerine getirmesi için zorunlu olması,</Nokta>
            <Nokta>İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla, Kurumun meşru menfaati,</Nokta>
            <Nokta>Yukarıdaki sebeplerin bulunmadığı hâllerde ise açık rızanızın alınması.</Nokta>
          </ul>
        </Madde>

        <Madde num="07" id="madde-7" title="Kişisel verilerinizin aktarılması">
          <p style={pStyle}>Kişisel verileriniz, yukarıdaki amaçlarla sınırlı olarak ve Kanun’un 8. maddesindeki şartlara uygun biçimde aşağıdaki alıcı gruplarına aktarılabilir:</p>
          <div className="rt-kvkk-tbl two">
            <div className="rt-kvkk-trow head"><div className="rt-kvkk-th">Alıcı grubu</div><div className="rt-kvkk-th">Aktarım amacı</div></div>
            {ALICILAR.map(([a, b]) => (
              <div className="rt-kvkk-trow" key={a}>
                <div className="rt-kvkk-td k" data-label="Alıcı grubu">{a}</div>
                <div className="rt-kvkk-td" data-label="Aktarım amacı">{b}</div>
              </div>
            ))}
          </div>
        </Madde>

        <Madde num="08" id="madde-8" title="Yurt dışına aktarım">
          <p style={pStyle}>Kurumumuz, kişisel verilerinizi kural olarak yurt içinde barındırır. Kullanılan bazı bulut ve iletişim hizmetlerinin sunucularının yurt dışında bulunması hâlinde aktarım, yalnızca Kanun’un 9. maddesinde öngörülen şartların (yeterli korumaya sahip ülke, taahhütname veya açık rıza) sağlanması kaydıyla gerçekleştirilir.</p>
        </Madde>

        <Madde num="09" id="madde-9" title="Kişisel verilerin saklanma süreleri">
          <p style={pStyle}>Verileriniz, ilgili mevzuatta öngörülen veya işlendikleri amaç için gerekli olan süre boyunca saklanır. Süre sonunda veriler silinir, yok edilir veya anonim hâle getirilir.</p>
          <div className="rt-kvkk-tbl three">
            <div className="rt-kvkk-trow head"><div className="rt-kvkk-th">Veri kategorisi</div><div className="rt-kvkk-th">Saklama süresi</div><div className="rt-kvkk-th">Hukuki dayanak</div></div>
            {SAKLAMA.map(([a, b, c]) => (
              <div className="rt-kvkk-trow" key={a}>
                <div className="rt-kvkk-td k" data-label="Veri kategorisi">{a}</div>
                <div className="rt-kvkk-td" data-label="Saklama süresi">{b}</div>
                <div className="rt-kvkk-td" data-label="Hukuki dayanak">{c}</div>
              </div>
            ))}
          </div>
        </Madde>

        <Madde num="10" id="madde-10" title="Veri güvenliğine ilişkin tedbirler">
          <p style={pStyle}>Kurumumuz, kişisel verilerinizin hukuka aykırı işlenmesini ve verilere yetkisiz erişimi önlemek amacıyla; erişim yetkilendirmesi, şifreleme, güvenlik duvarları, düzenli sızma testleri ve çalışan gizlilik taahhütleri dâhil olmak üzere uygun teknik ve idari tedbirleri alır. Verilerinize erişimi olan personel, gizlilik yükümlülüğü altındadır.</p>
        </Madde>

        <Madde num="11" id="madde-11" title="Çerezler">
          <p style={pStyle}>İnternet sitelerimizde, hizmetin sunulması ve kullanım deneyiminin iyileştirilmesi amacıyla zorunlu ve isteğe bağlı çerezler kullanılmaktadır. Çerez tercihlerinizi tarayıcınızdan yönetebilirsiniz. Çerezlere ilişkin ayrıntılı bilgi için <Link href="/gizlilik-politikasi" style={{ color: 'var(--rt-fg-gold)' }}>Gizlilik Politikası</Link> metnimizi inceleyebilirsiniz.</p>
        </Madde>

        <Madde num="12" id="madde-12" title="İlgili kişi olarak haklarınız">
          <p style={pStyle}>Kanun’un 11. maddesi uyarınca, Kuruma başvurarak kişisel verilerinize ilişkin aşağıdaki haklara sahipsiniz:</p>
          <ul style={ulStyle}>
            <Nokta>Kişisel verilerinizin işlenip işlenmediğini öğrenme ve işlenmişse buna ilişkin bilgi talep etme,</Nokta>
            <Nokta>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,</Nokta>
            <Nokta>Yurt içinde veya yurt dışında verilerin aktarıldığı üçüncü kişileri bilme,</Nokta>
            <Nokta>Eksik veya yanlış işlenmiş verilerin düzeltilmesini isteme,</Nokta>
            <Nokta>Kanun’da öngörülen şartlar çerçevesinde verilerin silinmesini veya yok edilmesini isteme,</Nokta>
            <Nokta>İşlenen verilerin münhasıran otomatik sistemlerle analizi sonucu aleyhinize bir sonucun ortaya çıkmasına itiraz etme,</Nokta>
            <Nokta>Verilerin kanuna aykırı işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme.</Nokta>
          </ul>
        </Madde>

        <Madde num="13" id="madde-13" title="Haklarınızı nasıl kullanırsınız">
          <p style={pStyle}>Yukarıdaki taleplerinizi, kimliğinizi tevsik edici bilgilerle birlikte aşağıdaki yollarla Kuruma iletebilirsiniz. Başvurunuz, talebin niteliğine göre en geç 30 gün içinde ücretsiz olarak sonuçlandırılır; işlemin ayrıca bir maliyet gerektirmesi hâlinde Kurul tarifesindeki ücret alınabilir.</p>
          <div style={kutuStyle}>
            <div style={kutuEtiket}>Başvuru yöntemi</div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
              <li style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 15, lineHeight: 1.65, color: 'var(--rt-fg-muted)' }}>
                <span style={{ flex: '0 0 auto', width: 6, height: 6, background: 'var(--rt-accent)', marginTop: 8, transform: 'rotate(45deg)' }} aria-hidden="true" />
                <span>Islak imzalı dilekçe ile: <Guclu>{ADRES}</Guclu> adresine şahsen veya noter aracılığıyla,</span>
              </li>
              <li style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 15, lineHeight: 1.65, color: 'var(--rt-fg-muted)' }}>
                <span style={{ flex: '0 0 auto', width: 6, height: 6, background: 'var(--rt-accent)', marginTop: 8, transform: 'rotate(45deg)' }} aria-hidden="true" />
                <span>Kuruma daha önce bildirdiğiniz ve sistemimizde kayıtlı e-posta adresinizden <Guclu>{CONTACT_EMAIL}</Guclu> adresine ileterek.</span>
              </li>
            </ul>
          </div>
          <div style={{ ...kutuStyle, marginTop: 20 }}>
            <div style={{ ...kutuEtiket, marginBottom: 12 }}>Hesabınızı silme talebi</div>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: 'var(--rt-fg-muted)', textWrap: 'pretty' }}>Rota Plus hesabınızın ve ilişkili kişisel verilerinizin silinmesini dilediğiniz zaman talep edebilirsiniz. Talebiniz üzerine, mevzuatın saklamayı zorunlu kıldığı veriler dışındaki tüm verileriniz silinir, yok edilir veya anonim hâle getirilir ve bu işlemin sonucu size bildirilir.</p>
          </div>
        </Madde>

        <Madde num="14" id="madde-14" title="Aydınlatma metnindeki değişiklikler">
          <p style={pStyle}>Kurumumuz, işbu aydınlatma metnini mevzuattaki değişiklikler ve iş süreçlerindeki gelişmeler doğrultusunda güncelleyebilir. Güncel metin, her zaman internet sitelerimizde yayımlanır ve yürürlük tarihi bu sayfanın başında belirtilir. Bu metin en son <Guclu>{LAST_UPDATED}</Guclu> tarihinde güncellenmiştir.</p>
        </Madde>

        {/* ==== ALT İLETİŞİM ==== */}
        <div style={{ marginTop: 64, paddingTop: 40, borderTop: '1px solid var(--rt-border-strong)' }}>
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div style={{ maxWidth: 420 }}>
              <div style={{ ...kutuEtiket, marginBottom: 16 }}>Veri sorumlusuna ulaşın</div>
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
            <Link href="/gizlilik-politikasi" style={{ flex: '0 0 auto', display: 'inline-flex', alignItems: 'center', gap: 10, padding: '13px 22px', borderRadius: 4, background: 'var(--rt-bg-card)', border: '1px solid var(--rt-border-strong)', color: 'var(--rt-fg-gold)', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', boxShadow: 'var(--rt-hairline)', textDecoration: 'none' }}>
              Gizlilik Politikası
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
