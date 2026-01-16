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

    // 🔐 SADECE ENV'DEN AL – FALLBACK YOK
    const clientId = process.env.ZIRAAT_CLIENT_ID;
    const storeKey = process.env.ZIRAAT_STORE_KEY;

    if (!clientId || !storeKey) {
      console.error("❌ Ziraat ENV değişkenleri tanımlı değil!");
      return NextResponse.json(
        { error: "Ödeme yapılandırması eksik (ENV)" },
        { status: 500 }
      );
    }

    // Kaçış fonksiyonu (Ziraat zorunlu)
    const escapeValue = (val: string) =>
      val.replace(/\\/g, "\\\\").replace(/\|/g, "\\|");

    // Sabit değerler
    const hashAlgorithm = "ver3";
    const islemtipi = "Auth";
    const lang = "tr";
    const storetype = "3d_pay_hosting";
    const currency = "949";

    // 📌 ZİRAAT'IN VERDİĞİ ALFABETİK SIRA:
    // amount|clientid|currency|Email|failUrl|Faturafirma|
    // hashAlgorithm|islemtipi|lang|oid|okUrl|rnd|
    // storetype|tel|storekey

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

    console.log("====================================");
    console.log("🔐 HASH STRING:");
    console.log(hashString);
    console.log("====================================");

    const hash = crypto
      .createHash("sha512")
      .update(hashString, "utf8")
      .digest("base64");

    console.log("✅ CALCULATED HASH:", hash);

    return NextResponse.json({ hash });

  } catch (error) {
    console.error("❌ Hash hesaplama hatası:", error);

    return NextResponse.json(
      {
        error: "Hash hesaplanamadı",
        details: String(error)
      },
      { status: 500 }
    );
  }
}
