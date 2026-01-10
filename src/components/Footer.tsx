'use client'

import Link from 'next/link'
import AppStoreButtons from './AppStoreButtons'

export default function Footer() {
  return (
    <>
      <footer className="relative mt-16 text-white" style={{ background: '#4C0253' }}>
        <svg
          className="absolute top-0 w-full h-6 -mt-5 sm:-mt-10 sm:h-16"
          preserveAspectRatio="none"
          viewBox="0 0 1440 54"
        >
          <path
            fill="#4C0253"
            d="M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z"
          />
        </svg>

        <div className="px-4 pt-12 mx-auto max-w-screen-xl">
          <div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-6">
            <div className="md:max-w-md lg:col-span-2">
              <Link href="/" className="inline-flex items-center">
                <svg className="w-8 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="1" width="7" height="12" />
                  <rect x="3" y="17" width="7" height="6" />
                  <rect x="14" y="1" width="7" height="6" />
                  <rect x="14" y="11" width="7" height="12" />
                </svg>
                <span className="ml-2 text-xl font-bold tracking-wide uppercase text-white">Yeni Rota</span>
              </Link>
              <div className="mt-4 max-w-sm text-sm text-indigo-100 space-y-3">
                <p>Modern eğitim ve kariyer platformu. Geleceğe Yeni Rota ile hazırlan.</p>
                <p>Kariyerine yön verecek içerikler burada seni bekliyor.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
              <div>
                <p className="font-semibold tracking-wide text-teal-400">Platform</p>
                <ul className="mt-2 space-y-2">
                  <li><Link href="/egitimler" className="text-indigo-100 hover:text-teal-400">Eğitimler</Link></li>
                  <li><Link href="/hakkimizda" className="text-indigo-100 hover:text-teal-400">Hakkımızda</Link></li>
                  <li><Link href="/iletisim" className="text-indigo-100 hover:text-teal-400">İletişim</Link></li>
                  <li><Link href="/kvkk" className="text-indigo-100 hover:text-teal-400">KVKK</Link></li>
                </ul>
              </div>
             
              <div>
                <p className="font-semibold tracking-wide text-teal-400">Topluluk</p>
                <ul className="mt-2 space-y-2">
                  <li><a href="https://www.instagram.com/rotaedu.tr/" className="text-indigo-100 hover:text-teal-400">Instagram</a></li>
                  
                  <li><a href="https://www.youtube.com/c/AdemerE%C4%9FitimKurumu" className="text-indigo-100 hover:text-teal-400">YouTube</a></li>
                </ul>
              </div>
              <div>
                <p className="font-semibold tracking-wide text-teal-400">Yasal</p>
                <ul className="mt-2 space-y-2">
                  <li><a href="/kvkk" className="text-indigo-100 hover:text-teal-400">Gizlilik</a></li>
                  <li><a href="/kvkk" className="text-indigo-100 hover:text-teal-400">Kullanım Şartları</a></li>
                </ul>
              </div>
            </div>
          </div>
          {/* Mobil Uygulama Tanıtım */}
          <AppStoreButtons />
          <div className="flex flex-col justify-between pt-5 pb-10 border-t border-indigo-400 sm:flex-row">
            <p className="text-sm text-gray-100">© {new Date().getFullYear()} Yeni Rota. Tüm hakları saklıdır.</p>
            <div className="flex items-center mt-4 space-x-4 sm:mt-0">
              <a href="https://www.instagram.com/rotaedu.tr/" className="text-indigo-100 hover:text-teal-400">Instagram</a>              
              <a href="https://www.youtube.com/channel/UCT8uZhW9NDLPyy27zsm0UYQ" className="text-indigo-100 hover:text-teal-400">YouTube</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
