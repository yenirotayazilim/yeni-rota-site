// Yeni ana sayfanın Supabase veri katmanı.
// Anon anahtarla PostgREST'ten okur; RLS zaten yalnızca aktif eğitimlere izin verir.
// fetch + revalidate: sayfa saatte bir tazelenir, her ziyaretçide DB'ye gidilmez.

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SB_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

async function sbSelect<T>(pathAndQuery: string): Promise<T[]> {
  const res = await fetch(`${SB_URL}/rest/v1/${pathAndQuery}`, {
    headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Supabase okuma hatası: ${res.status} ${pathAndQuery}`);
  return res.json();
}

export interface EgitimKarti {
  id: string;
  ad: string;
  kategori: string | null;
  slug: string | null;
  kapak: string;
  sure: string | null;
  videoSayisi: number | null;
}

export interface Egitmen {
  ad: string;
  foto: string;
  slug: string | null;
}

interface EgitimRow {
  id: string;
  egitim: string;
  kategori: string | null;
  slug: string | null;
  kapak_resmi: string | null;
  sure: string | null;
  toplam_video_sayisi: number | null;
  ana_sayfada: boolean | null;
}

const EGITIM_SELECT =
  'select=id,egitim,kategori,slug,kapak_resmi,sure,toplam_video_sayisi,ana_sayfada' +
  '&aktif=eq.true&kapak_resmi=not.is.null&kapak_resmi=neq.';

function toKart(r: EgitimRow): EgitimKarti {
  return {
    id: r.id,
    ad: trTitleCase(r.egitim),
    kategori: r.kategori,
    slug: r.slug,
    kapak: r.kapak_resmi!,
    sure: sureKisa(r.sure),
    videoSayisi: r.toplam_video_sayisi,
  };
}

// Öne çıkanlar: noloco'dan ana_sayfada işaretlenenler; hiç işaret yoksa
// kapaklı eğitimlerden ilk 9 (Mustafa bayrakları işaretleyince otomatik onlara döner).
export async function getOneCikanEgitimler(): Promise<EgitimKarti[]> {
  const flagged = await sbSelect<EgitimRow>(
    `egitimler?${EGITIM_SELECT}&ana_sayfada=is.true&order=egitim.asc&limit=9`
  );
  if (flagged.length > 0) return flagged.map(toKart);
  const fallback = await sbSelect<EgitimRow>(
    `egitimler?${EGITIM_SELECT}&order=toplam_video_sayisi.desc.nullslast&limit=9`
  );
  return fallback.map(toKart);
}

// Spiral hero'nun 75 kapak görseli.
export async function getTumKapaklar(): Promise<string[]> {
  const rows = await sbSelect<{ kapak_resmi: string }>(
    `egitimler?select=kapak_resmi&aktif=eq.true&kapak_resmi=not.is.null&kapak_resmi=neq.&order=egitim.asc`
  );
  return rows.map((r) => r.kapak_resmi);
}

// Ana sayfa eğitmen şeridi — Mustafa'nın belirlediği sıra (slug ile).
// Geçici: ileride hocalar tablosuna sıra sütunu eklenince oradan okunacak.
const ANA_SAYFA_EGITMEN_SIRASI = [
  'sertan-talas',
  'sait-sevinc',
  'sule-cakirer',
  'bulent-unlukalayci',
  'hayriye-kuscu',
  'saduman-canan-karakol',
  'defne-duygu-uslu',
  'k-serdar-ates',
  'didem-nurcan-iyidogan',
];

export async function getEgitmenler(): Promise<Egitmen[]> {
  const rows = await sbSelect<{ ad_soyad: string; foto_url: string; slug: string | null; ana_sayfada: boolean | null }>(
    `hocalar?select=ad_soyad,foto_url,slug,ana_sayfada&foto_url=not.is.null&foto_url=neq.&order=ad_soyad.asc`
  );
  const sirali = ANA_SAYFA_EGITMEN_SIRASI
    .map((slug) => rows.find((r) => r.slug === slug))
    .filter((r): r is (typeof rows)[number] => !!r);
  const flagged = rows.filter((r) => r.ana_sayfada);
  const secim = sirali.length > 0 ? sirali : (flagged.length > 0 ? flagged : rows).slice(0, 8);
  return secim.map((r) => ({ ad: trTitleCase(r.ad_soyad), foto: r.foto_url, slug: r.slug }));
}

// Aktif eğitim sayısı — güven rakamlarındaki "ders programı" değeri
// uydurma değil, kataloğun gerçek satır sayısıdır.
export async function getAktifEgitimSayisi(): Promise<number> {
  const res = await fetch(`${SB_URL}/rest/v1/egitimler?select=id&aktif=eq.true&limit=1`, {
    headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, Prefer: 'count=exact' },
    next: { revalidate: 3600 },
  });
  const range = res.headers.get('content-range'); // örn. "0-0/110"
  const toplam = range?.split('/')[1];
  return toplam ? parseInt(toplam, 10) : 110;
}

export async function getEgitimSluglari(): Promise<string[]> {
  const rows = await sbSelect<{ slug: string | null }>(
    `egitimler?select=slug&aktif=eq.true&slug=not.is.null&slug=neq.`
  );
  return rows.map((r) => r.slug!) ;
}

// "AİLE DANIŞMANLIĞI" → "Aile Danışmanlığı" (Türkçe İ/ı kurallarıyla).
// "ve", "ile" gibi bağlaçlar baştaysa büyük kalır, ortadaysa küçük.
// Kısaltmalar (NLP, EMDR...) olduğu gibi BÜYÜK kalır — "Nlp" faciası yaşanmaz.
// Nokta/tire sonrası harfler de büyür: "k.serdar" → "K.Serdar".
const KUCUK_KALSIN = new Set(['ve', 'ile', 'için', 'de', 'da']);
const KISALTMALAR = new Set(['nlp', 'emdr', 'bdt', 'spss', 'gems', 'uda', 'kvkk']);

export function trTitleCase(input: string): string {
  return input
    .toLocaleLowerCase('tr-TR')
    .split(/\s+/)
    .filter(Boolean)
    .map((word, i) => {
      const harfler = word.replace(/[^\p{L}]/gu, '');
      if (KISALTMALAR.has(harfler)) return word.toLocaleUpperCase('tr-TR');
      if (i > 0 && KUCUK_KALSIN.has(word)) return word;
      return word.replace(/(^|[.\-(])(\p{L})/gu, (_m, on: string, harf: string) => on + harf.toLocaleUpperCase('tr-TR'));
    })
    .join(' ');
}

// "464 SAAT (300 SAAT TEORİK – 164 SAAT UYGULAMA)" → "464 ders saati"
export function sureKisa(sure: string | null): string | null {
  if (!sure) return null;
  const m = sure.match(/\d+/);
  return m ? `${m[0]} ders saati` : null;
}

// ---- Eğitimler kataloğu (/egitimler) ----
// Popülerlik = SADECE ücretli satış (egitim_kayitlari + mezun_oldugu_egitimler,
// egitim_tipi='UCRETLI'). Bu tablolar KVKK gereği anon'a kapalı; sıralamayı
// yalnızca toplam sayıyı dışarı veren `egitim_vitrin()` SECURITY DEFINER
// fonksiyonu üretir (öğrenci verisi ASLA sızmaz). Fonksiyon eğitimleri zaten
// popülerlik sırasında döndürür; ilk sıradakiler gerçek en çok tercih edilenler.
export interface VitrinEgitim {
  id: string;
  ad: string;
  kategori: string | null;
  slug: string;
  kapak: string;
  sure: string | null;
  videoSayisi: number | null;
}

interface VitrinRow {
  id: string;
  egitim: string;
  kategori: string | null;
  slug: string | null;
  kapak_resmi: string | null;
  sure: string | null;
  toplam_video_sayisi: number | null;
  satis: number;
}

export async function getEgitimlerVitrin(): Promise<VitrinEgitim[]> {
  // Argümansız STABLE fonksiyon → PostgREST GET ile çağrılır, saatlik tazelenir.
  const rows = await sbSelect<VitrinRow>('rpc/egitim_vitrin');
  return rows
    .filter((r) => r.slug && r.kapak_resmi)
    .map((r) => ({
      id: r.id,
      ad: trTitleCase(r.egitim),
      kategori: r.kategori,
      slug: r.slug!,
      kapak: r.kapak_resmi!,
      sure: sureKisa(r.sure),
      videoSayisi: r.toplam_video_sayisi,
    }));
}

// ---- Eğitim detayı (/egitimler/[slug]) ----
export interface EgitimDetay {
  id: string;
  ad: string;
  kategori: string | null;
  slug: string;
  kapak: string | null;
  sure: string | null;
  videoSayisi: number | null;
  paragraflar: string[]; // aciklama, boş satırlardan bölünmüş
  mufredat: string[];
  hoca: { ad: string; unvan: string | null; bio: string | null; foto: string | null } | null;
}

interface DetayRow {
  id: string;
  egitim: string;
  kategori: string | null;
  slug: string;
  kapak_resmi: string | null;
  sure: string | null;
  toplam_video_sayisi: number | null;
  aciklama: string | null;
  mufredat: string[] | null;
  hoca_id: string | null;
}

export async function getEgitimDetay(slug: string): Promise<EgitimDetay | null> {
  const rows = await sbSelect<DetayRow>(
    `egitimler?select=id,egitim,kategori,slug,kapak_resmi,sure,toplam_video_sayisi,aciklama,mufredat,hoca_id` +
      `&aktif=eq.true&slug=eq.${encodeURIComponent(slug)}&limit=1`
  );
  const r = rows[0];
  if (!r) return null;

  // Eğitmen: hoca_id yoksa bölüm hiç görünmez (Mustafa kararı).
  let hoca: EgitimDetay['hoca'] = null;
  if (r.hoca_id) {
    const hocalar = await sbSelect<{ ad_soyad: string; unvan: string | null; bio: string | null; foto_url: string | null }>(
      `hocalar?select=ad_soyad,unvan,bio,foto_url&id=eq.${r.hoca_id}&limit=1`
    );
    const h = hocalar[0];
    if (h) hoca = { ad: trTitleCase(h.ad_soyad), unvan: h.unvan, bio: h.bio, foto: h.foto_url };
  }

  return {
    id: r.id,
    ad: trTitleCase(r.egitim),
    kategori: r.kategori,
    slug: r.slug,
    kapak: r.kapak_resmi,
    sure: sureKisa(r.sure),
    videoSayisi: r.toplam_video_sayisi,
    paragraflar: (r.aciklama ?? '')
      .split(/\n+/)
      .map((p) => p.trim())
      .filter(Boolean),
    mufredat: (r.mufredat ?? []).map((m) => m.trim()).filter(Boolean),
    hoca,
  };
}

// Aynı kategoriden ilgili eğitimler — vitrin listesi zaten popülerlik sıralı.
export async function getIlgiliEgitimler(kategori: string | null, haricSlug: string, adet = 4): Promise<VitrinEgitim[]> {
  const hepsi = await getEgitimlerVitrin();
  const ayni = hepsi.filter((e) => e.slug !== haricSlug && (kategori ? e.kategori === kategori : true));
  return ayni.slice(0, adet);
}

// ---- Eğitmen detayı (/egitmenler/[slug]) ----
export interface EgitmenDetay {
  ad: string;
  unvan: string | null;
  slug: string;
  foto: string | null;
  bioParagraflar: string[]; // ham CV, boş satırlardan bölünmüş; boşsa bölüm gizlenir
  egitimler: VitrinEgitim[]; // verdiği web-görünür eğitimler
}

export async function getEgitmenSluglari(): Promise<string[]> {
  const rows = await sbSelect<{ slug: string | null }>(`hocalar?select=slug&slug=not.is.null&slug=neq.`);
  return rows.map((r) => r.slug!);
}

export async function getEgitmenDetay(slug: string): Promise<EgitmenDetay | null> {
  const rows = await sbSelect<{ id: string; ad_soyad: string; unvan: string | null; bio: string | null; foto_url: string | null }>(
    `hocalar?select=id,ad_soyad,unvan,bio,foto_url&slug=eq.${encodeURIComponent(slug)}&limit=1`
  );
  const h = rows[0];
  if (!h) return null;

  const dersler = await sbSelect<{ id: string; egitim: string; kategori: string | null; slug: string | null; kapak_resmi: string | null; sure: string | null; toplam_video_sayisi: number | null }>(
    `egitimler?select=id,egitim,kategori,slug,kapak_resmi,sure,toplam_video_sayisi` +
      `&hoca_id=eq.${h.id}&aktif=eq.true&slug=not.is.null&slug=neq.&kapak_resmi=not.is.null&kapak_resmi=neq.&order=egitim.asc`
  );

  return {
    ad: trTitleCase(h.ad_soyad),
    unvan: h.unvan?.trim() || null,
    slug,
    foto: h.foto_url,
    bioParagraflar: (h.bio ?? '')
      .split(/\n+/)
      .map((p) => p.trim())
      .filter(Boolean),
    egitimler: dersler.map((r) => ({
      id: r.id,
      ad: trTitleCase(r.egitim),
      kategori: r.kategori,
      slug: r.slug!,
      kapak: r.kapak_resmi!,
      sure: sureKisa(r.sure),
      videoSayisi: r.toplam_video_sayisi,
    })),
  };
}

// ---- Eğitmen kadrosu (/egitmenler) ----
export interface KadroEgitmeni {
  ad: string;
  unvan: string | null;
  slug: string | null; // slug'sız hoca kartı linksiz görünür (noloco'dan slug gelince tıklanır olur)
  foto: string;
  egitimSayisi: number;
}

export async function getEgitmenKadro(): Promise<KadroEgitmeni[]> {
  const [hocalar, egitimler] = await Promise.all([
    sbSelect<{ id: string; ad_soyad: string; unvan: string | null; slug: string | null; foto_url: string; ana_sayfada: boolean | null }>(
      `hocalar?select=id,ad_soyad,unvan,slug,foto_url,ana_sayfada&foto_url=not.is.null&foto_url=neq.`
    ),
    sbSelect<{ hoca_id: string | null }>(
      `egitimler?select=hoca_id&aktif=eq.true&slug=not.is.null&slug=neq.&hoca_id=not.is.null`
    ),
  ]);

  const sayilar = new Map<string, number>();
  for (const e of egitimler) {
    if (e.hoca_id) sayilar.set(e.hoca_id, (sayilar.get(e.hoca_id) ?? 0) + 1);
  }

  return hocalar
    .map((h) => ({
      ad: trTitleCase(h.ad_soyad),
      unvan: h.unvan?.trim() || null,
      slug: h.slug,
      foto: h.foto_url,
      egitimSayisi: sayilar.get(h.id) ?? 0,
      oneCikan: h.ana_sayfada ?? false,
    }))
    // ana_sayfada işaretliler önce (noloco'dan bayraklanır), kalanlar Türkçe alfabetik
    .sort((a, b) => Number(b.oneCikan) - Number(a.oneCikan) || a.ad.localeCompare(b.ad, 'tr'))
    .map((h) => ({ ad: h.ad, unvan: h.unvan, slug: h.slug, foto: h.foto, egitimSayisi: h.egitimSayisi }));
}
