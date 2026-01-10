'use client'

import Image from 'next/image'
import Link from 'next/link'

interface AboutProps {
  sliderMediaUrl?: string
  shortIntro?: string
}

export default function HeroSlider({ about }: { about: AboutProps }) {
  const isVideo = about?.sliderMediaUrl?.endsWith('.mp4')

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Medya Arka Plan */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        {about?.sliderMediaUrl ? (
          isVideo ? (
            <video
              src={about.sliderMediaUrl}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster=""
              style={{ display: 'block' }}
            />
          ) : (
            <Image
              src={about.sliderMediaUrl}
              alt={about.shortIntro || "Hero Medya"}
              fill
              className="object-cover"
              priority
            />
          )
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">Görsel veya Video bulunamadı</span>
          </div>
        )}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10" />
      </div>

      {/* İçerik */}
      <div className="relative z-20 w-full flex flex-col items-center justify-center text-center">
        <div className="max-w-2xl w-full mx-auto px-4 md:px-0 py-12">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-7 leading-tight text-white drop-shadow-xl">
            {about?.shortIntro || "Türkiye'nin En Yenilikçi Eğitim Platformu"}
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/egitimler"
              className="bg-[#6A0572] hover:bg-[#8C1A85] px-7 py-2.5 rounded-full text-white font-bold text-base shadow-md transition-colors duration-300"
              style={{ fontFamily: 'Urbanist, sans-serif' }}
            >
              Tüm Eğitimler
            </Link>
            <Link
              href="/iletisim"
              className="bg-white/80 border-2 border-[#6A0572] text-[#6A0572] hover:bg-[#8C1A85] hover:text-white px-7 py-2.5 rounded-full font-bold text-base shadow-md transition-colors duration-300"
              style={{ fontFamily: 'Urbanist, sans-serif' }}
            >
              İletişim
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
