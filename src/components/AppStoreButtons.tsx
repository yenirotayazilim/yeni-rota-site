'use client'
import Image from 'next/image'
export default function AppStoreButtons() {
  return (
    <section className="max-w-7xl mx-auto mt-16 mb-8 px-6 py-10 bg-gray-900 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="text-white max-w-lg font-semibold text-lg md:text-xl">
        Hareket halindeyken öğrenmeye hazır mısın? Mobil uygulama kursumuzu indirin ve istediğiniz zaman, istediğiniz yerde öğrenmeye başlayın!
      </div>

      <div className="flex gap-6">
        {/* Google Play */}
        <a
          href="https://play.google.com/store/apps/details?id=com.hayalmahsulleri.egitim&hl=en_US"
          aria-label="Google Play"
          target="_blank"
          rel="noopener noreferrer"
          className="transform hover:scale-105 transition-transform duration-300"
        >
          <Image 
            src="https://kitdemo.moxcreative.com/byteskill/wp-content/uploads/sites/9/2023/07/Google-Play.png"
            alt="Get it on Google Play"
            width={216}
            height={64}
            className="h-16 w-auto"
            loading="lazy"
          />
        </a>

        {/* App Store */}
        <a
          href="https://apps.apple.com/tr/app/rotaedu/id6478789891?l=tr"
          aria-label="App Store"
          target="_blank"
          rel="noopener noreferrer"
          className="transform hover:scale-105 transition-transform duration-300"
        >
          <Image 
            src="https://kitdemo.moxcreative.com/byteskill/wp-content/uploads/sites/9/2023/07/App-Store.png"
            alt="Download on the App Store"
            width={216}
            height={64}
            className="h-16 w-auto"
            loading="lazy"
          />
        </a>
      </div>
    </section>
  );
}
