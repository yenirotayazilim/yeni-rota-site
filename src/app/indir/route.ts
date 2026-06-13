// src/app/indir/route.ts
//
// Akıllı uygulama yönlendirmesi. WhatsApp davet mesajındaki tek buton buraya
// bağlanır: https://yenirotaegitim.com/indir
//
// Ziyaretçinin cihazına göre doğru mağazaya server tarafında anında yönlendirir
// (yeni uygulama: Rota Plus). iPhone → App Store, Android → Google Play,
// masaüstü/bilinmeyen → iki seçenekli sade marka sayfası.
import { NextRequest, NextResponse } from 'next/server'

// Her istekte cihaz başlığına göre karar verilir; statik önbelleğe alınmaz.
export const dynamic = 'force-dynamic'

const APP_STORE =
  'https://apps.apple.com/tr/app/id6776734802' // Rota Plus (yeni)
const PLAY =
  'https://play.google.com/store/apps/details?id=com.yenirotaegitim.rotaedu' // Rota Plus (yeni)

// Bir cihaza ait yönlendirmenin CDN tarafından başka cihaza servis edilmemesi
// için önbellek kapalı + User-Agent'a göre değişken.
const noStore = {
  'Cache-Control': 'no-store, max-age=0',
  Vary: 'User-Agent',
}

export function GET(request: NextRequest) {
  const ua = request.headers.get('user-agent') || ''

  if (/iPad|iPhone|iPod/i.test(ua)) {
    return NextResponse.redirect(APP_STORE, { headers: noStore })
  }
  if (/Android/i.test(ua)) {
    return NextResponse.redirect(PLAY, { headers: noStore })
  }

  // Masaüstü veya tanınmayan cihaz: kullanıcı mağazasını kendi seçsin.
  return new NextResponse(fallbackHtml(), {
    headers: { 'Content-Type': 'text/html; charset=utf-8', ...noStore },
  })
}

function fallbackHtml() {
  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Rota Plus — Uygulamayı İndir</title>
  <style>
    :root { --bg:#12021A; --gold:#C9A961; --ink:#F4ECDF; --muted:#B8A9C2; }
    * { box-sizing:border-box; margin:0; }
    body {
      background:var(--bg); color:var(--ink);
      font-family:-apple-system,"Inter",system-ui,sans-serif;
      min-height:100vh; display:flex; flex-direction:column;
      align-items:center; justify-content:center; text-align:center; padding:32px;
    }
    .mark { font-family:"Cormorant Garamond",Georgia,serif; font-size:44px; letter-spacing:.02em; margin-bottom:6px; }
    .mark span { color:var(--gold); }
    .sub { color:var(--muted); font-size:14px; font-style:italic; margin-bottom:34px; }
    .btn {
      display:inline-block; border:1px solid rgba(201,169,97,.45);
      color:var(--gold); text-decoration:none; padding:13px 28px;
      border-radius:10px; font-size:14px; margin:6px; transition:background .2s;
    }
    .btn:hover { background:rgba(201,169,97,.10); }
    .foot { margin-top:38px; font-size:12px; font-style:italic; color:var(--muted); }
  </style>
</head>
<body>
  <div class="mark">rota<span>plus</span></div>
  <div class="sub">İndirmek için mağazanızı seçin</div>
  <a class="btn" href="${APP_STORE}">App Store</a>
  <a class="btn" href="${PLAY}">Google Play</a>
  <div class="foot">Yeni Rota Eğitim Kurumları</div>
</body>
</html>`
}
