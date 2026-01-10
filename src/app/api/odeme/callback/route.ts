import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Banka verileri "application/x-www-form-urlencoded" olarak POST eder
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    console.log("Bankadan Gelen Yanıt:", data);

    // mdStatus=1 başarılı 3D doğrulaması demektir [cite: 670]
    // Response=Approved ise banka ödemeyi onaylamıştır [cite: 668]
    if (data.mdStatus === '1' && data.Response === 'Approved') {
       // Başarılı sayfasına yönlendir (303 kullanarak GET'e zorla)
       return NextResponse.redirect(new URL('/odeme/basarili', request.url), 303);
    } else {
       // Hata durumunda hata mesajıyla yönlendir [cite: 668]
       const error = data.ErrMsg || "Odeme Reddedildi";
       return NextResponse.redirect(new URL(`/odeme/basarisiz?error=${error}`, request.url), 303);
    }
  } catch (err) {
    return NextResponse.redirect(new URL('/odeme/basarisiz', request.url), 303);
  }
}