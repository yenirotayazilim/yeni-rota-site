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
      <div className="max-w-3xl mx-auto">
        {/* Başlık */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#6A0572] to-[#8C1A85] bg-clip-text text-transparent mb-3 tracking-tight">
            KVKK & Kullanım Şartları
          </h1>
          <p className="text-[#0D1B2A] text-md md:text-lg">
            Gizliliğiniz bizim için önemli. Lütfen yasal metinleri dikkatle okuyunuz.
          </p>
        </div>

        {/* KVKK Kart */}
        <div className="relative bg-[#F8F9FA]/90 rounded-2xl border border-[#E2D1E8] p-6 shadow-lg hover:shadow-[#6A0572]/20 transition-all duration-300 mb-12">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6A0572] to-[#8C1A85] rounded-t-xl"></div>
          <div className="flex items-center gap-3 mb-4">
            <i className="fas fa-user-shield text-[#6A0572] text-xl"></i>
            <h2 className="text-xl font-semibold text-[#6A0572]">KVKK Aydınlatma Metni</h2>
          </div>
          <div className="text-sm text-[#0D1B2A] leading-relaxed space-y-3 prose prose-p:text-[#0D1B2A] prose-li:text-[#0D1B2A]">
            {/* Statik KVKK metni */}
            <p>
              Kişisel verileriniz 6698 sayılı KVK Kanunu kapsamında Yeni Rota Eğitim tarafından, yasal düzenlemelere uygun şekilde işlenmektedir.
              Kişisel verilerinizin işlenmesine ilişkin detaylı bilgiye web sitemizden ulaşabilirsiniz.
            </p>
            <ul>
              <li>Veri sorumlusu: Yeni Rota Eğitim</li>
              <li>İşlenen veriler: Ad, soyad, iletişim, eğitim geçmişi vb.</li>
              <li>Haklarınız: KVKK kapsamındaki tüm haklarınızı kullanabilirsiniz.</li>
            </ul>
          </div>
        </div>

        {/* Kullanım Koşulları Kart */}
        <div className="relative bg-[#F8F9FA]/90 rounded-2xl border border-[#E2D1E8] p-6 shadow-lg hover:shadow-[#8C1A85]/20 transition-all duration-300">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6A0572] to-[#8C1A85] rounded-t-xl"></div>
          <div className="flex items-center gap-3 mb-4">
            <i className="fas fa-file-contract text-[#8C1A85] text-xl"></i>
            <h2 className="text-xl font-semibold text-[#8C1A85]">Kullanım Koşulları</h2>
          </div>
          <div className="text-sm text-[#0D1B2A] leading-relaxed space-y-3 prose prose-p:text-[#0D1B2A] prose-li:text-[#0D1B2A]">
            {/* Statik Kullanım Şartları metni */}
            <p>
              Web sitemizi kullanan tüm ziyaretçiler aşağıdaki koşulları kabul etmiş sayılır:
            </p>
            <ul>
              <li>Platformu yasalara uygun şekilde kullanınız.</li>
              <li>Kullanıcı bilgilerinizin güvenliğinden sorumlusunuz.</li>
              <li>Telif hakkı, gizlilik ve diğer yasal yükümlülüklere uyunuz.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
