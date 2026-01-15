import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { oid, tutar, rnd, okUrl, failUrl } = body;

    // .env dosyasından alınacak değerler
    const clientId = process.env.ZIRAAT_CLIENT_ID || ""; 
    const storeKey = process.env.ZIRAAT_STORE_KEY || "";
    
    // CORS header'ları ekle
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    
    // Env variables kontrolü
    if (!storeKey || storeKey === "") {
      console.error("❌ ZIRAAT_STORE_KEY bulunamadı!");
      return NextResponse.json(
        { error: "Store key yapılandırılmamış" }, 
        { status: 500, headers }
      );
    } 
    
    // Sabit değerler
    const islemtipi = "Auth"; 
    const taksit = "";        // Boş olmalı ("1" veya "0" değil!)
    const currency = "949";   

    // ============================================================
    // VER3 HASH ALGORITMASI - ALFABETİK SIRALAMA (A-Z)
    // ============================================================
    
    // 1. Tüm değerleri escape et (\ ve | karakterleri için)
    const escapeValue = (val: string) => {
      return val.replace(/\\/g, "\\\\").replace(/\|/g, "\\|");
    };

    const escapedAmount = escapeValue(tutar);
    const escapedClientId = escapeValue(clientId);
    const escapedCurrency = escapeValue(currency);
    const escapedFailUrl = escapeValue(failUrl);
    const escapedIslemtipi = escapeValue(islemtipi);
    const escapedOid = escapeValue(oid);
    const escapedOkUrl = escapeValue(okUrl);
    const escapedRnd = escapeValue(rnd);
    const escapedStoreKey = escapeValue(storeKey);
    const escapedTaksit = escapeValue(taksit);

    // 2. Hash string'i oluştur (ALFABETİK SIRALAMA - A'dan Z'ye)
    // amount|clientid|currency|failUrl|islemtipi|oid|okUrl|rnd|storeKey|taksit
    const hashString = 
      escapedAmount + "|" +
      escapedClientId + "|" + 
      escapedCurrency + "|" +
      escapedFailUrl + "|" +
      escapedIslemtipi + "|" +
      escapedOid + "|" + 
      escapedOkUrl + "|" +
      escapedRnd + "|" +
      escapedStoreKey + "|" +
      escapedTaksit;

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