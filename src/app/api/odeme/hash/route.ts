import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      oid,
      tutar,
      rnd,
      okUrl,
      failUrl,
      email,
      adSoyad,
      telefon
    } = body;

    const clientId = process.env.ZIRAAT_CLIENT_ID || "192474689";
    const storeKey = process.env.ZIRAAT_STORE_KEY || "YeniRota2026!!*";

    const escapeValue = (val: string) =>
      val.replace(/\\/g, "\\\\").replace(/\|/g, "\\|");

    // Sabitler
    const hashAlgorithm = "ver3";
    const islemtipi = "Auth";
    const lang = "tr";
    const storetype = "3d_pay_hosting";
    const currency = "949";

    // BANKANIN İSTEDİĞİ SIRA:
    const hashString =
      escapeValue(tutar) + "|" +
      escapeValue(clientId) + "|" +
      escapeValue(currency) + "|" +
      escapeValue(email) + "|" +
      escapeValue(failUrl) + "|" +
      escapeValue(adSoyad) + "|" +
      escapeValue(hashAlgorithm) + "|" +
      escapeValue(islemtipi) + "|" +
      escapeValue(lang) + "|" +
      escapeValue(oid) + "|" +
      escapeValue(okUrl) + "|" +
      escapeValue(rnd) + "|" +
      escapeValue(storetype) + "|" +
      escapeValue(telefon) + "|" +
      escapeValue(storeKey);

    console.log("✅ BANK FORMATINDA HASH STRING:");
    console.log(hashString);

    const hash = crypto
      .createHash("sha512")
      .update(hashString, "utf8")
      .digest("base64");

    console.log("✅ CALCULATED HASH:", hash);

    return NextResponse.json({ hash });

  } catch (error) {
    return NextResponse.json(
      { error: "Hash hesaplanamadı", details: String(error) },
      { status: 500 }
    );
  }
}
