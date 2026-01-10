import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Frontend'den gelen veriler
    const { oid, tutar, rnd, okUrl, failUrl } = body;

    const clientId = process.env.ZIRAAT_CLIENT_ID || ""; 
    const storeKey = process.env.ZIRAAT_STORE_KEY || ""; 
    const islemtipi = "Auth"; // [cite: 91]
    const currency = "949";   // TL kodu [cite: 93]
    const taksit = "";        // Taksit yoksa boş [cite: 168]

    // ------------------------------------------------------------------
    // DÜZELTME: PDF Sayfa 16'daki SHA512 algoritma dizilimi 
    // ÖNEMLİ: Parametreler arasında boşluk veya özel karakter gerekip gerekmediği 
    // banka yönetim panelindeki "Hash Versiyonu" ayarına bağlıdır. 
    // Genelde ver3 için düz birleştirme kullanılır.
    // ------------------------------------------------------------------
    
    // ver3 (En güncel) için standart birleştirme:
    const hashString = clientId + oid + tutar + okUrl + failUrl + islemtipi + taksit + rnd + currency + storeKey;

    // SHA-512 kullanımı dökümanda önerilmektedir[cite: 422].
    const hash = crypto
      .createHash("sha512")
      .update(hashString, "utf-8")
      .digest("base64");

    return NextResponse.json({ hash });

  } catch (error) {
    console.error("Hash hesaplama hatası:", error);
    return NextResponse.json({ error: "Hash hesaplanamadı" }, { status: 500 });
  }
}