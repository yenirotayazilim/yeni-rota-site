"use client";

import { useEffect, useState } from "react";

// App'e özel Website Chat kanalı (sitedeki genel widget'tan AYRI kanal)
const WIDGET_SRC =
  "https://cdn.respond.io/webchat/widget/widget.js?cId=4908e49d263c43b559399f7d54b5680";

declare global {
  interface Window {
    $respond?: {
      do: (action: string) => void;
      on: (event: string, cb: () => void) => void;
      is: (state: string) => boolean;
    };
    // Flutter WebView JavaScriptChannel — app bu kanaldan haber alır
    RotaChat?: { postMessage: (msg: string) => void };
    // App'in "Sohbete Başla" butonunun çağırdığı fonksiyon
    rotaChatOpen?: () => void;
  }
}

function notifyApp(msg: string) {
  try {
    window.RotaChat?.postMessage(msg);
  } catch {}
}

export default function ChatClient() {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    // Çift yükleme güvenliği (layout'taki site widget'ı bu sayfada zaten kapalı)
    if (!document.getElementById("respondio__widget")) {
      const s = document.createElement("script");
      s.id = "respondio__widget";
      s.src = WIDGET_SRC;
      document.body.appendChild(s);
    }

    // App'in butonu bu fonksiyonu çağırır — resmi açma API'si
    window.rotaChatOpen = () => {
      try {
        window.$respond?.do("chat:open");
      } catch {}
    };

    // Widget'ı bekle: hazır olunca app'e "ready" de, sonra aç/kapa
    // durumunu izleyip app'e bildir. Olay adlarına güvenmek yerine
    // resmi $respond.is("chat:open") durumunu yokluyoruz — ad değişse
    // bile çalışır.
    let ready = false;
    let lastOpen: boolean | null = null;
    let tries = 0;
    const timer = setInterval(() => {
      const r = window.$respond;
      if (!r) {
        tries++;
        if (tries > 150) {
          // ~15 sn içinde yüklenemedi
          clearInterval(timer);
          setFailed(true);
          notifyApp("failed");
        }
        return;
      }
      if (!ready) {
        ready = true;
        notifyApp("ready");
      }
      let open = false;
      try {
        open = r.is("chat:open");
      } catch {}
      if (open !== lastOpen) {
        lastOpen = open;
        notifyApp(open ? "opened" : "closed");
      }
    }, 300);

    return () => clearInterval(timer);
  }, []);

  // Bu sayfa app'te karşılama ekranının ARKASINDA durur — kursiyer burayı
  // sadece widget açıkken görür; yine de marka zemini hazır bekletiyoruz.
  return (
    <div
      className="fixed inset-0 z-0 flex flex-col items-center justify-center"
      style={{ background: "#12021A" }}
    >
      {failed && (
        <p className="px-8 text-center text-sm text-white/70">
          Bağlantı kurulamadı. Lütfen internet bağlantınızı kontrol edip tekrar
          deneyin.
        </p>
      )}
    </div>
  );
}
