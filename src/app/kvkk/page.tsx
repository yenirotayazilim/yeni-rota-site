export default function KvkkPage() {
  return (
    <section
      className="min-h-screen px-4 py-20 font-sans relative"
      style={{
        minHeight: "100vh"
      }}
    >
      {/* Yumuşak ana arka plan */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 50% 0%, #F8F9FA 0%, #E0F6FF 70%, #0D1B2A 100%)"
        }}
      />
      <div className="max-w-4xl mx-auto">
        {/* Başlık */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#6A0572] to-[#8C1A85] bg-clip-text text-transparent mb-3 tracking-tight">
            KVKK Aydınlatma Metni
          </h1>
          <p className="text-[#0D1B2A] text-md md:text-lg">
            Kişisel verilerinizin korunması bizim için önemli.
          </p>
          <p className="text-[#6A0572] text-sm mt-2 font-semibold">
            Son Güncelleme: 15 Kasım 2025
          </p>
        </div>

        {/* Ana Kart */}
        <div className="relative bg-[#F8F9FA]/95 rounded-2xl border border-[#E2D1E8] p-6 md:p-10 shadow-lg">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6A0572] to-[#8C1A85] rounded-t-xl"></div>

          <div className="text-[#0D1B2A] leading-relaxed space-y-8 text-sm md:text-base">

            {/* 1. Veri Sorumlusu */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#6A0572] mb-3">1. Veri Sorumlusu</h2>
              <p className="mb-4">
                6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;<strong>KVKK</strong>&quot;) uyarınca veri sorumlusu sıfatıyla;
              </p>
              <p className="mb-4">
                <strong>Rota Aile Sağlığı ve Danışmanlığı Eğitim Hizmetleri Test Uygulamaları Psikoteknik Ticaret Limited Şirketi</strong> (&quot;<strong>Yeni Rota Eğitim</strong>&quot; veya &quot;<strong>Şirket</strong>&quot;) olarak, kişisel verilerinizin güvenliği konusunda azami hassasiyet göstermekteyiz.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <tbody>
                    <tr className="border-b border-[#E2D1E8]">
                      <td className="py-2 pr-4 font-semibold align-top w-1/3">Ticaret Unvanı</td>
                      <td className="py-2">Rota Aile Sağlığı ve Danışmanlığı Eğitim Hizmetleri Test Uygulamaları Psikoteknik Ticaret Limited Şirketi</td>
                    </tr>
                    <tr className="border-b border-[#E2D1E8]">
                      <td className="py-2 pr-4 font-semibold align-top">MERSİS No</td>
                      <td className="py-2">0735090380500011</td>
                    </tr>
                    <tr className="border-b border-[#E2D1E8]">
                      <td className="py-2 pr-4 font-semibold align-top">Ticaret Sicil No</td>
                      <td className="py-2">396861 (Ankara)</td>
                    </tr>
                    <tr className="border-b border-[#E2D1E8]">
                      <td className="py-2 pr-4 font-semibold align-top">Vergi Dairesi / No</td>
                      <td className="py-2">Maltepe Vergi Dairesi / 7350903805</td>
                    </tr>
                    <tr className="border-b border-[#E2D1E8]">
                      <td className="py-2 pr-4 font-semibold align-top">Adres</td>
                      <td className="py-2">Maltepe Mahallesi Şehit Daniş Tunalıgil Sk. No: 2/5 Çankaya/Ankara</td>
                    </tr>
                    <tr className="border-b border-[#E2D1E8]">
                      <td className="py-2 pr-4 font-semibold align-top">İletişim</td>
                      <td className="py-2">info@yenirotaegitim.com</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-semibold align-top">Web Sitesi</td>
                      <td className="py-2">www.yenirotaegitim.com</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 2. İşlenen Kişisel Veri Kategorileri */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#6A0572] mb-3">2. İşlenen Kişisel Veri Kategorileri</h2>
              <p className="mb-3">Şirketimiz, sunduğu eğitim hizmetleri kapsamında aşağıdaki kişisel veri kategorilerinizi işlemektedir:</p>

              <h3 className="font-semibold text-[#8C1A85] mt-4 mb-2">2.1. Kimlik Verileri</h3>
              <p>Ad, soyad, T.C. kimlik numarası, doğum tarihi.</p>

              <h3 className="font-semibold text-[#8C1A85] mt-4 mb-2">2.2. İletişim Verileri</h3>
              <p>Cep telefonu numarası, e-posta adresi, posta adresi (sertifika gönderimi için).</p>

              <h3 className="font-semibold text-[#8C1A85] mt-4 mb-2">2.3. Eğitim ve Müşteri İşlem Verileri</h3>
              <p>Kayıtlı olduğunuz eğitim programları, devam/katılım bilgileri, sınav sonuçları, sertifika bilgileri, eğitim ilerleme durumu, mezuniyet kayıtları.</p>

              <h3 className="font-semibold text-[#8C1A85] mt-4 mb-2">2.4. Finansal Veriler</h3>
              <p>
                Fatura bilgileri, ödeme planı, ödeme geçmişi, taksit bilgileri, tahsilat kayıtları.
                <em className="text-gray-600"> (Kredi kartı bilgileriniz Şirketimiz tarafından saklanmaz; sanal POS hizmet sağlayıcımız tarafından PCI-DSS standartlarına uygun olarak güvenli ortamda işlenir.)</em>
              </p>

              <h3 className="font-semibold text-[#8C1A85] mt-4 mb-2">2.5. Pazarlama ve İletişim Tercihleri</h3>
              <p>WhatsApp, SMS ve e-posta gönderim tercihleri; kampanya ve duyuru bildirim onayları.</p>

              <h3 className="font-semibold text-[#8C1A85] mt-4 mb-2">2.6. İşlem Güvenliği Verileri</h3>
              <p>IP adresi, oturum bilgileri, log kayıtları, mobil uygulama oturum bilgileri.</p>
            </div>

            {/* 3. Toplama Yöntemleri */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#6A0572] mb-3">3. Kişisel Verilerin Toplanma Yöntemleri</h2>
              <p className="mb-2">Kişisel verileriniz aşağıdaki kanallarla toplanmaktadır:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Web sitesi kayıt formları (yenirotaegitim.com)</li>
                <li>Mobil uygulama (RotaEdu — iOS ve Android)</li>
                <li>WhatsApp Business üzerinden yürütülen yazışmalar</li>
                <li>Telefon görüşmeleri (danışman/eğitim koordinatörleri)</li>
                <li>E-posta iletişimi</li>
                <li>Sosyal medya üzerinden gelen başvurular</li>
                <li>Yüz yüze görüşmeler ve fiziksel kayıt formları</li>
                <li>Sanal POS üzerinden gerçekleştirilen ödeme süreçleri</li>
              </ul>
            </div>

            {/* 4. İşleme Amaçları */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#6A0572] mb-3">4. Kişisel Verilerin İşlenme Amaçları</h2>
              <p className="mb-2">Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
              <ol className="list-decimal pl-6 space-y-1">
                <li>Eğitim hizmetlerinin sunulması, eğitim programlarına kayıt ve yönetim süreçleri</li>
                <li>Sertifika düzenlenmesi, basımı ve kargo ile teslimi</li>
                <li>Canlı ders organizasyonu ve katılım takibi</li>
                <li>Sınav süreçlerinin yürütülmesi ve sonuçların bildirilmesi</li>
                <li>Fatura düzenlenmesi ve mali yükümlülüklerin yerine getirilmesi</li>
                <li>Ödeme takibi, taksit yönetimi ve tahsilat süreçleri</li>
                <li>Müşteri ilişkileri yönetimi (CRM) ve destek hizmetleri</li>
                <li>Tarafınızla iletişim kurulması (WhatsApp, SMS, e-posta, telefon)</li>
                <li>Kampanya, duyuru ve bilgilendirme faaliyetleri <em>(açık rıza ile)</em></li>
                <li>Mobil uygulama oturum yönetimi ve güvenliği</li>
                <li>Yasal yükümlülüklerin yerine getirilmesi (VUK, MEB mevzuatı, KVKK)</li>
                <li>Hukuki süreçlerin ve uyuşmazlıkların yönetimi</li>
                <li>Bilgi güvenliği ve dolandırıcılığın önlenmesi</li>
                <li>İstatistiksel analiz ve hizmet kalitesinin iyileştirilmesi</li>
              </ol>
            </div>

            {/* 5. Hukuki Sebepler */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#6A0572] mb-3">5. Kişisel Verilerin İşlenmesinin Hukuki Sebepleri</h2>
              <p className="mb-2">Kişisel verileriniz, KVKK Madde 5 kapsamında aşağıdaki hukuki sebeplere dayanılarak işlenmektedir:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Sözleşmenin kurulması ve ifası için zorunlu olması:</strong> Eğitim sözleşmesinin ifası</li>
                <li><strong>Kanunlarda açıkça öngörülmesi:</strong> Vergi Usul Kanunu, MEB mevzuatı, 5651 sayılı Kanun</li>
                <li><strong>Hukuki yükümlülüğümüzü yerine getirebilmemiz için zorunlu olması:</strong> Fatura saklama, sertifika kayıtları</li>
                <li><strong>Meşru menfaatlerimiz için zorunlu olması:</strong> Hizmet kalitesinin iyileştirilmesi, dolandırıcılığın önlenmesi</li>
                <li><strong>Açık rızanız:</strong> Pazarlama iletişimi ve özel nitelikli veri işleme durumlarında</li>
              </ul>
            </div>

            {/* 6. Aktarım */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#6A0572] mb-3">6. Kişisel Verilerin Aktarıldığı Alıcı Grupları</h2>
              <p className="mb-3">Kişisel verileriniz, hizmetlerimizin sunulabilmesi amacıyla aşağıdaki <strong>alıcı gruplarına</strong> aktarılabilmektedir:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b-2 border-[#6A0572]">
                      <th className="py-2 pr-4 text-left font-semibold text-[#6A0572] w-2/5">Alıcı Grubu</th>
                      <th className="py-2 text-left font-semibold text-[#6A0572]">Aktarım Amacı</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#E2D1E8]"><td className="py-2 pr-4 align-top">Ön muhasebe ve mali müşavirlik hizmet sağlayıcıları</td><td className="py-2">Fatura düzenleme ve mali işlemler</td></tr>
                    <tr className="border-b border-[#E2D1E8]"><td className="py-2 pr-4 align-top">Kargo ve lojistik şirketleri</td><td className="py-2">Sertifika teslimi</td></tr>
                    <tr className="border-b border-[#E2D1E8]"><td className="py-2 pr-4 align-top">Sanal POS ve ödeme aracılık hizmet sağlayıcıları</td><td className="py-2">Çevrim içi ödeme tahsilatı</td></tr>
                    <tr className="border-b border-[#E2D1E8]"><td className="py-2 pr-4 align-top">SMS ve toplu mesaj hizmet sağlayıcıları</td><td className="py-2">Bildirim ve hatırlatma mesajları</td></tr>
                    <tr className="border-b border-[#E2D1E8]"><td className="py-2 pr-4 align-top">WhatsApp İş hizmet sağlayıcıları</td><td className="py-2">WhatsApp üzerinden iletişim</td></tr>
                    <tr className="border-b border-[#E2D1E8]"><td className="py-2 pr-4 align-top">Bulut altyapı ve veritabanı hizmet sağlayıcıları</td><td className="py-2">Sistem altyapısı, veritabanı, yedekleme</td></tr>
                    <tr className="border-b border-[#E2D1E8]"><td className="py-2 pr-4 align-top">Mobil uygulama altyapı sağlayıcıları</td><td className="py-2">Kimlik doğrulama, bildirim, hata izleme</td></tr>
                    <tr className="border-b border-[#E2D1E8]"><td className="py-2 pr-4 align-top">MEB ve yetkili kamu kurumları</td><td className="py-2">Sertifika onayı ve yasal yükümlülükler</td></tr>
                    <tr><td className="py-2 pr-4 align-top">Hukuk müşaviri ve avukatlar</td><td className="py-2">Hukuki süreçlerin yürütülmesi</td></tr>
                  </tbody>
                </table>
              </div>

              <h3 className="font-semibold text-[#8C1A85] mt-6 mb-2">Yurt Dışına Aktarım</h3>
              <p className="mb-2">Mobil uygulama altyapısı, bulut veritabanı ve mesajlaşma hizmetleri kapsamında, kişisel verileriniz teknolojik gereklilikler nedeniyle yurt dışında bulunan <strong>veri merkezleri</strong> üzerinde işlenebilmektedir. Söz konusu aktarımlar:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>KVKK Madde 9 kapsamında, <strong>uluslararası standartlara uygun güvenlik tedbirleri</strong> alınmış hizmet sağlayıcılar aracılığıyla yapılır,</li>
                <li>Hizmet sağlayıcılarla <strong>veri işleme sözleşmeleri</strong> akdedilmiştir,</li>
                <li>Verileriniz <strong>şifreli olarak</strong> iletilir ve saklanır.</li>
              </ul>
            </div>

            {/* 7. Saklama */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#6A0572] mb-3">7. Kişisel Verilerin Saklama Süresi</h2>
              <p className="mb-3">Kişisel verileriniz, aşağıdaki süreler boyunca saklanır:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b-2 border-[#6A0572]">
                      <th className="py-2 pr-4 text-left font-semibold text-[#6A0572]">Veri Kategorisi</th>
                      <th className="py-2 pr-4 text-left font-semibold text-[#6A0572]">Saklama Süresi</th>
                      <th className="py-2 text-left font-semibold text-[#6A0572]">Hukuki Dayanak</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#E2D1E8]"><td className="py-2 pr-4 align-top">Fatura ve mali kayıtlar</td><td className="py-2 pr-4 align-top"><strong>10 yıl</strong></td><td className="py-2 align-top">Vergi Usul Kanunu Md. 253</td></tr>
                    <tr className="border-b border-[#E2D1E8]"><td className="py-2 pr-4 align-top">Eğitim ve sertifika kayıtları</td><td className="py-2 pr-4 align-top"><strong>10 yıl</strong></td><td className="py-2 align-top">MEB mevzuatı, ispat yükü</td></tr>
                    <tr className="border-b border-[#E2D1E8]"><td className="py-2 pr-4 align-top">Kimlik ve iletişim bilgileri</td><td className="py-2 pr-4 align-top">Hizmet süresi + 10 yıl</td><td className="py-2 align-top">Sözleşmesel ilişki</td></tr>
                    <tr className="border-b border-[#E2D1E8]"><td className="py-2 pr-4 align-top">Pazarlama izinleri</td><td className="py-2 pr-4 align-top">İzin geri çekilene kadar</td><td className="py-2 align-top">Açık rıza</td></tr>
                    <tr className="border-b border-[#E2D1E8]"><td className="py-2 pr-4 align-top">Log kayıtları (IP, oturum)</td><td className="py-2 pr-4 align-top"><strong>2 yıl</strong></td><td className="py-2 align-top">5651 sayılı Kanun</td></tr>
                    <tr><td className="py-2 pr-4 align-top">Hizmet bitiminden sonra veriler</td><td className="py-2 pr-4 align-top"><strong>10 yıl</strong></td><td className="py-2 align-top">TBK zamanaşımı</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3">Süre sona erdiğinde verileriniz silinir, yok edilir veya anonim hale getirilir.</p>
            </div>

            {/* 8. Haklar */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#6A0572] mb-3">8. KVKK Madde 11 Kapsamındaki Haklarınız</h2>
              <p className="mb-2">Veri sahibi olarak KVKK&apos;nın 11. maddesi gereği aşağıdaki haklara sahipsiniz:</p>
              <ol className="list-decimal pl-6 space-y-1">
                <li>Kişisel verilerinizin işlenip işlenmediğini <strong>öğrenme</strong></li>
                <li>İşlenmişse buna ilişkin <strong>bilgi talep etme</strong></li>
                <li>Verilerin işlenme amacını ve amacına uygun kullanılıp kullanılmadığını <strong>öğrenme</strong></li>
                <li>Yurt içinde veya yurt dışında verilerin aktarıldığı üçüncü kişileri <strong>bilme</strong></li>
                <li>Eksik veya yanlış işlenmiş verilerin <strong>düzeltilmesini isteme</strong></li>
                <li>Verilerin <strong>silinmesini veya yok edilmesini</strong> isteme</li>
                <li>Düzeltme, silme ve yok etme işlemlerinin verilerin aktarıldığı üçüncü kişilere <strong>bildirilmesini isteme</strong></li>
                <li>İşlenen verilerin otomatik sistemler ile analiz edilmesi sonucunda aleyhinize bir sonuç çıkmasına <strong>itiraz etme</strong></li>
                <li>Verilerin kanuna aykırı işlenmesi sebebiyle zarara uğramanız halinde <strong>zararın giderilmesini talep etme</strong></li>
              </ol>
            </div>

            {/* 9. Başvuru */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#6A0572] mb-3">9. Haklarınızı Nasıl Kullanırsınız?</h2>
              <p className="mb-3">Yukarıdaki haklarınıza ilişkin taleplerinizi aşağıdaki yöntemlerle iletebilirsiniz:</p>

              <h3 className="font-semibold text-[#8C1A85] mt-3 mb-1">E-posta ile</h3>
              <p><a href="mailto:info@yenirotaegitim.com" className="text-[#6A0572] underline">info@yenirotaegitim.com</a> adresine başvurabilirsiniz.</p>

              <h3 className="font-semibold text-[#8C1A85] mt-3 mb-1">Yazılı başvuru ile</h3>
              <p>Maltepe Mahallesi Şehit Daniş Tunalıgil Sk. No: 2/5 Çankaya/Ankara adresine ıslak imzalı dilekçe ile başvurabilirsiniz.</p>

              <h3 className="font-semibold text-[#8C1A85] mt-3 mb-1">Başvuruda bulunması gerekenler</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Ad, soyad ve imza (yazılı başvuruda)</li>
                <li>T.C. kimlik numarası</li>
                <li>Tebligata esas yerleşim yeri / iş yeri adresi</li>
                <li>Bildirime esas elektronik posta adresi veya telefon numarası</li>
                <li>Talep konusu</li>
              </ul>

              <p className="mt-3">Başvurunuz, KVKK Madde 13 uyarınca <strong>en geç 30 gün</strong> içinde sonuçlandırılır. İşlem ücretsizdir; ancak ayrıca bir maliyet gerektirmesi halinde KVKK Kurulu tarafından belirlenen tarife uygulanabilir.</p>
            </div>

            {/* 10. Hesap Silme */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#6A0572] mb-3">10. Hesabınızı Silme Talebi</h2>
              <p className="mb-2">Mobil uygulamamızdaki hesabınızın ve ilişkili kişisel verilerinizin silinmesini talep edebilirsiniz.</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>E-posta:</strong> info@yenirotaegitim.com — &quot;Hesap Silme Talebi&quot; konusu ile</li>
                <li><strong>Süre:</strong> Talebiniz <strong>en geç 30 gün</strong> içinde sonuçlandırılır.</li>
                <li><strong>Saklanması zorunlu veriler:</strong> Fatura kayıtları VUK gereği 10 yıl, sertifika kayıtları MEB mevzuatı gereği saklanmaya devam eder. Bu veriler <strong>anonim hale getirilir</strong> ve sizinle ilişkilendirilemez.</li>
              </ul>
            </div>

            {/* 11. Çocuk Verisi */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#6A0572] mb-3">11. Çocukların Kişisel Verileri</h2>
              <p>Hizmetlerimiz <strong>18 yaş ve üzeri</strong> bireylere yöneliktir. 18 yaş altı kişilerden bilerek kişisel veri toplamayız. Bir çocuğun verisini topladığımızı tespit edersek derhal sileriz.</p>
            </div>

            {/* 12. Veri Güvenliği */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#6A0572] mb-3">12. Veri Güvenliği</h2>
              <p className="mb-2">Şirketimiz, kişisel verilerinizin güvenliğini sağlamak amacıyla aşağıdaki teknik ve idari tedbirleri almaktadır:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>SSL/TLS şifreleme ile güvenli veri aktarımı</li>
                <li>Yetkili erişim kontrolü ve rol bazlı yetkilendirme</li>
                <li>Düzenli yedekleme ve felaket kurtarma planları</li>
                <li>Personelin KVKK farkındalık eğitimleri</li>
                <li>Veri ihlali müdahale prosedürü</li>
              </ul>
              <p className="mt-3">Veri ihlali durumunda KVKK Kurulu&apos;na <strong>72 saat</strong> içinde, etkilenen veri sahiplerine ise makul süre içinde bildirim yapılır.</p>
            </div>

            {/* 13. Çerez */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#6A0572] mb-3">13. Çerez (Cookie) Politikası</h2>
              <p>Web sitemizde teknik olarak zorunlu çerezler, performans çerezleri ve pazarlama çerezleri kullanılmaktadır. Çerez tercihlerinizi tarayıcı ayarlarından yönetebilirsiniz.</p>
            </div>

            {/* 14. Değişiklikler */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#6A0572] mb-3">14. Aydınlatma Metni&apos;nde Değişiklikler</h2>
              <p>Bu metin, yasal düzenlemeler veya hizmetlerimizdeki değişiklikler doğrultusunda güncellenebilir. Güncel metni daima bu sayfada yayınlarız. Önemli değişikliklerde size e-posta veya uygulama bildirimi ile haber verilir.</p>
            </div>

            {/* Alt bilgi */}
            <div className="pt-6 border-t border-[#E2D1E8] text-center text-sm text-gray-600">
              <p><strong>Son Güncelleme Tarihi:</strong> 15 Kasım 2025</p>
              <p><strong>Yürürlük Tarihi:</strong> 15 Kasım 2025</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
