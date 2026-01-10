"use client"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react" // Next.js build hatası vermesin diye gerekli

// İçerik Componenti
function BasarisizIcerik() {
  const searchParams = useSearchParams()
  // Bankadan gelen hata mesajını yakalıyoruz. Yoksa varsayılan mesajı gösteriyoruz.
  const hataMesaji = searchParams.get("ErrMsg") || searchParams.get("mdErrorMsg") || "Ödeme işlemi tamamlanamadı."

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center border-t-4 border-red-500">
        {/* Hata İkonu */}
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        {/* Başlık */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Ödeme Başarısız
        </h1>
        
        {/* Dinamik Hata Mesajı */}
        <p className="text-red-600 font-medium mb-2">
          {hataMesaji}
        </p>
        
        <p className="text-gray-500 text-sm mb-6">
          Lütfen bilgilerinizi kontrol edip tekrar deneyin.
        </p>

        {/* Bilgi Kutusu */}
        <div className="bg-red-50 rounded-xl p-4 mb-6 text-left">
          <p className="text-xs text-red-800 font-semibold mb-1">Olası Sebepler:</p>
          <ul className="text-xs text-red-700 list-disc list-inside space-y-1">
            <li>Kart limitiniz yetersiz olabilir.</li>
            <li>İnternet alışverişine kapalı olabilir.</li>
            <li>3D Secure şifresini yanlış girmiş olabilirsiniz.</li>
          </ul>
        </div>

        {/* Butonlar */}
        <div className="space-y-3">
          <Link
            href="/odeme"
            className="inline-block w-full py-3 rounded-xl font-bold text-white bg-gray-800 hover:bg-black transition-all duration-300 shadow-md"
          >
            Tekrar Dene
          </Link>
          <Link
            href="/"
            className="inline-block w-full py-3 rounded-xl font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  )
}

// Ana Component (Suspense ile sarmalanmış)
export default function OdemeBasarisiz() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fef2f2] to-[#fee2e2] flex items-center justify-center p-4">
      <Suspense fallback={<div className="text-center">Yükleniyor...</div>}>
        <BasarisizIcerik />
      </Suspense>
    </div>
  )
}