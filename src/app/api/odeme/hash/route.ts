import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { oid, tutar, rnd, okUrl, failUrl } = body;

    const clientId = process.env.ZIRAAT_CLIENT_ID || ""; 
    const storeKey = process.env.ZIRAAT_STORE_KEY || ""; 
    
    // Değişkenleri tanımlıyoruz [cite: 91, 93, 168]
    const islemtipi = "Auth"; 
    const currency = "949";   
    const taksit = "";        

    // ------------------------------------------------------------------
    // DÜZELTME: PDF Sayfa 16 ve 22'ye göre TAM HASH ZİNCİRİ
    // Sıralama: clientId + oid + tutar + okUrl + failUrl + islemtipi + taksit + rnd + currency + storeKey
    // ------------------------------------------------------------------
    
    const hashString = clientId + oid + tutar + okUrl + failUrl + islemtipi + taksit + rnd + currency + storeKey;

    // SHA-512 algoritması ile hash oluşturma 
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