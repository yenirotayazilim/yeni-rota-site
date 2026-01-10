import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    // Bankadan gelen mdStatus: 1 başarılı 3D doğrulamasıdır [cite: 670]
    // Response: Approved ise banka ödemeyi onaylamıştır 
    const isSuccess = data.mdStatus === '1' && data.Response === 'Approved';

    if (isSuccess) {
      // Başarılı işlemde okUrl mantığıyla yönlendiriyoruz [cite: 95]
      // 303 status kodu POST isteğini GET'e dönüştürerek 405 hatasını önler
      return NextResponse.redirect(new URL('/odeme/basarili', request.url), 303);
    } else {
      // Başarısız işlemde ErrMsg parametresini kullanıyoruz 
      const hataMesaji = data.ErrMsg || "Odeme reddedildi";
      return NextResponse.redirect(new URL(`/odeme/basarisiz?ErrMsg=${hataMesaji}`, request.url), 303);
    }
  } catch (error) {
    // Hatanın nedenini terminalde görmek için console.log ekledik (böylece değişken kullanılmış olur)
    console.error("Callback hatası:", error);
    return NextResponse.redirect(new URL('/odeme/basarisiz?ErrMsg=SistemselHata', request.url), 303);
  }
}