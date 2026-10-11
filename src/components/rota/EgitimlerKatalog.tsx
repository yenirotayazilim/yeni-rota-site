'use client';

// Eğitimler kataloğu — arama + kategori çipleri (Supabase'den CANLI türetilir;
// transkript projesi kategorileri değiştirdiğinde koda dokunmadan yenilenir) +
// popülerlik sırasında kartlar. İlk FEATURED_COUNT kart gerçek en çok satılanlar.

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { VitrinEgitim } from '@/lib/rota';

const FEATURED_COUNT = 6;

// Türkçe uyumlu arama: hem sorguyu hem başlığı sadeleştir ("İŞARET" → "isaret",
// "sağlık" → "saglik") ki aksansız/küçük harfle arayan da bulsun.
function norm(s: string): string {
  return s
    .toLocaleLowerCase('tr-TR')
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[îâû]/g, (m) => ({ î: 'i', â: 'a', û: 'u' })[m] || m);
}

function SaatIkon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--rt-fg-gold)" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function VideoIkon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--rt-fg-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="14" height="12" rx="2" />
      <path d="m22 8-6 4 6 4V8z" />
    </svg>
  );
}

function YildizIkon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
      <path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" fill="currentColor" />
    </svg>
  );
}

function SiraIkon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--rt-fg-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 16 4 4 4-4" />
      <path d="M7 20V4" />
      <path d="M11 4h10" />
      <path d="M11 8h7" />
      <path d="M11 12h4" />
    </svg>
  );
}

function AramaIkon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function KapatIkon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export default function EgitimlerKatalog({ egitimler }: { egitimler: VitrinEgitim[] }) {
  const [filter, setFilter] = useState<string>('all');
  const [query, setQuery] = useState<string>('');

  // Kategoriler + sayıları veriden türetilir (en çok programlı önce).
  const kategoriler = useMemo(() => {
    const m = new Map<string, number>();
    for (const e of egitimler) {
      if (!e.kategori) continue;
      m.set(e.kategori, (m.get(e.kategori) ?? 0) + 1);
    }
    return [...m.entries()].sort((a, b) => b[1] - a[1]).map(([label, count]) => ({ label, count }));
  }, [egitimler]);

  // İlk 6 (popülerlik sıralı liste zaten) gerçek en çok tercih edilenler.
  const featuredIds = useMemo(
    () => new Set(egitimler.slice(0, FEATURED_COUNT).map((e) => e.id)),
    [egitimler],
  );

  const q = norm(query.trim());
  const visible = egitimler.filter((e) => {
    const katUygun = filter === 'all' || e.kategori === filter;
    const aramaUygun = !q || norm(e.ad).includes(q) || (e.kategori ? norm(e.kategori).includes(q) : false);
    return katUygun && aramaUygun;
  });

  const resultText = q
    ? `${visible.length} sonuç${filter !== 'all' ? ` · ${filter}` : ''}`
    : filter === 'all'
      ? `${egitimler.length} program listeleniyor`
      : `${visible.length} program · ${filter}`;

  return (
    <>
      {/* arama + kategori çipleri (yapışkan) */}
      <div className="rt-chipbar">
        <div className="rt-container">
          <div className="rt-search">
            <span className="rt-search-ikon">
              <AramaIkon />
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Eğitim arayın — örn. aile, masaj, koçluk"
              aria-label="Eğitim ara"
            />
            {query && (
              <button type="button" className="rt-search-clear" onClick={() => setQuery('')} aria-label="Aramayı temizle">
                <KapatIkon />
              </button>
            )}
          </div>
          <div className="rt-chiprow" role="tablist" aria-label="Kategori süzgeci">
            <button
              type="button"
              className={`rt-chip${filter === 'all' ? ' is-active' : ''}`}
              onClick={() => setFilter('all')}
              aria-pressed={filter === 'all'}
            >
              <span>Tümü</span>
              <span className="rt-chip-count">{egitimler.length}</span>
            </button>
            {kategoriler.map((k) => (
              <button
                key={k.label}
                type="button"
                className={`rt-chip${filter === k.label ? ' is-active' : ''}`}
                onClick={() => setFilter(k.label)}
                aria-pressed={filter === k.label}
              >
                <span>{k.label}</span>
                <span className="rt-chip-count">{k.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* kart ızgarası */}
      <section className="rt-container" style={{ padding: 'clamp(32px,5vw,52px) 0 clamp(72px,10vw,110px)' }}>
        <div className="rt-cat-resultbar">
          <div className="rt-cat-count">{resultText}</div>
          <div className="rt-cat-sort">
            <SiraIkon />
            Popülerlik sırası
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="rt-cat-empty">
            <p style={{ margin: 0, fontSize: 16 }}>
              “{query}” için sonuç bulunamadı.
            </p>
            <button
              type="button"
              className="rt-ghost-btn"
              onClick={() => {
                setQuery('');
                setFilter('all');
              }}
            >
              Tüm eğitimleri göster
            </button>
          </div>
        ) : (
          <div className="rt-cat-grid">
            {visible.map((e) => (
              <Link key={e.id} className="rt-card" href={`/egitimler/${e.slug}`}>
                <div className="rt-card-cover">
                  <Image
                    src={e.kapak}
                    alt={`${e.ad} eğitimi kapak görseli`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 300px"
                    style={{ objectFit: 'cover' }}
                  />
                  {featuredIds.has(e.id) && (
                    <div className="rt-card-featured">
                      <YildizIkon />
                      Çok tercih edilen
                    </div>
                  )}
                </div>
                <div className="rt-card-body">
                  {e.kategori && <div className="rt-card-cat">{e.kategori}</div>}
                  <h3 className="rt-card-title">{e.ad}</h3>
                  <div className="rt-card-meta">
                    {e.sure && (
                      <span>
                        <SaatIkon />
                        {e.sure}
                      </span>
                    )}
                    {e.videoSayisi ? (
                      <span>
                        <VideoIkon />
                        {e.videoSayisi} video
                      </span>
                    ) : null}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
