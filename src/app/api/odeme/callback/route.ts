import { NextRequest, NextResponse } from 'next/server';

// Hem GET hem POST destekleyelim (Ziraat hangi metodu kullanıyor bilinmiyor)
export async function GET(request: NextRequest) {
  console.log("⚠️ Callback'e GET isteği geldi - muhtemelen yanlış yapılandırma");
  return NextResponse.redirect(new URL('/odeme/basarisiz?ErrMsg=InvalidMethod', request.url), 303);
}

export async function POST(request: NextRequest) {
  try {
    console.log("📥 Callback'e POST isteği geldi");
    console.log("🔗 Request URL:", request.url);
    
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());
    
    console.log("📦 Gelen Data:", {
      mdStatus: data.mdStatus,
      Response: data.Response,
      ErrMsg: data.ErrMsg,
      AuthCode: data.AuthCode,
      ProcReturnCode: data.ProcReturnCode
    });

    // Bankadan gelen mdStatus: 1 başarılı 3D doğrulamasıdır
    // Response: Approved ise banka ödemeyi onaylamıştır 
    const isSuccess = data.mdStatus === '1' && data.Response === 'Approved';
    
    console.log("✅ İşlem başarılı mı?", isSuccess);

    if (isSuccess) {
      console.log("✅ Başarılı sayfasına yönlendiriliyor...");
      return NextResponse.redirect(new URL('/odeme/basarili', request.url), 303);
    } else {
      const hataMesaji = data.ErrMsg || data.mdErrorMsg || "Ödeme reddedildi";
      console.log("❌ Başarısız sayfasına yönlendiriliyor, hata:", hataMesaji);
      return NextResponse.redirect(
        new URL(`/odeme/basarisiz?ErrMsg=${encodeURIComponent(String(hataMesaji))}`, request.url), 
        303
      );
    }
  } catch (error) {
    console.error("❌ Callback hatası:", error);
    return NextResponse.redirect(
      new URL('/odeme/basarisiz?ErrMsg=SistemselHata', request.url), 
      303
    );
  }
}