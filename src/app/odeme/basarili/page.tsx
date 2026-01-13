"use client" // Next.js'e bunun tarayıcıda çalışacağını söylüyoruz
import Link from "next/link"
import { useEffect } from "react"


export default function OdemeBasarili() {

  // Sayfa açılınca konfetiler patlasın (Şov olsun biraz) 🎉
  useEffect(() => {
    // Eğer canvas-confetti paketini kurmadıysan bu kısmı sil:
    // npm install canvas-confetti --save
    // npm install @types/canvas-confetti --save-dev
    
    /* confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    */
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center animate-fade-in-up">
          {/* Başarı İkonu */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Başlık */}
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Ödeme Başarılı!
          </h1>
          <p className="text-gray-600 mb-6">
            Ödemeniz başarıyla tamamlandı. Siparişiniz alındı.
          </p>

          {/* Bilgi Kutusu */}
          <div className="bg-green-50 rounded-xl p-4 mb-6 border border-green-100">
            <p className="text-sm text-green-700 font-medium">
              📩 Ödeme dekontunuz e-posta adresinize gönderildi.
            </p>
          </div>

          {/* Ana Sayfaya Dön */}
          <Link
            href="/"
            className="inline-block w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#6A0572] to-[#8C1A85] hover:from-[#8C1A85] hover:to-[#6A0572] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  )
}