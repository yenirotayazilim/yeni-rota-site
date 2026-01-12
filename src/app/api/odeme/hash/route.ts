import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { oid, tutar, rnd, okUrl, failUrl } = body;

    const clientId = process.env.ZIRAAT_CLIENT_ID || "192474689"; 
    const storeKey = process.env.ZIRAAT_STORE_KEY || ""; 
    const islemtipi = "Auth"; 
    const currency = "949";
    const taksit = "";

    const escapeValue = (val: string) => val.replace(/\\/g, "\\\\").replace(/\|/g, "\\|");

    // DÜZELTME: Ver3 SHA-512 Sıralaması (Sayfa 16)
    // clientId|oid|amount|okUrl|failUrl|islemtipi|taksit|rnd|||||currency|storeKey
    // rnd'den sonra tam 5 pipe (|||||) zorunludur!
    const hashString = 
      escapeValue(clientId) + "|" + 
      escapeValue(oid) + "|" + 
      escapeValue(tutar) + "|" + 
      escapeValue(okUrl) + "|" + 
      escapeValue(failUrl) + "|" + 
      escapeValue(islemtipi) + "|" + 
      escapeValue(taksit) + "|" + 
      escapeValue(rnd) + "|||||" + 
      escapeValue(currency) + "|" + 
      escapeValue(storeKey);

    const hash = crypto
      .createHash("sha512")
      .update(hashString, "utf8")
      .digest("base64");

    return NextResponse.json({ hash });
  } catch (error) {
    return NextResponse.json({ error: "Hash hatası", details: String(error) }, { status: 500 });
  }
}