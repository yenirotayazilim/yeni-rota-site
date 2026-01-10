import { getEducationBySlug } from '@/lib/queries/education'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import EgitimBasvur from '@/components/EgitimBasvur'

type Params = {
  params: Promise<{ slug: string }>
}

export default async function EducationDetailPage({ params }: Params) {
  const { slug } = await params; // Doğru kullanım bu!
  const egitim = await getEducationBySlug(slug);

  if (!egitim) return notFound()

  return (
    <section
      className="max-w-4xl mx-auto px-4 py-16 font-sans min-h-screen relative"
      style={{
        borderRadius: "1.7rem",
        boxShadow: "0 8px 40px #6A057222"
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

      <Link
        href="/egitimler"
        className="inline-flex items-center gap-2 mb-8 px-5 py-2 bg-gradient-to-r from-[#6A0572] to-[#8C1A85]
          text-white font-semibold rounded-full shadow-lg transition-transform duration-300 hover:-translate-x-2 hover:shadow-[#8C1A85]/40"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Eğitimler
      </Link>

      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 bg-gradient-to-r from-[#6A0572] to-[#8C1A85] bg-clip-text text-transparent">
        {egitim.title}
      </h1>

      <div className="grid md:grid-cols-3 gap-10 items-start">
        {/* Görsel */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-[#6A0572] bg-white/90 md:col-span-1">
          {egitim.thumbnail?.asset?.url ? (
            <Image
              src={egitim.thumbnail.asset.url}
              alt={egitim.title}
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-80 bg-[#E2D1E8] flex items-center justify-center text-[#6A0572] font-bold text-lg">
              Görsel Yok
            </div>
          )}
          {/* Soft purple glow */}
          <span className="absolute inset-0 rounded-3xl bg-[#8C1A8588] blur-lg opacity-50 pointer-events-none -z-10"></span>
        </div>

        {/* Bilgiler */}
        <div className="md:col-span-2 flex flex-col gap-8">
          <p className="text-[#0D1B2A] text-lg leading-relaxed whitespace-pre-line font-medium bg-white/95 p-6 rounded-2xl shadow border border-[#E2D1E8]">
            {egitim.description}
          </p>

          <div>
            <h2 className="text-2xl font-bold text-[#8C1A85] mb-3">Müfredat</h2>
            {/* Müfredat varsa ekle, örnek: */}
            {egitim.content && egitim.content.length > 0 && (
              <ul className="list-disc list-inside pl-3 text-base text-[#232b41]">
                {egitim.content.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex flex-col gap-2 text-[#8C1A85] text-[15px] font-semibold">
            <span>
              <strong>Süre:</strong> <span className="text-[#0D1B2A]">{egitim.duration}</span>
            </span>
            {egitim.instructor?.name && (
              <span>
                <strong>Eğitmen:</strong> <span className="text-[#0D1B2A]">{egitim.instructor.name}</span>
              </span>
            )}
          </div>
        </div>
      </div>
      {/* Başvur Butonu */}
      <EgitimBasvur egitimAdi={egitim.title} />
    </section>
  )
}
