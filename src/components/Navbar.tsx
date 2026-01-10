"use client"

import { useState, useRef, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()

  const [currentLogo, setCurrentLogo] = useState(0)

  const logos = ["/images/rota.png", "/images/rota2.png"]

  // Scroll olursa blur ve gölge ekle
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Fade-in animasyonu (ilk açılışta bir defa)
  const [navVisible, setNavVisible] = useState(false)
  useEffect(() => {
    setTimeout(() => setNavVisible(true), 80)
  }, [])

  useEffect(() => {
  const interval = setInterval(() => {
    setCurrentLogo((prev) => (prev + 1) % logos.length)
  }, 5000)
  return () => clearInterval(interval)
}, [logos.length])

  const openMenu = (menu: string) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current)
    setOpenDropdown(menu)
  }

  const toggleDropdown = (menu: string) => {
    setOpenDropdown((prev) => (prev === menu ? null : menu))
  }

  const closeMenuWithDelay = () => {
    hoverTimeout.current = setTimeout(() => {
      setOpenDropdown(null)
    }, 700)
  }

  useEffect(() => {
    setMobileMenuOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (
        !target.closest(".dropdown") &&
        !target.closest("#nav-toggle") &&
        !target.closest("#nav-menu")
      ) {
        setOpenDropdown(null)
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-300
        ${scrolled ? "backdrop-blur-md bg-white/80 shadow-lg" : "bg-white/95 shadow-none"}
        ${navVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
      `}
      style={{ willChange: "opacity,transform,background" }}
    >
      <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center" style={{ height: "70px" }}>
        <Link href="/" className="flex items-center h-[180px] w-[180px]">
          <div className="relative h-full w-[160px] min-w-[120px]">
            {logos.map((logo, index) => (
              <Image
                key={index}
                src={logo}
                alt={`Logo ${index}`}
                width={160}
                height={70}
                priority
                className={`absolute top-0 left-0 h-full w-auto object-contain transition-all duration-700 ease-in-out ${
                  index === currentLogo ? "opacity-100 rotate-0" : "opacity-0 rotate-180"
                }`}
                style={{ backfaceVisibility: "hidden" }}
              />
            ))}
          </div>
        </Link>

        {/* Desktop Menü */}
        <ul className="hidden lg:flex items-center gap-7 text-[#232b41] text-[17px] font-bold">
          <li>
            <Link href="/" className="transition px-3 py-2 rounded-lg hover:bg-[#8C1A85] hover:text-white">
              Ana Sayfa
            </Link>
          </li>
          <li>
            <Link href="/egitimler" className="flex items-center transition px-3 py-2 rounded-lg hover:bg-[#6A0572] hover:text-white">
              Eğitimler
            </Link>
          </li>
          <li
            className="relative dropdown"
            onMouseEnter={() => openMenu("pages")}
            onMouseLeave={closeMenuWithDelay}
          >
            <button
              aria-haspopup="true"
              aria-expanded={openDropdown === "pages"}
              className="flex items-center gap-1 transition px-3 py-2 rounded-lg"
              style={{
                background: openDropdown === "pages" ? "#6A0572" : undefined,
                color: openDropdown === "pages" ? "#fff" : undefined,
              }}
              onClick={() => toggleDropdown("pages")}
              onMouseOver={(e) => {
                if (openDropdown === "pages") e.currentTarget.style.background = "#8C1A85"
              }}
              onMouseOut={(e) => {
                if (openDropdown !== "pages") e.currentTarget.style.background = ""
              }}
            >
              Kurumsal
              <svg className="w-4 h-4 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`absolute left-0 mt-2 bg-white/95 border border-[#b0e3fc] rounded-2xl shadow-2xl py-2 min-w-[180px] transition-all duration-200 ${
                openDropdown === "pages"
                  ? "opacity-100 pointer-events-auto translate-y-0"
                  : "opacity-0 pointer-events-none translate-y-2"
              }`}
            >
              <Link href="/hakkimizda" className="block px-5 py-2 hover:bg-[#8C1A85] hover:text-white rounded-lg transition">
                Hakkımızda
              </Link>
              <Link href="/egitmenler" className="block px-5 py-2 hover:bg-[#8C1A85] hover:text-white rounded-lg transition">
                Uzmanlarımız
              </Link>
              <Link href="/kvkk" className="block px-5 py-2 hover:bg-[#8C1A85] hover:text-white rounded-lg transition">
                SSS
              </Link>
            </div>
          </li>
          <li>
            <Link href="/iletisim" className="transition px-3 py-2 rounded-lg hover:bg-[#8C1A85] hover:text-white">
              İletişim
            </Link>
          </li>
        </ul>

        {/* Desktop Sağdaki Butonlar */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3">
          <Link
            href="https://rotaedu.com.tr/"
            className="px-5 py-2 rounded-xl font-semibold shadow-sm border border-[#6A0572] bg-white text-[#050005] hover:bg-[#8C1A85] hover:text-white transition-colors duration-500"
          >
            Öğrenci Girişi
          </Link>
          <Link
            href="/odeme"
            className="px-5 py-2 rounded-xl font-bold shadow-lg bg-gradient-to-r from-[#6A0572] to-[#8C1A85] text-white hover:bg-[#8C1A85] hover:from-[#8C1A85] hover:to-[#8C1A85] hover:text-white transition-colors duration-500"
            style={{ border: "none" }}
          >
            Ödeme Ekranı
          </Link>
        </div>

        {/* Mobil Menü Toggle */}
        <button id="nav-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="block lg:hidden text-[#232b41] ml-4">
          <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </nav>

      {/* Mobil Menü */}
      <div
        id="nav-menu"
        className={`lg:hidden px-2 pb-5 pt-2 transition-all duration-300 ${mobileMenuOpen ? "block" : "hidden"}`}
      >
        <ul className="flex flex-col gap-2">
          <li>
            <Link href="/" className="block px-4 py-3 rounded-xl font-bold text-[#232b41] bg-white/90 shadow hover:bg-[#8C1A85] hover:text-white transition">
              Ana Sayfa
            </Link>
          </li>
          <li>
            <Link
              href="/egitimler"
              className="block px-4 py-3 mt-2 rounded-xl font-bold text-[#6A0572] bg-white/80 hover:bg-[#8C1A85] hover:text-white transition"
            >
              Eğitimler
            </Link>
          </li>
          <li>
            <div className="px-4 py-2 mt-2 font-bold text-[#6A0572] bg-white/80 rounded-t-xl">Kurumsal</div>
            <ul className="flex flex-col gap-1 bg-white/80 rounded-b-xl pb-2">
              <li>
                <Link href="/hakkimizda" className="block pl-8 pr-4 py-2 rounded-lg text-[#6A0572] font-medium hover:bg-[#8C1A85] hover:text-white transition">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/egitmenler" className="block pl-8 pr-4 py-2 rounded-lg text-[#6A0572] font-medium hover:bg-[#8C1A85] hover:text-white transition">
                  Uzmanlarımız
                </Link>
              </li>
              <li>
                <Link href="/kvkk" className="block pl-8 pr-4 py-2 rounded-lg text-[#6A0572] font-medium hover:bg-[#8C1A85] hover:text-white transition">
                  SSS
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="/iletisim" className="block px-4 py-3 rounded-xl font-bold text-[#232b41] bg-white/90 shadow hover:bg-[#8C1A85] hover:text-white transition">
              İletişim
            </Link>
          </li>
        </ul>
        <div className="mt-5 flex flex-col gap-2 md:hidden">
          <Link
            href="https://rotaedu.com.tr/"
            className="rounded-xl px-4 py-2 text-center font-semibold bg-[#6A0572] text-white border border-[#6A0572] hover:bg-[#8C1A85] transition"
          >
            Öğrenci Giriş
          </Link>
          <Link
            href="/odeme"
            className="rounded-xl px-4 py-2 text-center font-bold"
            style={{ background: "linear-gradient(90deg, #6A0572 0%, #8C1A85 100%)", color: "#fff" }}
          >
            Ödeme Ekranı
          </Link>
        </div>
      </div>
    </header>
  )
}
