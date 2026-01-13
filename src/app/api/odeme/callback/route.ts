import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const formData = await req.formData();
  const response = Object.fromEntries(formData.entries());

  if (response.Response === "Approved") {
    // Ödeme başarılı, veritabanını güncelle
    return NextResponse.redirect(new URL('/odeme/basarili', req.url), 303);
  } else {
    // Ödeme başarısız
    return NextResponse.redirect(new URL('/odeme/hata', req.url), 303);
  }
}