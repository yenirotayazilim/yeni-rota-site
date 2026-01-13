import { NextResponse } from 'next/server';
import { generateZiraatHash } from '@/lib/payment';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Vercel veya .env.local'den çekilen değerler
    const storeKey = process.env.ZIRAAT_STORE_KEY;
    const clientId = process.env.ZIRAAT_CLIENT_ID;
    
    if (!storeKey || !clientId) {
      console.error("HATA: Banka anahtarları eksik!");
      return NextResponse.json({ error: "Sistem yapılandırması hatalı" }, { status: 500 });
    }

    const baseUrl = "https://www.yenirotaegitim.com";

    const paymentParams = {
      amount: body.amount,
      clientid: clientId,      // Çevre değişkeninden geldi
      currency: "949",
      failUrl: `${baseUrl}/api/odeme/callback`,
      hashalgorithm: "ver3",   //
      islemtipi: "Auth",       //
      lang: "tr",
      oid: `SIP-${Date.now()}`,
      okUrl: `${baseUrl}/api/odeme/callback`,
      storetype: "3d_pay_hosting", //
    };

    const hash = generateZiraatHash(paymentParams, storeKey); // Çevre değişkeninden geldi

    return NextResponse.json({ 
      ...paymentParams, 
      hash,
      encoding: "UTF-8" //
    });
  } catch (_error) {
    console.error("Ödeme API Hatası:", _error);
    return NextResponse.json({ error: "İşlem başlatılamadı" }, { status: 500 });
  }
}