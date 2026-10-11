import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import '@/styles/rota.css';
import HideOnAppChat from '@/components/HideOnAppChat';

// Marka fontları build sırasında indirilip siteden servis edilir —
// ziyaretçinin tarayıcısı Google'a gitmez, ilk boyama hızlı kalır.
const cormorant = Cormorant_Garamond({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-cormorant',
  display: 'swap',
});
const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const FB_PIXEL = process.env.NEXT_PUBLIC_FB_PIXEL;

export const metadata: Metadata = {
  metadataBase: new URL('https://yenirotaegitim.com'),
  title: {
    default: 'Yeni Rota Eğitim Kurumları | Sertifikalı Eğitim Programları',
    template: '%s | Yeni Rota Eğitim Kurumları',
  },
  description:
    'Kişisel gelişim, sağlık ve psikoloji alanlarında sertifikalı eğitim programları. Millî Eğitim Bakanlığı ruhsatlı özel öğretim kurumu; 5.800’ü aşkın öğrenci, 10 yılı aşkın kurumsal deneyim.',
  keywords: [
    'sertifikalı eğitim',
    'kişisel gelişim eğitimi',
    'psikoloji eğitimi',
    'sağlık eğitimi',
    'eğitim programı',
    'yeni rota eğitim',
  ],
  authors: [{ name: 'Yeni Rota Eğitim Kurumları' }],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Yeni Rota Eğitim Kurumları | Sertifikalı Eğitim Programları',
    description:
      'Kişisel gelişim, sağlık ve psikoloji alanlarında sertifikalı eğitim programları.',
    url: 'https://yenirotaegitim.com',
    siteName: 'Yeni Rota Eğitim Kurumları',
    images: [{ url: '/marka/kare-on-dark-1080.png', width: 1080, height: 1080, alt: 'Yeni Rota Eğitim Kurumları' }],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Yeni Rota Eğitim Kurumları | Sertifikalı Eğitim Programları',
    description:
      'Kişisel gelişim, sağlık ve psikoloji alanlarında sertifikalı eğitim programları.',
    images: ['/marka/kare-on-dark-1080.png'],
  },
  icons: {
    icon: [
      { url: '/marka/favicon-yildiz-gold-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/marka/favicon-yildiz-gold-64.png', sizes: '64x64', type: 'image/png' },
    ],
    apple: '/marka/favicon-yildiz-gold-512.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        {/* Tema tercihi ilk boyamadan ÖNCE uygulanır — açık temada karanlık çakması olmaz */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('rota-theme')==='light')document.documentElement.dataset.theme='light'}catch(e){}`,
          }}
        />
        {/* Google Analytics */}
        {GA_ID && (
          <>
            <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}');
                `,
              }}
            />
          </>
        )}
        {/* Facebook Pixel */}
        {FB_PIXEL && (
          <Script
            id="facebook-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod ?
                n.callMethod.apply(n,arguments) : n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${FB_PIXEL}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}
      </head>
      <body>
        {children}

        {/* Site ziyaretçi sohbeti — /app-sohbet'te YÜKLENMEZ (app'in kendi kanalı var) */}
        <HideOnAppChat>
          <Script
            id="respondio__widget"
            src="https://cdn.respond.io/webchat/widget/widget.js?cId=d45f5dd1397a7d50bd6b04e94b1d85e"
            strategy="afterInteractive"
          />
        </HideOnAppChat>

        {FB_PIXEL && (
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${FB_PIXEL}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        )}
      </body>
    </html>
  );
}
