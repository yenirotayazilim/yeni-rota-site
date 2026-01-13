import { NextResponse } from 'next/server';
import { generateZiraatHash } from '@/lib/payment';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const storeKey = process.env.ZIRAAT_STORE_KEY;
    const clientid = process.env.ZIRAAT_CLIENT_ID;

    if (!storeKey || !clientid) {
      return NextResponse.json({ error: "Yapılandırma hatası" }, { status: 500 });
    }

    const rnd = Date.now().toString(); // Random değer şarttır
    const paymentParams = {
      amount: body.amount || "10.00",
      clientid: clientid,
      currency: "949",
      failUrl: "https://www.yenirotaegitim.com/api/odeme/callback",
      hashalgorithm: "ver3",
      inst: "", // Taksit yoksa boş string
      islemtipi: "Auth",
      lang: "tr",
      oid: `SIP-${Date.now()}`,
      okUrl: "https://www.yenirotaegitim.com/api/odeme/callback",
      rnd: rnd, // Hash'e dahil edilmeli
      storetype: "3d_pay_hosting",
    };

    const hash = generateZiraatHash(paymentParams, storeKey);

    return NextResponse.json({ 
      ...paymentParams, 
      hash,
      encoding: "UTF-8"
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Sistem hatası" }, { status: 500 });
  }
}