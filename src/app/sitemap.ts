// Site haritası — Google'ın tüm eğitim sayfalarını bulması için.
// Eğitim slug'ları Supabase'den gelir; saatlik tazelenir.

import type { MetadataRoute } from 'next';
import { getEgitimSluglari } from '@/lib/rota';

const BASE = 'https://yenirotaegitim.com';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let egitimler: MetadataRoute.Sitemap = [];
  try {
    const sluglar = await getEgitimSluglari();
    egitimler = sluglar.map((slug) => ({
      url: `${BASE}/egitimler/${slug}`,
      changeFrequency: 'monthly',
      priority: 0.8,
    }));
  } catch {
    // Supabase erişilemezse sabit sayfalarla devam et
  }

  return [
    { url: BASE, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/egitimler`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/egitmenler`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/hakkimizda`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE}/iletisim`, changeFrequency: 'yearly', priority: 0.5 },
    ...egitimler,
  ];
}
