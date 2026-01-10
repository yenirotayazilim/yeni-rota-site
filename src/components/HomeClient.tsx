"use client"
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import 'aos/dist/aos.css'
import AOS from 'aos'
import HomeBasvuruModal from '@/components/HomeBasvuruModal'


interface Education {
  _id: string
  title: string
  description: string
  slug: { current: string }
  thumbnail?: { asset?: { url: string } }
}

interface Instructor {
  _id: string
  name: string
  slug: { current: string }
  photo?: { asset?: { url: string } }
}

interface Testimonial {
  _id: string
  isim: string
  metin: string
}

interface Props {
  egitimler: Education[]
  egitmenler: Instructor[]
  yorumlar: Testimonial[]

}

export default function HomeClient({ egitimler, egitmenler, yorumlar }: Props) {

  const [aktifIndex, setAktifIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null)
  const closeModal = () => setSelectedInstructor(null)

  // HomeClient bileşeni içinde:
  const [modalOpen, setModalOpen] = useState(false)

  const [currentLogo, setCurrentLogo] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogo((prev) => (prev + 1) % 2) // 2 logo olduğu için 2
    }, 3000) // 3 saniyede bir değiştir
    return () => clearInterval(interval)
  }, [])


  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setAktifIndex((prev) => (prev + 1) % yorumlar.length)
    }, 5000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [yorumlar.length])

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  return (
    <>

      <main
        className="font-sans"
        style={{
          background: "var(--background)",
          color: "var(--foreground)",
          fontFamily: "'Urbanist', Arial, sans-serif"
        }}
      >



        <section className="wow-hero-bg min-h-screen flex flex-col justify-center">
          <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Sol İçerik */}
            <div className="flex flex-col gap-9 z-10">
              <span className="text-white uppercase font-bold text-sm tracking-widest hero-anim text-dark" data-aos="fade-right" style={{ fontFamily: 'Urbanist, sans-serif' }}>
                Eğitimde Yeni Seviye
              </span>
              <h1 data-aos="fade-left"
                className="font-extrabold text-5xl md:text-6xl leading-snug md:leading-[1.12] hero-anim"
                style={{
                  color: "var(--foreground)",
                  fontFamily: "'Urbanist', sans-serif"
                }}
              >
                Geleceğini
                <br />
                <span data-aos="fade-right" className="block mt-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-hover)] bg-clip-text text-transparent">
                  Birlikte İnşa Et
                </span>
              </h1>
              <p className="text-lg text-[var(--foreground)] opacity-80 max-w-xl hero-anim" data-aos="fade-left" style={{ fontFamily: 'Urbanist, sans-serif' }}>
                Türkiye&apos;nin en yenilikçi eğitim platformu.<br />
                Kişiye özel <span className="font-semibold text-[var(--color-primary)]">canlı kurslar</span>, dinamik öğretmenler ve modern dijital deneyim!
              </p>
              <div className="flex gap-4 hero-anim">
                <a
                  data-aos="fade-up-right"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    setModalOpen(true)
                  }}
                  className="cta-main"
                  style={{
                    background: "linear-gradient(90deg, var(--color-primary) 40%, var(--color-primary-hover) 100%)",
                    color: "#fff",
                    fontFamily: 'Urbanist, sans-serif'
                  }}
                >
                  Hemen Başla
                </a>
                <a
                  data-aos="fade-up-left"
                  href="https://www.youtube.com/c/AdemerEğitimKurumu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-white text-[var(--color-primary)] hover:bg-[#AAA7AD] transition-colors duration-400 ease-in-out shadow-md"
                  style={{ fontFamily: 'Urbanist, sans-serif' }}
                >
                  <svg width="22" height="22" fill="none">
                    <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="2" />
                    <polygon points="10,7 16,11 10,15" fill="currentColor" />
                  </svg>
                  Video İzle
                </a>

              </div>
            </div>
            {/* Sağ Görsel ve Rakamlar */}
            <div className="flex flex-col items-center justify-center hero-anim" data-aos="flip-left">
              <div className="wow-hero-blur p-4 md:p-8 flex flex-col items-center shadow-xl">
                {/* Dönen logolar */}
                <div className="relative w-[260px] md:w-[330px] h-[180px] md:h-[240px] mb-5">
                  {["/images/rota.png", "/images/rota2.png"].map((logo, index) => (
                    <Image
                      key={index}
                      src={logo}
                      alt={`Logo ${index}`}
                      width={330}
                      height={240}
                      priority
                      className={`absolute top-0 left-0 w-full h-full object-contain rounded-xl transition-all duration-700 ease-in-out ${index === currentLogo ? "opacity-100 rotate-0" : "opacity-0 rotate-180"
                        }`}
                      style={{ backfaceVisibility: "hidden" }}
                    />
                  ))}
                </div>
                <div className="flex flex-row gap-6 md:gap-8 w-full justify-center">
                  <div className="flex flex-col items-center">
                    <span className="text-[var(--color-primary)] font-bold text-lg" style={{ fontFamily: 'Urbanist, sans-serif' }}>12K+</span>
                    <span className="text-[#000000] text-xs" style={{ fontFamily: 'Urbanist, sans-serif' }}>Kayıtlı Öğrenci</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[var(--color-primary)] font-bold text-lg" style={{ fontFamily: 'Urbanist, sans-serif' }}>84</span>
                    <span className="text-[#000000] text-xs" style={{ fontFamily: 'Urbanist, sans-serif' }}>Canlı Kurs</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[var(--color-primary)] font-bold text-lg" style={{ fontFamily: 'Urbanist, sans-serif' }}>4.9</span>
                    <span className="text-[#000000] text-xs" style={{ fontFamily: 'Urbanist, sans-serif' }}>Puan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HomeBasvuruModal open={modalOpen} setOpen={setModalOpen} />


          {/* Extra Styles */}
          <style jsx>{`
    .wow-hero-bg {
      background: var(--background);
    }
    .wow-hero-blur {
      background: rgba(255, 255, 255, 0.60);
      box-shadow: 0 16px 48px #6A057230, 0 0 0 0 #fff;
      backdrop-filter: blur(18px) saturate(120%);
      border-radius: 1.4rem;
      border: 1.5px solid #8C1A857a;
      transition: box-shadow .3s cubic-bezier(.22, .68, .38, .92);
    }
    .wow-hero-blur:hover {
      box-shadow: 0 24px 72px #6A057250;
    }
    .hero-anim {
      animation: fadeUpIn .9s cubic-bezier(.19, 1, .22, 1);
    }
    @keyframes fadeUpIn {
      from {
        opacity: 0;
        transform: translateY(32px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .hero-img-float {
      box-shadow: 0 14px 44px #6A05726b;
      border-radius: 1.3rem;
      animation: floatHero 5s ease-in-out infinite alternate;
      transition: box-shadow .2s;
    }
    @keyframes floatHero {
      from { transform: translateY(0); }
      to { transform: translateY(-22px); }
    }
    .cta-main {
      background: linear-gradient(90deg, #6A0572 40%, #8C1A85 100%);
      color: #fff;
      font-size: 1.22rem;
      font-family: 'Urbanist', sans-serif;
      font-weight: 700;
      border-radius: 9999px;
      padding: 1rem 2.7rem;
      box-shadow: 0 6px 20px #6A057245;
      transition: background .2s, box-shadow .2s, transform .14s;
      display: inline-block;
    }
    .cta-main:hover {
      background: linear-gradient(90deg, #8C1A85 0%, #6A0572 100%);
      box-shadow: 0 8px 34px #6A057265;
      transform: translateY(-3px) scale(1.06);
    }
  `}</style>
        </section>


        <section
          className="py-20 px-6"
          style={{
            background: "var(--background)"
          }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto mb-12 gap-4">
            <h2
              data-aos="fade-down-right"
              className="text-3xl md:text-4xl font-bold text-white text-dark text-center sm:text-left"
              style={{ fontFamily: 'Urbanist, sans-serif' }}
            >
              Popüler Eğitimler
            </h2>
            <Link
              data-aos="fade-down-left"
              href="/egitimler"
              className="inline-block px-7 py-3 rounded-full font-bold text-white cta-main shadow-lg hover:shadow-lg transition"
              style={{
                minWidth: "140px",
                textAlign: "center",
                fontFamily: 'Urbanist, sans-serif',
                background: "linear-gradient(90deg, var(--color-primary) 40%, var(--color-primary-hover) 100%)"
              }}
            >
              Tüm Eğitimler
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-7xl mx-auto" data-aos="zoom-in">
            {egitimler.map((egitim, i) => (
              <Link
                key={egitim._id}
                href={`/egitimler/${egitim.slug.current}`}
                className="wow-egitim-card rounded-2xl shadow-xl group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl card-animate"
                style={{ animationDelay: `${0.1 + i * 0.18}s`, fontFamily: 'Urbanist, sans-serif' }}
              >
                {/* 16:9 GÖRSEL */}
                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-2xl bg-gray-200">
                  <Image
                    src={egitim.thumbnail?.asset?.url || '/placeholder.png'}
                    alt={egitim.title}
                    fill // <-- Burası önemli!
                    className="object-cover group-hover:scale-105 transition-transform duration-400"
                    sizes="(max-width: 768px) 100vw, 600px"
                    priority={i === 0}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2 text-white text-dark" style={{ fontFamily: 'Urbanist, sans-serif' }}>
                    {egitim.title}
                  </h3>
                  <p className="text-sm text-white text-dark font-medium line-clamp-2" style={{ fontFamily: 'Urbanist, sans-serif' }}>
                    {egitim.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <style jsx>{`
    .cta-main {
      background: linear-gradient(90deg, #6A0572 40%, #8C1A85 100%);
      color: #fff;
      font-size: 1.1rem;
      font-weight: 700;
      font-family: 'Urbanist', sans-serif;
      border-radius: 9999px;
      box-shadow: 0 6px 20px #6A057245;
      transition: background .2s, box-shadow .2s, transform .14s;
      display: inline-block;
    }
    .cta-main:hover {
      background: linear-gradient(90deg, #8C1A85 0%, #6A0572 100%);
      box-shadow: 0 8px 34px #6A057265;
      transform: translateY(-2px) scale(1.07);
    }
    .wow-egitim-card {
      background: rgba(255,255,255,0.93);
      backdrop-filter: blur(9px) saturate(119%);
      border: 1.5px solid #8C1A857a;
      transition: box-shadow .22s cubic-bezier(.22,.68,.38,.92), transform .15s;
      min-height: 340px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      font-family: 'Urbanist', sans-serif;
    }
    .wow-egitim-card:hover {
      box-shadow: 0 20px 44px #6A057225, 0 0 0 2px #8C1A851a;
      transform: translateY(-2px) scale(1.045);
    }
    .card-animate {
      animation: fadeUpIn 0.8s cubic-bezier(.19,1,.22,1) both;
    }
    @keyframes fadeUpIn {
      from { opacity: 0; transform: translateY(38px);}
      to { opacity: 1; transform: translateY(0);}
    }
  `}</style>
        </section>

        <section
          className="py-20 px-6"
          style={{
            background: "var(--background)"
          }}
        >
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-white text-dark fade-in-up"
            data-aos="flip-down"
            style={{ fontFamily: 'Urbanist, sans-serif' }}
          >
            Eğitmenlerimiz
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {egitmenler.map((egitmen, i) => {
              const hasDetail = !!egitmen.slug?.current

              const CardContent = (
                <>
                  <div className="relative w-full aspect-[3/4] max-h-[360px] overflow-hidden rounded-xl border-4 border-[var(--color-primary)] shadow-md group-hover:scale-105 transition-all duration-300 mb-6">
                    <Image
                      src={egitmen.photo?.asset?.url || '/placeholder-profile.png'}
                      alt={egitmen.name || 'Eğitmen Fotoğrafı'} // 🚀 alt eklendi
                      fill
                      className="object-cover object-top"
                    />
                    <span className="absolute inset-0 rounded-xl bg-[var(--color-primary-hover)]/40 blur-lg opacity-40 -z-10"></span>
                  </div>
                  <h3 className="text-center text-[17px] font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-hover)] bg-clip-text text-transparent leading-tight" style={{ fontFamily: 'Urbanist, sans-serif' }}>
                    {egitmen.name}
                  </h3>
                </>
              )

              return hasDetail ? (
                <Link
                  data-aos="flip-left"
                  key={egitmen._id}
                  href={`/egitmenler/${egitmen.slug.current}`}
                  className="group bg-[var(--color-surface-bg)] rounded-2xl p-5 flex flex-col items-center shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl wow-egitmen-card"
                  style={{ animationDelay: `${0.1 + i * 0.13}s`, fontFamily: 'Urbanist, sans-serif' }}
                >
                  {CardContent}
                </Link>
              ) : (
                <div
                  key={egitmen._id}
                  onClick={() => setSelectedInstructor(egitmen)}
                  className="group bg-[var(--color-surface-bg)] rounded-2xl p-5 flex flex-col items-center shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl wow-egitmen-card cursor-pointer"
                  style={{ animationDelay: `${0.1 + i * 0.13}s`, fontFamily: 'Urbanist, sans-serif' }}
                >
                  {CardContent}
                </div>
              )
            })}

          </div>
          <style jsx>{`
    .fade-in-up {
      animation: fadeUpIn 0.8s cubic-bezier(.19,1,.22,1);
    }
    .wow-egitmen-card {
      background: var(--color-surface-bg, #F8F9FA);
      backdrop-filter: blur(10px) saturate(115%);
      border: 1.5px solid var(--color-primary-hover, #8C1A85);
      transition: box-shadow .23s cubic-bezier(.22,.68,.38,.92), transform .18s;
    }
    .wow-egitmen-card:hover {
      box-shadow: 0 14px 38px #8C1A8520, 0 0 0 2px #6A057220;
      transform: translateY(-2px) scale(1.055);
    }
    @keyframes fadeUpIn {
      from { opacity: 0; transform: translateY(38px);}
      to { opacity: 1; transform: translateY(0);}
    }
  `}</style>
        </section>




        <section
          className="py-24 px-6 text-center"
          style={{
            background: "var(--background)"
          }}
        >
          <p
            className="text-xs md:text-sm uppercase text-white text-dark tracking-widest mb-3 fade-up"
            data-aos="fade-up"
            style={{ fontFamily: 'Urbanist, sans-serif' }}
          >
            Kursiyer Yorumları
          </p>

          <h2
            className="text-3xl md:text-4xl font-bold mb-12 text-white text-dark fade-up"
            data-aos="zoom-in"
            style={{ fontFamily: 'Urbanist, sans-serif' }}
          >
            Sizden Gelenler
          </h2>
          <div className="max-w-5xl mx-auto overflow-hidden rounded-2xl relative shadow-xl wow-comment-bg fade-up">
            <div
              data-aos="flip-left"
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${aktifIndex * 100}%)` }}
            >
              {yorumlar.map(({ metin, isim }, i) => (
                <div key={i} className="relative min-w-full px-8 py-14 flex flex-col items-center">
                  {/* Tırnak */}
                  <span
                    className="absolute left-3 top-3 md:left-10 md:top-8 text-[var(--color-primary)] text-[60px] md:text-[88px] opacity-15 pointer-events-none select-none"
                    aria-hidden="true"
                    style={{ fontFamily: 'Urbanist, sans-serif' }}
                  >
                    ❝
                  </span>
                  {/* MÜŞTERİ AÇIKLAMASI (ŞİMDİ SİYAH) */}
                  <p className="text-base md:text-lg text-black font-medium leading-relaxed z-10 pl-8 md:pl-14" style={{ fontFamily: 'Urbanist, sans-serif' }}>
                    {metin}
                  </p>

                  <p className="mt-7 font-bold text-sm tracking-wide text-[var(--color-primary-hover)] z-10" style={{ fontFamily: 'Urbanist, sans-serif' }}>
                    {isim}
                  </p>
                </div>
              ))}
            </div>
            {/* Sağa ve sola oklar */}
            <button
              className="absolute top-1/2 left-2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--color-surface-bg)]/90 shadow hover:bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center z-20 transition"
              style={{ boxShadow: "0 4px 18px #6A057244", fontFamily: 'Urbanist, sans-serif' }}
              onClick={() => setAktifIndex((p) => (p - 1 + yorumlar.length) % yorumlar.length)}
              aria-label="Önceki yorum"
            >
              <svg width="22" height="22" fill="none"><path d="M14 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button
              className="absolute top-1/2 right-2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--color-surface-bg)]/90 shadow hover:bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center z-20 transition"
              style={{ boxShadow: "0 4px 18px #6A057244", fontFamily: 'Urbanist, sans-serif' }}
              onClick={() => setAktifIndex((p) => (p + 1) % yorumlar.length)}
              aria-label="Sonraki yorum"
            >
              <svg width="22" height="22" fill="none"><path d="M8 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
          <div className="flex justify-center gap-3 mt-8 fade-up">
            {yorumlar.map((_, i) => (
              <span
                key={i}
                className={`w-4 h-4 rounded-full border-2 border-[var(--color-primary)] transition-all duration-300 cursor-pointer 
        ${i === aktifIndex
                    ? "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-hover)] shadow-lg scale-110 border-transparent"
                    : "bg-[var(--color-surface-bg)] shadow border-[var(--color-primary)]"
                  }`}
                onClick={() => setAktifIndex(i)}
                style={{ fontFamily: 'Urbanist, sans-serif' }}
              />
            ))}
          </div>
          <style jsx>{`
    .wow-comment-bg {
      background: var(--color-surface-bg, #F8F9FA);
      backdrop-filter: blur(13px) saturate(120%);
      border: 1.5px solid var(--color-primary-hover, #8C1A85);
      transition: box-shadow .3s cubic-bezier(.22,.68,.38,.92);
    }
    .wow-comment-bg:hover {
      box-shadow: 0 16px 48px #6A057240;
    }
    .fade-up {
      animation: fadeUpIn .8s cubic-bezier(.19,1,.22,1);
    }
    @keyframes fadeUpIn {
      from { opacity: 0; transform: translateY(32px);}
      to { opacity: 1; transform: translateY(0);}
    }
  `}</style>
        </section>

        <section
          className="py-12 bg-transparent"
          style={{
            background: "var(--background)"
          }}
        >
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-center text-2xl md:text-3xl font-bold mb-8 tracking-tight text-white text-dark"
              style={{ fontFamily: 'Urbanist, sans-serif' }}
            >
              İş Ortaklarımız
            </h2>
            <div className="overflow-hidden relative">
              <div className="marquee flex items-center gap-10 py-4">
                {[...Array(2)].flatMap((_, i) => [
                  <div key={`logo1-${i}`} className="flex-shrink-0 bg-white/95 rounded-xl shadow-lg px-10 py-6 flex items-center justify-center border border-[#f3eafe]">
                    <Image
                      src="/images/ademer.png"
                      alt="Partner 1"
                      width={80}
                      height={40}
                      className="h-24 md:h-32 w-auto object-contain"
                    />
                  </div>,
                  <div key={`logo2-${i}`} className="flex-shrink-0 bg-white/95 rounded-xl shadow-lg px-10 py-6 flex items-center justify-center border border-[#f3eafe]">
                    <Image
                      src="/images/eralep.png"
                      alt="Partner 2"
                      width={80}
                      height={40}
                      className="h-24 md:h-32 w-auto object-contain"
                    />
                  </div>,
                  <div key={`logo3-${i}`} className="flex-shrink-0 bg-white/95 rounded-xl shadow-lg px-10 py-6 flex items-center justify-center border border-[#f3eafe]">
                    <Image
                      src="/images/rocca.png"
                      alt="Partner 3"
                      width={80}
                      height={40}
                      className="h-24 md:h-32 w-auto object-contain"
                    />
                  </div>,
                  <div key={`logo4-${i}`} className="flex-shrink-0 bg-white/95 rounded-xl shadow-lg px-10 py-6 flex items-center justify-center border border-[#f3eafe]">
                    <Image
                      src="/images/rocca2.png"
                      alt="Partner 4"
                      width={80}
                      height={40}
                      className="h-24 md:h-32 w-auto object-contain"
                    />
                  </div>,
                  <div key={`logo5-${i}`} className="flex-shrink-0 bg-white/95 rounded-xl shadow-lg px-10 py-6 flex items-center justify-center border border-[#f3eafe]">
                    <Image
                      src="/images/eralep.png"
                      alt="Partner 1"
                      width={80}
                      height={40}
                      className="h-24 md:h-32 w-auto object-contain"
                    />
                  </div>,
                ])}
              </div>
            </div>

          </div>
          {/* Custom Marquee Animation */}
          <style jsx>{`
    .marquee {
      animation: marquee 22s linear infinite;
      width: max-content;
      will-change: transform;
    }
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .marquee > div {
      transition: box-shadow 0.16s, transform 0.16s;
    }
    .marquee > div:hover {
      box-shadow: 0 12px 28px #8c1a8555, 0 0 0 2px #6A05722d;
      transform: scale(1.05);
      z-index: 3;
    }
    @media (max-width: 768px) {
      .marquee { gap: 2rem !important; }
    }
  `}</style>
        </section>



      </main>

      {selectedInstructor && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative bg-white rounded-xl p-6 w-[90vw] max-w-[600px]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Çarpı Butonu */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 z-10 w-9 h-9 bg-white rounded-full shadow-md border border-gray-300 flex items-center justify-center text-gray-500 hover:text-white hover:bg-[#6A0572] transition-all duration-300 text-xl font-bold"
              aria-label="Kapat"
            >
              ×
            </button>

            <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden">
              {selectedInstructor.photo?.asset?.url && (
                <Image
                  src={selectedInstructor.photo.asset.url}
                  alt={selectedInstructor.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <h2 className="text-center mt-4 text-lg font-semibold text-[#6A0572]">
              {selectedInstructor.name}
            </h2>
          </div>
        </div>
      )}
    </>
  )
}
