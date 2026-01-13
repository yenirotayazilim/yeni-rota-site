"use client";
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

// Next.js App Router'da useSearchParams kullanırken Suspense önerilir
function HataIcerik() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get('mesaj') || "Ödeme işlemi sırasında teknik bir sorun oluştu.";

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-red-100 text-center max-w-md w-full">
      <div className="flex justify-center mb-4">
        <div className="bg-red-100 p-3 rounded-full">
          {/* Standart SVG Hata İkonu */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-12 h-12 text-red-600" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Ödeme Başarısız</h1>
      <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm mb-8 text-left">
        <strong>Banka Yanıtı:</strong> {errorMessage}
      </div>
      <div className="space-y-3">
        <Link 
          href="/odeme" 
          className="block w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 rounded-xl transition-colors text-center"
        >
          Tekrar Dene
        </Link>
        <Link 
          href="/iletisim" 
          className="block text-sm text-gray-500 hover:underline text-center"
        >
          Destek Ekibiyle İletişime Geç
        </Link>
      </div>
    </div>
  );
}

export default function HataPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <Suspense fallback={<div>Yükleniyor...</div>}>
        <HataIcerik />
      </Suspense>
    </div>
  );
}