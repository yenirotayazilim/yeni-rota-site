import { getAboutPage } from '@/lib/queries/about'
import { PortableText } from '@portabletext/react'

export default async function HakkimizdaPage() {
  const data = await getAboutPage()

  if (!data) {
    return <div className="container mx-auto py-12">İçerik bulunamadı.</div>
  }

  return (
    <>
      {/* Arka planı tüm sayfaya sabitle */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          pointerEvents: "none",
          background: "radial-gradient(ellipse at 50% 0%, #F8F9FA 0%, #E0F6FF 70%, #0D1B2A 100%)"
        }}
      />
      <main className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-4xl flex flex-col items-center justify-center">
          {/* Başlık */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 bg-gradient-to-r from-[#6A0572] to-[#8C1A85] bg-clip-text text-transparent">
            {data.shortIntro}
          </h1>

          {/* Detaylı Açıklama */}
          {data.description && (
            <div className="w-full text-center text-[#0D1B2A] mb-10">
              <PortableText value={data.description} />
            </div>
          )}

          {/* Misyon / Vizyon */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-[#F8F9FA] p-6 rounded-xl border border-[#E2D1E8] transition-all duration-500 shadow hover:-translate-y-1 hover:shadow-lg hover:shadow-[#8C1A85]/20 hover:bg-white/90">
              <h3 className="text-lg font-bold text-[#6A0572] mb-2 text-center">Misyonumuz</h3>
              <p className="text-sm text-[#0D1B2A] whitespace-pre-line text-center">
                {data.mission || "Misyon içeriği burada gösterilecek."}
              </p>
            </div>
            <div className="bg-[#F8F9FA] p-6 rounded-xl border border-[#E2D1E8] transition-all duration-500 shadow hover:-translate-y-1 hover:shadow-lg hover:shadow-[#8C1A85]/20 hover:bg-white/90">
              <h3 className="text-lg font-bold text-[#6A0572] mb-2 text-center">Vizyonumuz</h3>
              <p className="text-sm text-[#0D1B2A] whitespace-pre-line text-center">
                {data.vision || "Vizyon içeriği burada gösterilecek."}
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
