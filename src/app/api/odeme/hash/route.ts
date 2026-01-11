import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { oid, tutar, rnd, okUrl, failUrl } = body;

    // .env dosyasından alınacak değerler
    const clientId = process.env.ZIRAAT_CLIENT_ID || "192474689"; 
    const storeKey = process.env.ZIRAAT_STORE_KEY || ""; 
    
    // Sabit değerler
    const islemtipi = "Auth"; 
    const taksit = "";        
    const currency = "949";   

    // ============================================================
    // VER3 HASH ALGORITMASI - PDF Sayfa 16'ya göre
    // ============================================================
    
    // 1. Tüm değerleri escape et (\ ve | karakterleri için)
    const escapeValue = (val: string) => {
      return val.replace(/\\/g, "\\\\").replace(/\|/g, "\\|");
    };

    const escapedClientId = escapeValue(clientId);
    const escapedOid = escapeValue(oid);
    const escapedAmount = escapeValue(tutar);
    const escapedOkUrl = escapeValue(okUrl);
    const escapedFailUrl = escapeValue(failUrl);
    const escapedIslemtipi = escapeValue(islemtipi);
    const escapedTaksit = escapeValue(taksit);
    const escapedRnd = escapeValue(rnd);
    const escapedCurrency = escapeValue(currency);
    const escapedStoreKey = escapeValue(storeKey);

    // 2. Hash string'i oluştur (PDF'deki sıraya göre - Sayfa 16, VB örneği)
    // clientId|oid|amount|okUrl|failUrl|islemtipi|taksit|rnd|||||currency|storeKey
    const hashString = 
      escapedClientId + "|" + 
      escapedOid + "|" + 
      escapedAmount + "|" + 
      escapedOkUrl + "|" + 
      escapedFailUrl + "|" + 
      escapedIslemtipi + "|" + 
      escapedTaksit + "|" + 
      escapedRnd + "|" + 
      "|||" + // 3 boş pipe (döküman gereği)
      escapedCurrency + "|" + 
      escapedStoreKey;

    console.log("Hash String:", hashString); // Debug için

    // 3. SHA-512 ile hash hesapla
    const hash = crypto
      .createHash("sha512")
      .update(hashString, "utf8")
      .digest("base64");

    console.log("Calculated Hash:", hash); // Debug için

    return NextResponse.json({ hash });

  } catch (error) {
    console.error("Hash hesaplama hatası:", error);
    return NextResponse.json(
      { error: "Hash hesaplanamadı", details: String(error) }, 
      { status: 500 }
    );
  }
}