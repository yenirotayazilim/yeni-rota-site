import type { Metadata } from "next";
import ChatClient from "./ChatClient";

export const metadata: Metadata = {
  title: "Canlı Destek | Yeni Rota Eğitim",
  robots: { index: false, follow: false },
};

// Kursiyer bilgileri URL fragment'ında (#) gelir — fragment sunucuya ve
// analytics'e gitmez. Aşağıdaki inline script, widget yüklenmeden ÖNCE
// çalışıp bilgileri __respond_settings'e yazar ve adres çubuğundan siler.
const identifyScript = `
(function () {
  try {
    var h = window.location.hash;
    if (h && h.length > 1) {
      var p = new URLSearchParams(h.substring(1));
      var ad = p.get("ad") || "";
      var soyad = p.get("soyad") || "";
      var email = p.get("email") || "";
      var tel = p.get("tel") || "";
      var uuid = p.get("uuid") || "";
      if (tel || email) {
        // Kimlik anahtarı TELEFON: respond.io'daki mevcut WhatsApp kişisiyle
        // eşleşsin, mükerrer kişi açılmasın (delioğlan telefondan bulur).
        window.__respond_settings = {
          identifier: tel || email,
          firstName: ad,
          lastName: soyad,
          phone: tel,
          email: email,
          language: "tr",
          custom_fields: { kursiyer_uuid: uuid },
        };
      }
      history.replaceState(null, "", window.location.pathname);
    }
  } catch (e) {}
})();
`;

export default function AppSohbetPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: identifyScript }} />
      <ChatClient />
    </>
  );
}
