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
      escapeValue(tutar) + "|" +          // AMOUNT
      escapeValue(clientId) + "|" +       // CLIENT_ID
      escapeValue(oid) + "|" +            // OID
      escapeValue(okUrl) + "|" +          // OK_URL
      escapeValue(failUrl) + "|" +        // FAIL_URL
      escapeValue(islemtipi) + "|" +      // ISLEM_TIPI
      escapeValue(taksit) + "|" +         // TAKSIT
      escapeValue(rnd) + "|" +            // RND
      "|||" +                             // Three empty pipes (as you specified)
      escapeValue(currency) + "|" +       // CURRENCY
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