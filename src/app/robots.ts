import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // app-sohbet mobil uygulamanın iç sayfasıdır, aramada işi yok;
      // ödeme sayfaları kızağa çekilecek.
      disallow: ['/app-sohbet', '/odeme', '/api/'],
    },
    sitemap: 'https://yenirotaegitim.com/sitemap.xml',
  };
}
