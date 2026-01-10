import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Frontend'den gelen verileri alıyoruz
    // DİKKAT: Frontend'deki fetch işleminde okUrl ve failUrl'i de gönderdiğinden emin ol.
    const { oid, tutar, rnd, okUrl, failUrl } = body;

    // .env dosyasından alıyoruz (Güvenlik için şart!)
    const clientId = process.env.ZIRAAT_CLIENT_ID; 
    const storeKey = process.env.ZIRAAT_STORE_KEY; 

    // ------------------------------------------------------------------
    // DÜZELTME: PDF Sayfa 13 ve 20'ye göre Doğru Hash Formülü
    // Formül: clientid + oid + amount + okUrl + failUrl + rnd + storekey
    // Kaynak: [cite: 316, 585]
    // ------------------------------------------------------------------
    
    const hashString = `${clientId}${oid}${tutar}${okUrl}${failUrl}${rnd}${storeKey}`;

    // PDF Sayfa 16'da SHA512 kullanılabileceği belirtilmiş[cite: 422].
    // Base64 formatına çeviriyoruz.
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