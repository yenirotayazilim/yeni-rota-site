import { NextResponse } from 'next/server';
import { generateZiraatHash } from '@/lib/payment';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const storeKey = process.env.ZIRAAT_STORE_KEY;
    const clientId = process.env.ZIRAAT_CLIENT_ID;
    
    if (!storeKey || !clientId) {
      console.error("HATA: Banka anahtarları eksik!");
      return NextResponse.json({ error: "Sistem yapılandırması hatalı" }, { status: 500 });
    }

    const baseUrl = "https://www.yenirotaegitim.com";
    const rnd = Date.now().toString(); // Banka her istekte benzersiz bir rnd değeri bekler

    // ÖNEMLİ: Tüm parametre isimleri dökümandaki gibi KÜÇÜK HARF olmalı
    const paymentParams = {
      amount: body.amount || "10.00", // Tutar boş gelirse hata almamak için varsayılan değer
      clientid: clientId,
      currency: "949",
      failUrl: `${baseUrl}/api/odeme/callback`,
      hashalgorithm: "ver3", //
      inst: "", // Taksit yoksa kesinlikle BOŞ gönderilmeli (Hata notu madde 6)
      islemtipi: "Auth",
      lang: "tr",
      oid: `SIP-${Date.now()}`,
      okUrl: `${baseUrl}/api/odeme/callback`,
      rnd: rnd, // Hash hesaplamasına dahil edilmeli
      storetype: "3d_pay_hosting",
    };

    // Hash hesaplanırken kullanılan parametreler A'dan Z'ye sıralanmalı
    const hash = generateZiraatHash(paymentParams, storeKey);

    return NextResponse.json({ 
      ...paymentParams, 
      hash,
      encoding: "UTF-8" // UTF-8 inputu hash hesabına girmez ama formda gönderilmelidir
    });
  } catch (_error) {
    console.error("Ödeme API Hatası:", _error);
    return NextResponse.json({ error: "İşlem başlatılamadı" }, { status: 500 });
  }
}