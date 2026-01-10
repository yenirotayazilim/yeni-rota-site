"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"

interface Education {
  _id: string
  title: string
  description: string
  duration: string
  instructor: { name: string }
  slug: { current: string }
  category?: { title: string; slug: string }
  thumbnail?: { asset?: { url: string } }
}

interface Category {
  title: string
  slug: string
}

interface Props {
  egitimler: Education[]
  kategoriler: Category[]
}

export default function EgitimlerClient({ egitimler, kategoriler }: Props) {
  const [selectedCategory, setSelectedCategory] = useState("Tümü")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredEgitimler = egitimler.filter((edu) => {
    const matchCategory = selectedCategory === "Tümü" || edu.category?.title === selectedCategory
    const matchSearch = edu.title.toLowerCase().includes(searchTerm.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          pointerEvents: "none",
          background: "radial-gradient(ellipse at 50% 0%, #F8F9FA 0%, #E0F6FF 70%, #0D1B2A 100%)",
        }}
      />
      <main className="py-16 px-2 md:px-6" style={{ minHeight: "100vh" }}>
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10 bg-gradient-to-r from-[#6A0572] to-[#8C1A85] bg-clip-text text-transparent fade-in-up">
          Eğitimlerimiz
        </h1>

        {/* Kategori Dropdown + Arama */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4 mb-10 max-w-5xl mx-auto fade-in-up">
          <div className="relative w-full md:w-72">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-5 py-3 rounded-xl bg-white text-[#6A0572] font-semibold border-2 border-[#E2D1E8] shadow-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#8C1A85] transition-all"
            >
              <option value="Tümü" className="text-gray-600">Tüm Kategoriler</option>
              {kategoriler.map((kat) => (
                <option key={kat.slug} value={kat.title}>
                  {kat.title}
                </option>
              ))}
            </select>

            {/* Aşağı ok ikonu */}
            <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-[#8C1A85]">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>


          <input
            type="text"
            placeholder="Eğitim ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-96 px-5 py-3 rounded-xl bg-white text-[#0D1B2A] placeholder-[#6A0572]/60 font-medium border-2 border-[#E2D1E8] shadow-lg focus:outline-none focus:ring-2 focus:ring-[#6A0572] transition"
          />

        </div>

        {/* Eğitim Kartları */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-7xl mx-auto fade-in-up">
          {filteredEgitimler.length === 0 ? (
            <p className="text-center text-[#6A0572] col-span-full text-lg font-semibold">
              Kriterlerinize uygun eğitim bulunamadı.
            </p>
          ) : (
            filteredEgitimler.map((edu, i) => (
              <Link
                key={edu._id}
                href={`/egitimler/${edu.slug.current}`}
                className="wow-egitim-card block rounded-2xl shadow-xl group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                style={{ animationDelay: `${0.12 + i * 0.09}s` }}
              >
                <div className="aspect-[1/1] w-full overflow-hidden rounded-t-2xl bg-[#E2D1E8] relative">
                  {edu.thumbnail?.asset?.url ? (
                    <Image
                      src={edu.thumbnail.asset.url}
                      alt={edu.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#6A0572]/40">Görsel Yok</div>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2 bg-gradient-to-r from-[#6A0572] to-[#8C1A85] bg-clip-text text-transparent">
                    {edu.title}
                  </h2>
                  <p className="text-[#0D1B2A] text-base font-medium mb-3 line-clamp-4">{edu.description}</p>
                  <p className="text-xs text-[#6A0572] font-semibold">
                    Süre: {edu.duration} | Eğitmen: {edu.instructor?.name || "Belirtilmemiş"}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>

        <style jsx>{`
          .fade-in-up {
            animation: fadeUpIn 0.8s cubic-bezier(0.19, 1, 0.22, 1);
          }
          .wow-egitim-card {
            background: #f8f9fa;
            backdrop-filter: blur(8px) saturate(120%);
            border: 1.5px solid #e2d1e8;
            transition: box-shadow 0.22s cubic-bezier(0.22, 0.68, 0.38, 0.92), transform 0.16s;
            min-height: 340px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
          }
          .wow-egitim-card:hover {
            box-shadow: 0 18px 46px #8c1a8524, 0 0 0 2px #6a05721a;
            transform: translateY(-2px) scale(1.045);
          }
          @keyframes fadeUpIn {
            from {
              opacity: 0;
              transform: translateY(34px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </main>
    </>
  )
}
