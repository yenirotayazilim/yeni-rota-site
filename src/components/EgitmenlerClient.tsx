'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Egitmen {
    _id: string
    name: string
    slug: { current: string }
    photo?: { asset?: { url?: string } }
}

export default function EgitmenlerClient({ egitmenler }: { egitmenler: Egitmen[] }) {
    const [selected, setSelected] = useState<Egitmen | null>(null)

    const closeModal = () => setSelected(null)

    return (
        <>
            {/* Modal */}
            {selected && (
                <div
                    className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
                    onClick={closeModal}
                >
                    <div
                        className="relative bg-white rounded-xl p-6 w-[90vw] max-w-[600px]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Şık X Butonu (icon kullanılmadan) */}
                        <button
                            onClick={closeModal}
                            className="absolute top-3 right-3 z-10 w-9 h-9 bg-white rounded-full shadow-md border border-gray-300 flex items-center justify-center text-gray-500 hover:text-white hover:bg-[#6A0572] transition-all duration-300 text-xl font-bold"
                            aria-label="Kapat"
                        >
                            ×
                        </button>


                        <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden">
                            {selected.photo?.asset?.url && (
                                <Image
                                    src={selected.photo.asset.url}
                                    alt={selected.name}
                                    fill
                                    className="object-cover"
                                />
                            )}
                        </div>
                        <h2 className="text-center mt-4 text-lg font-semibold text-[#6A0572]">
                            {selected.name}
                        </h2>
                    </div>
                </div>
            )}

            {/* Arka plan */}
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

            {/* İçerik */}
            <main className="py-20 px-4 min-h-screen">
                <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-14 bg-gradient-to-r from-[#6A0572] to-[#8C1A85] bg-clip-text text-transparent">
                    Uzmanlarımız
                </h1>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
                    {egitmenler.map((egitmen) => {
                        const hasDetail = !!egitmen.slug?.current

                        const CardContent = (
                            <div className="relative w-full aspect-[3/4] bg-[#E2D1E8] rounded-2xl shadow-lg group overflow-hidden cursor-pointer">
                                {egitmen.photo?.asset?.url ? (
                                    <Image
                                        src={egitmen.photo.asset.url}
                                        alt={egitmen.name}
                                        fill
                                        className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="text-[#6A0572]/40 flex justify-center items-center w-full h-full">Fotoğraf Yok</div>
                                )}
                                <div className="absolute bottom-0 w-full bg-black/60 text-white text-center py-2 px-2 text-md font-semibold">
                                    {egitmen.name}
                                </div>
                            </div>
                        )

                        return hasDetail ? (
                            <Link
                                key={egitmen._id}
                                href={`/egitmenler/${egitmen.slug.current}`}
                                className="transition-transform duration-300 hover:scale-105"
                            >
                                {CardContent}
                            </Link>
                        ) : (
                            <div
                                key={egitmen._id}
                                onClick={() => setSelected(egitmen)}
                                className="transition-transform duration-300 hover:scale-105"
                            >
                                {CardContent}
                            </div>
                        )
                    })}
                </div>
            </main>
        </>
    )
}
