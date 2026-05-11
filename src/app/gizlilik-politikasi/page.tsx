export default function GizlilikPolitikasiPage() {
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
            Gizlilik Politikası
          </h1>
          <p className="text-[#0D1B2A] text-md md:text-lg">
            RotaEdu Mobil Uygulaması — Privacy Policy
          </p>
          <p className="text-[#6A0572] text-sm mt-2 font-semibold">
            Son Güncelleme: 15 Kasım 2025
          </p>
        </div>

        {/* Ana Kart */}
        <div className="relative bg-[#F8F9FA]/95 rounded-2xl border border-[#E2D1E8] p-6 md:p-10 shadow-lg">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6A0572] to-[#8C1A85] rounded-t-xl"></div>

          <div className="text-[#0D1B2A] leading-relaxed space-y-8 text-sm md:text-base">

            {/* Giriş */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#6A0572] mb-3">Giriş</h2>
              <p className="mb-3">
                Bu Gizlilik Politikası, <strong>Yeni Rota Eğitim</strong> tarafından geliştirilen ve dağıtılan <strong>RotaEdu</strong> mobil uygulamasının (iOS ve Android) kullanıcı verilerini nasıl işlediğini açıklar.
              </p>
              <p className="mb-3">
                <strong>Önemli not:</strong> RotaEdu mobil uygulaması, kullanıcılardan <strong>yeni kişisel veri toplamaz</strong>. Uygulamaya giriş yapabilmek için, kullanıcının önceden web sitemiz veya danışmanlarımız üzerinden eğitim kaydı yaptırmış olması gerekir. Mobil uygulama, daha önce paylaştığınız bilgileri <strong>görüntülemek</strong> ve eğitim hizmetini sunmak için kullanılır.
              </p>
              <p>
                Bununla birlikte, uygulamanın çalışabilmesi için bazı teknik veriler işlenir. Bu politika, bu işlemleri şeffaf bir şekilde açıklar.
              </p>
            </div>

            {/* 1. Geliştirici Bilgisi */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#6A0572] mb-3">1. Geliştirici Bilgisi</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <tbody>
                    <tr className="border-b border-[#E2D1E8]">
                      <td className="py-2 pr-4 font-semibold align-top w-1/3">Geliştirici / Veri Sorumlusu</td>
                      <td className="py-2">Yeni Rota Eğitim</td>
                    </tr>
                    <tr className="border-b border-[#E2D1E8]">
                      <td className="py-2 pr-4 font-semibold align-top">Yasal Ünvan</td>
                      <td className="py-2">Rota Aile Sağlığı ve Danışmanlığı Eğitim Hizmetleri Test Uygulamaları Psikoteknik Ticaret Limited Şirketi</td>
                    </tr>
                    <tr className="border-b border-[#E2D1E8]">
                      <td className="py-2 pr-4 font-semibold align-top">Adres</td>
                      <td className="py-2">Maltepe Mahallesi Şehit Daniş Tunalıgil Sk. No: 2/5 Çankaya/Ankara</td>
                    </tr>
                    <tr className="border-b border-[#E2D1E8]">
                      <td className="py-2 pr-4 font-semibold align-top">E-posta</td>
                      <td className="py-2"><a href="mailto:info@yenirotaegitim.com" className="text-[#6A0572] underline">info@yenirotaegitim.com</a></td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-semibold align-top">Uygulama Adı</td>
                      <td className="py-2">RotaEdu (iOS &amp; Android)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 2. Uygulamanın İşlediği Veriler */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#6A0572] mb-3">2. Uygulamanın İşlediği Veriler</h2>
              <p className="mb-3">RotaEdu mobil uygulaması aşağıdaki verileri işler:</p>

              <h3 className="font-semibold text-[#8C1A85] mt-4 mb-2">2.1. Kullanıcı Kimlik ve Hesap Verileri</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>E-posta adresi:</strong> Hesabınıza giriş yapmak için</li>
                <li><strong>Şifre yönetimi:</strong> Şifreniz Firebase Authentication (Google LLC) tarafından güvenli şekilde yönetilir. Yeni Rota Eğitim, kullanıcı şifrelerine erişemez ve şifreleri kendi sistemlerinde saklamaz.</li>
                <li><strong>Kullanıcı kimliği (UID):</strong> Hesabınızı tanımlamak için</li>
              </ul>

              <h3 className="font-semibold text-[#8C1A85] mt-4 mb-2">2.2. Eğitim ve Profil Verileri (Sunucudan Çekilen)</h3>
              <p className="mb-2">Uygulama, sunucumuzdan size ait şu bilgileri çeker ve gösterir:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Ad, soyad</li>
                <li>E-posta adresi</li>
                <li>Telefon numarası</li>
                <li>Doğum tarihi</li>
                <li>T.C. kimlik numarası (uygulamada maskeli gösterilir)</li>
                <li>Adres bilgisi</li>
                <li>Kayıtlı olduğunuz eğitim programları</li>
                <li>Eğitim ilerleme durumu, canlı ders bilgileri, sertifika bilgileri</li>
                <li>Sınav sonuçları ve katılım kayıtları</li>
                <li>Ödeme planı bilgileri (taksit tutarı, ödeme durumu)</li>
              </ul>

              <h3 className="font-semibold text-[#8C1A85] mt-4 mb-2">2.3. Teknik ve Cihaz Verileri</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Cihaz tanımlayıcısı (Device Token):</strong> Push bildirim gönderebilmek için</li>
                <li><strong>İşletim sistemi ve sürüm bilgisi:</strong> Uygulama uyumluluğu için</li>
                <li><strong>Uygulama sürümü:</strong> Destek ve hata ayıklama için</li>
                <li><strong>Hata raporları (Crash Reports):</strong> Uygulama çökerse otomatik gönderilir, kişisel veri içermez</li>
              </ul>

              <h3 className="font-semibold text-[#8C1A85] mt-4 mb-2">2.4. Uygulama İçinde TOPLANMAYAN Veriler</h3>
              <p className="mb-2">Aşağıdaki veriler RotaEdu uygulaması tarafından <strong>toplanmaz</strong>:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>❌ Konum bilgisi (GPS)</li>
                <li>❌ Kamera, mikrofon, fotoğraf galerisi erişimi</li>
                <li>❌ Rehber/kişiler</li>
                <li>❌ Sağlık verileri</li>
                <li>❌ Reklam tanımlayıcısı (IDFA / Advertising ID)</li>
                <li>❌ Tarama geçmişi</li>
                <li>❌ Kredi kartı veya finansal bilgi</li>
              </ul>
            </div>

            {/* 3. Verilerin Kullanım Amaçları */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#6A0572] mb-3">3. Verilerin Kullanım Amaçları</h2>
              <p className="mb-2">Topladığımız veriler yalnızca aşağıdaki amaçlarla kullanılır:</p>
              <ol className="list-decimal pl-6 space-y-1">
                <li><strong>Kimlik doğrulama:</strong> Hesabınıza güvenli şekilde giriş yapmanızı sağlamak</li>
                <li><strong>Eğitim hizmetinin sunulması:</strong> Kayıtlı olduğunuz derslere erişiminizi sağlamak</li>
                <li><strong>Bildirim gönderimi:</strong> Ders hatırlatmaları, duyurular ve önemli güncellemeler</li>
                <li><strong>Uygulama performansı:</strong> Hataları tespit etmek ve düzeltmek</li>
                <li><strong>Güvenlik:</strong> Yetkisiz erişimi tespit ve önlemek</li>
              </ol>
              <p className="mt-3">Verileriniz <strong>reklam, profil çıkarma veya üçüncü taraflara satış</strong> amacıyla kullanılmaz.</p>
            </div>

            {/* 4. Üçüncü Taraf Hizmet Sağlayıcılar */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#6A0572] mb-3">4. Üçüncü Taraf Hizmet Sağlayıcılar</h2>
              <p className="mb-3">RotaEdu uygulaması, çalışabilmek için aşağıdaki üçüncü taraf hizmet sağlayıcıları kullanır. Bu sağlayıcıların gizlilik politikalarına bağlantılar aşağıdadır.</p>

              <div className="space-y-4">

                <div className="bg-white/60 rounded-lg p-4 border border-[#E2D1E8]">
                  <h3 className="font-bold text-[#8C1A85] mb-1">Firebase Authentication (Google LLC)</h3>
                  <p className="text-sm mb-1"><strong>Amaç:</strong> Kullanıcı kimlik doğrulama (giriş/şifre)</p>
                  <p className="text-sm mb-1"><strong>İşlenen veri:</strong> E-posta, hashlenmiş şifre, kullanıcı kimliği (UID)</p>
                  <p className="text-sm mb-1"><strong>Veri merkezi:</strong> ABD</p>
                  <p className="text-sm"><strong>Politika:</strong> <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#6A0572] underline">policies.google.com/privacy</a></p>
                </div>

                <div className="bg-white/60 rounded-lg p-4 border border-[#E2D1E8]">
                  <h3 className="font-bold text-[#8C1A85] mb-1">Firebase Cloud Messaging — FCM (Google LLC)</h3>
                  <p className="text-sm mb-1"><strong>Amaç:</strong> Push bildirim gönderimi</p>
                  <p className="text-sm mb-1"><strong>İşlenen veri:</strong> Cihaz token, uygulama kimliği</p>
                  <p className="text-sm mb-1"><strong>Veri merkezi:</strong> ABD</p>
                  <p className="text-sm"><strong>Politika:</strong> <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#6A0572] underline">policies.google.com/privacy</a></p>
                </div>

                <div className="bg-white/60 rounded-lg p-4 border border-[#E2D1E8]">
                  <h3 className="font-bold text-[#8C1A85] mb-1">Firebase Crashlytics (Google LLC)</h3>
                  <p className="text-sm mb-1"><strong>Amaç:</strong> Uygulama çökmelerinin otomatik raporlanması</p>
                  <p className="text-sm mb-1"><strong>İşlenen veri:</strong> Çökme logları, cihaz modeli, işletim sistemi sürümü, uygulama sürümü</p>
                  <p className="text-sm mb-1"><strong>Veri merkezi:</strong> ABD</p>
                  <p className="text-sm"><strong>Politika:</strong> <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer" className="text-[#6A0572] underline">firebase.google.com/support/privacy</a></p>
                </div>

                <div className="bg-white/60 rounded-lg p-4 border border-[#E2D1E8]">
                  <h3 className="font-bold text-[#8C1A85] mb-1">Supabase (Supabase Inc.)</h3>
                  <p className="text-sm mb-1"><strong>Amaç:</strong> Eğitim ve kullanıcı verilerinin saklanması</p>
                  <p className="text-sm mb-1"><strong>İşlenen veri:</strong> Profil bilgileri, eğitim kayıtları</p>
                  <p className="text-sm mb-1"><strong>Veri merkezi:</strong> Almanya (Avrupa Birliği)</p>
                  <p className="text-sm"><strong>Politika:</strong> <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#6A0572] underline">supabase.com/privacy</a></p>
                </div>

                <div className="bg-white/60 rounded-lg p-4 border border-[#E2D1E8]">
                  <h3 className="font-bold text-[#8C1A85] mb-1">YouTube Embedded Player (Google LLC)</h3>
                  <p className="text-sm mb-1"><strong>Amaç:</strong> Eğitim videolarının uygulama içinde gösterilmesi</p>
                  <p className="text-sm mb-1"><strong>İşlenen veri:</strong> Video oynatma sırasında YouTube tarafından IP adresi ve oturum bilgisi işlenebilir</p>
                  <p className="text-sm mb-1"><strong>Not:</strong> Gizliliğinizi korumak için &quot;İlgili Video Önerme&quot; (rel=0) ve modest branding ayarları aktiftir.</p>
                  <p className="text-sm"><strong>Politika:</strong> <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#6A0572] underline">policies.google.com/privacy</a></p>
                </div>

              </div>
            </div>

            {/* 5. Veri Aktarımı */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#6A0572] mb-3">5. Veri Aktarımı ve Saklama</h2>
              <p className="mb-2">
                Verileriniz yukarıda belirtilen hizmet sağlayıcıların sunucularında saklanır. Bu sunucular yurt dışında (ABD ve Avrupa Birliği) bulunabilir. Veri aktarımları:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>SSL/TLS şifreleme ile yapılır</li>
                <li>Sağlayıcılarla veri işleme sözleşmeleri akdedilmiştir</li>
                <li>Sağlayıcılar uluslararası güvenlik standartlarına (ISO 27001, SOC 2) uyar</li>
              </ul>
            </div>

            {/* 6. Veri Saklama Süresi */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#6A0572] mb-3">6. Veri Saklama Süresi</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Aktif hesap verileri:</strong> Hesabınız aktif olduğu sürece saklanır</li>
                <li><strong>Crash raporları:</strong> 90 gün sonra otomatik silinir</li>
                <li><strong>Push token:</strong> Uygulamayı silene veya çıkış yapana kadar</li>
                <li><strong>Yasal saklama:</strong> Fatura ve sertifika kayıtları (Vergi Usul Kanunu ve MEB mevzuatı gereği <strong>10 yıl</strong> saklanır, anonim hale getirilebilir)</li>
              </ul>
            </div>

            {/* 7. Kullanıcı Hakları */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#6A0572] mb-3">7. Kullanıcı Haklarınız</h2>
              <p className="mb-2">Aşağıdaki haklara sahipsiniz:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Verilerinize <strong>erişim</strong> talep etme</li>
                <li>Verilerinizin <strong>düzeltilmesini</strong> talep etme</li>
                <li>Verilerinizin <strong>silinmesini</strong> talep etme</li>
                <li><strong>Hesabınızı silme</strong> (bkz. Bölüm 8)</li>
                <li>Push bildirim izinlerini cihaz ayarlarından <strong>geri çekme</strong></li>
              </ul>
              <p className="mt-3">
                Tüm haklarınızı kullanmak için: <a href="mailto:info@yenirotaegitim.com" className="text-[#6A0572] underline">info@yenirotaegitim.com</a>
              </p>
            </div>

            {/* 8. Hesap Silme */}
            <div className="bg-[#6A0572]/5 rounded-lg p-5 border-2 border-[#6A0572]/30">
              <h2 className="text-xl md:text-2xl font-bold text-[#6A0572] mb-3">8. Hesap Silme</h2>
              <p className="mb-4">
                Hesabınızı ve verilerinizi silmek için <strong>iki yöntem</strong> sunuyoruz:
              </p>

              <h3 className="font-bold text-[#8C1A85] mt-3 mb-2">Yöntem 1 — Uygulama İçinden (Önerilen)</h3>
              <ol className="list-decimal pl-6 space-y-1 mb-3">
                <li><strong>Profil</strong> sayfasına gidin</li>
                <li><strong>Ayarlar</strong>&apos;a girin</li>
                <li><strong>&quot;Hesabımı Sil&quot;</strong> seçeneğine dokunun</li>
                <li>Onay ekranını okuyup talebinizi onaylayın</li>
              </ol>
              <p className="mb-4 text-sm">
                Onay sonrası hesabınız <strong>anında</strong> Firebase Authentication sisteminden silinir ve uygulamaya bir daha aynı e-posta adresiyle giriş yapamazsınız.
              </p>

              <h3 className="font-bold text-[#8C1A85] mt-3 mb-2">Yöntem 2 — E-posta ile</h3>
              <ol className="list-decimal pl-6 space-y-1 mb-3">
                <li>
                  <a href="mailto:info@yenirotaegitim.com?subject=Hesap%20Silme%20Talebi" className="text-[#6A0572] underline">info@yenirotaegitim.com</a> adresine &quot;Hesap Silme Talebi&quot; konusu ile mesaj gönderin
                </li>
                <li>Mesajınıza <strong>kayıtlı e-posta adresinizi</strong> ekleyin</li>
                <li>Talebiniz <strong>en geç 30 gün</strong> içinde sonuçlandırılır</li>
              </ol>

              <p className="mb-2 mt-4"><strong>Hangi veriler silinir:</strong></p>
              <ul className="list-disc pl-6 space-y-1 mb-3">
                <li>Profil bilgileriniz (ad, soyad, telefon, e-posta)</li>
                <li>Giriş kimlik bilgileri (Firebase Auth hesabı)</li>
                <li>Push bildirim token&apos;ı</li>
                <li>Uygulama oturum kayıtları</li>
              </ul>
              <p className="mb-2"><strong>Yasal nedenlerle saklanan veriler:</strong></p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Fatura kayıtları (Vergi Usul Kanunu Md. 253 — 10 yıl)</li>
                <li>Sertifika kayıtları (MEB mevzuatı — 10 yıl)</li>
              </ul>
              <p className="mt-3 text-sm italic">Bu yasal olarak saklanması gereken veriler <strong>anonim hale getirilir</strong> ve sizinle ilişkilendirilemez.</p>
            </div>

            {/* 9. Çocuklar */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#6A0572] mb-3">9. Çocukların Gizliliği</h2>
              <p>
                RotaEdu uygulaması <strong>18 yaş ve üzeri</strong> bireylere yöneliktir. 18 yaş altı kullanıcılardan bilerek veri toplamayız. Bir çocuğun verisini topladığımızı tespit edersek derhal sileriz.
              </p>
            </div>

            {/* 10. Güvenlik */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#6A0572] mb-3">10. Veri Güvenliği</h2>
              <p className="mb-2">Verilerinizi korumak için aşağıdaki tedbirleri uygularız:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Tüm veri iletimi <strong>SSL/TLS şifreleme</strong> ile yapılır</li>
                <li>Şifreler <strong>bcrypt</strong> ile hashlenir, açık metin olarak saklanmaz</li>
                <li>Yetkili erişim kontrolü ve rol bazlı yetkilendirme</li>
                <li>Düzenli güvenlik denetimleri</li>
                <li>Veri ihlali müdahale prosedürü</li>
              </ul>
            </div>

            {/* 11. Değişiklikler */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#6A0572] mb-3">11. Politika Değişiklikleri</h2>
              <p>
                Bu Gizlilik Politikası, yasal düzenlemeler veya uygulama özelliklerindeki değişiklikler doğrultusunda güncellenebilir. Güncel versiyon her zaman bu sayfada yayınlanır. Önemli değişikliklerde uygulama içi bildirim veya e-posta yoluyla bilgilendirilirsiniz.
              </p>
            </div>

            {/* 12. İletişim */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#6A0572] mb-3">12. İletişim</h2>
              <p className="mb-2">Bu politika veya gizlilik uygulamalarımız hakkında sorularınız için:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>E-posta:</strong> <a href="mailto:info@yenirotaegitim.com" className="text-[#6A0572] underline">info@yenirotaegitim.com</a></li>
                <li><strong>Adres:</strong> Maltepe Mahallesi Şehit Daniş Tunalıgil Sk. No: 2/5 Çankaya/Ankara</li>
                <li><strong>Web:</strong> <a href="https://www.yenirotaegitim.com" className="text-[#6A0572] underline">www.yenirotaegitim.com</a></li>
              </ul>
              <p className="mt-3">
                Türkiye&apos;de yaşıyorsanız ayrıca <a href="/kvkk" className="text-[#6A0572] underline">KVKK Aydınlatma Metnimiz</a>i de inceleyebilirsiniz.
              </p>
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
