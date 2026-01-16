import { NextRequest, NextResponse } from 'next/server';

// Hem GET hem POST destekleyelim (Ziraat hangi metodu kullanıyor bilinmiyor)
export async function GET(request: NextRequest) {
  // Sadece bilgi amaçlı – hassas veri yok
  return NextResponse.redirect(
    new URL('/odeme/basarisiz?ErrMsg=InvalidMethod', request.url),
    303
  );
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    // Bankadan gelen temel başarı kontrolü
    const isSuccess =
      data.mdStatus === '1' &&
      data.Response === 'Approved';

    if (isSuccess) {
      return NextResponse.redirect(
        new URL('/odeme/basarili', request.url),
        303
      );
    }

    // Başarısız durum
    const hataMesaji =
      data.ErrMsg ||
      data.mdErrorMsg ||
      "Ödeme reddedildi";

    return NextResponse.redirect(
      new URL(
        `/odeme/basarisiz?ErrMsg=${encodeURIComponent(String(hataMesaji))}`,
        request.url
      ),
      303
    );

  } catch (error) {
    // Sadece generic log – detay yok
    console.error("Ödeme callback işleme hatası");

    return NextResponse.redirect(
      new URL('/odeme/basarisiz?ErrMsg=SistemselHata', request.url),
      303
    );
  }
}
