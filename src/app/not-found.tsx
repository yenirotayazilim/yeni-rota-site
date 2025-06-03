import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Sabit arka plan layer */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          pointerEvents: "none",
          background: "radial-gradient(ellipse at 50% 0%, #F8F9FA 0%, #E0F6FF 70%, #0D1B2A 100%)",
        }}
      />
      <div
        className="rounded-3xl shadow-2xl px-8 py-16 flex flex-col items-center max-w-xl w-full border"
        style={{
          background: "#F8F9FA",
          borderColor: "#a8e1fa7a"
        }}
      >
        <h1 className="text-7xl md:text-8xl font-extrabold bg-gradient-to-r from-[#6A0572] to-[#8C1A85] bg-clip-text text-transparent mb-4 select-none drop-shadow">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-[#6A0572] mb-3">Sayfa Bulunamadı</h2>
        <p className="text-[#6A0572]/80 mb-8 text-base md:text-lg text-center">
          Aradığınız sayfa silinmiş, taşınmış ya da hiç olmamış olabilir.<br />
          <span className="font-semibold text-[#8C1A85]">Endişelenmeyin!</span> Sizi doğru rotaya yönlendirelim.
        </p>
        <Link
          href="/"
          className="bg-[#6A0572] hover:bg-[#8C1A85] text-white font-bold px-6 py-3 rounded-full shadow-lg transition-colors duration-300"
        >
          Anasayfa
        </Link>
      </div>
    </section>
  )
}
