import { getInstructorBySlug } from '@/lib/queries/instructor'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

type Params = {
  params: Promise<{ slug: string }>
}

export default async function EgitmenDetayPage({ params }: Params) {
  const { slug } = await params
  const egitmen = await getInstructorBySlug(slug)
  if (!egitmen) return notFound()

  return (
    <section
      className="max-w-5xl mx-auto px-4 py-20 font-sans rounded-2xl relative"
      style={{
        minHeight: "80vh"
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
        href="/egitmenler"
        className="inline-flex items-center gap-2 mb-8 px-5 py-2 bg-gradient-to-r from-[#6A0572] to-[#8C1A85] text-white font-semibold rounded-full shadow-lg transition-transform duration-300 hover:-translate-x-2 hover:shadow-[#6A0572]/40"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Eğitmenler
      </Link>

      <div className="grid md:grid-cols-3 gap-10 items-start">
        {/* Fotoğraf */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-[#6A0572] flex items-center justify-center bg-white/70 hover:scale-105 transition-transform duration-500">
          {egitmen.photo?.asset?.url ? (
            <Image
              src={egitmen.photo.asset.url}
              alt={egitmen.name}
              width={400}
              height={400}
              className="w-full h-full object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-[#E2D1E8] flex items-center justify-center text-[#6A0572] text-xl font-bold">
              Fotoğraf Yok
            </div>
          )}
          {/* Soft glow efekti */}
          <span className="absolute inset-0 rounded-3xl bg-[#8C1A8588] blur-lg opacity-50 pointer-events-none -z-10"></span>
        </div>

        {/* Bilgiler */}
        <div className="md:col-span-2 space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#6A0572] to-[#8C1A85] bg-clip-text text-transparent mb-3">{egitmen.name}</h1>
          <h2 className="text-xl text-[#8C1A85] font-semibold mb-3">{egitmen.title || 'Eğitmen'}</h2>
          <div className="space-y-5 leading-relaxed text-base text-[#0D1B2A] font-medium">
            <p className="whitespace-pre-line">{egitmen.bio}</p>

            {egitmen.expertise && (
              <>
                <h3 className="font-semibold text-lg text-[#6A0572]">Uzmanlık Alanları</h3>
                <ul className="list-disc list-inside pl-3">
                  {egitmen.expertise.map((alan: string, i: number) => (
                    <li key={i}>{alan}</li>
                  ))}
                </ul>
              </>
            )}

            {egitmen.certifications && (
              <>
                <h3 className="font-semibold text-lg text-[#6A0572]">Eğitim ve Sertifikalar</h3>
                <ul className="list-disc list-inside pl-3">
                  {egitmen.certifications.map((sertifika: string, i: number) => (
                    <li key={i}>{sertifika}</li>
                  ))}
                </ul>
              </>
            )}

            {egitmen.cv?.asset?.url && (
              <a
                href={egitmen.cv.asset.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 px-5 py-2 bg-gradient-to-r from-[#6A0572] to-[#8C1A85] text-white rounded-full font-bold hover:scale-105 shadow-md transition"
              >
                CV&apos;yi Görüntüle (PDF)
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
