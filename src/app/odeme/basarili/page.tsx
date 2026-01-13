import Link from 'next/link';

export default function BasariliPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-green-100 text-center max-w-md w-full">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-3 rounded-full">
            {/* Standart SVG Onay İkonu */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-12 h-12 text-green-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Ödeme Başarılı!</h1>
        <p className="text-gray-600 mb-8">
          Siparişiniz onaylandı ve işleme alındı. Bizi tercih ettiğiniz için teşekkür ederiz.
        </p>
        <Link 
          href="/" 
          className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors text-center"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}