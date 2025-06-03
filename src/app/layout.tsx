import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";
import CrispScript from "@/components/CrispScript";
// Eğer Framer Motion ile sayfa geçişi kullanıyorsan:
import PageTransitionWrapper from "@/app/PageTransitionWrapper";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const FB_PIXEL = process.env.NEXT_PUBLIC_FB_PIXEL;

export const metadata: Metadata = {
  title: "Yeni Rota Eğitim | Türkiye'nin En Yenilikçi Eğitim Platformu",
  description: "Canlı kurslar, uzman eğitmenler, modern dijital eğitim deneyimi. Yeni Rota ile geleceğe hazır olun!",
  keywords: [
    "eğitim",
    "uzaktan eğitim",
    "canlı kurs",
    "online eğitim",
    "yeni rota",
    "sertifika",
    "uzman eğitmen",
    "kişisel gelişim",
  ],
  authors: [{ name: "Yeni Rota" }],
  openGraph: {
    title: "Yeni Rota Eğitim | Türkiye'nin En Yenilikçi Eğitim Platformu",
    description: "Canlı kurslar, uzman eğitmenler, modern dijital eğitim deneyimi. Yeni Rota ile geleceğe hazır olun!",
    url: "https://yenirotaegitim.com",
    siteName: "Yeni Rota Eğitim",
    images: [
      {
        url: "https://yenirotaegitim.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Yeni Rota Eğitim Platformu",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yeni Rota Eğitim | Türkiye'nin En Yenilikçi Eğitim Platformu",
    description: "Canlı kurslar, uzman eğitmenler, modern dijital eğitim deneyimi. Yeni Rota ile geleceğe hazır olun!",
    images: ["https://yenirotaegitim.com/og-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* Google Analytics */}
        {GA_ID && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
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
        <Navbar />
        {/* --- ANA İÇERİK --- */}
        <main className="flex-grow pt-[70px] min-h-screen">
          {/* Framer Motion ile sayfa geçişi için */}
          <PageTransitionWrapper>
            {children}
          </PageTransitionWrapper>
          {/* Motion kullanmayacaksan yukarıdaki iki satırı silip sadece {children} yazabilirsin */}
        </main>
        <CrispScript />
        {FB_PIXEL && (
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${FB_PIXEL}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        )}
        <Footer />
      </body>
    </html>
  );
}
