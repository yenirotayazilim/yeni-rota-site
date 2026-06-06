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
      var uuid = p.get("uuid") || "";
      if (uuid) {
        // "Ayrı şerit" planı: telefon/email respond.io'ya GÖNDERİLMEZ —
        // resmi alanlar boş kalır ki WhatsApp kayıtlarıyla mükerrer
        // çakışması hiç doğmasın. Kimlik anahtarı kursiyer UUID'sidir,
        // internal_id özel alanına yazılır (delioğlan Supabase'den
        // telefon dahil her bilgiyi bu ID ile bulur).
        window.__respond_settings = {
          identifier: uuid,
          firstName: ad,
          lastName: soyad,
          language: "tr",
          custom_fields: { internal_id: uuid },
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
