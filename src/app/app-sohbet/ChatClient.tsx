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
  }
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

    // Widget hazır olunca sohbeti otomatik aç — kursiyer balona basmak zorunda kalmasın
    let tries = 0;
    const timer = setInterval(() => {
      tries++;
      if (window.$respond) {
        clearInterval(timer);
        try {
          window.$respond.do("chat:open");
        } catch {}
      } else if (tries > 150) {
        // ~15 sn içinde yüklenemediyse kursiyeri bilgilendir
        clearInterval(timer);
        setFailed(true);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 flex flex-col items-center justify-center"
      style={{ background: "#12021A" }}
    >
      <p
        className="text-2xl"
        style={{ color: "#C9A961", fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        Canlı Destek
      </p>
      {failed ? (
        <p className="mt-3 px-8 text-center text-sm text-white/70">
          Bağlantı kurulamadı. Lütfen internet bağlantınızı kontrol edip tekrar
          deneyin.
        </p>
      ) : (
        <p className="mt-3 text-sm text-white/50">Bağlantı kuruluyor…</p>
      )}
    </div>
  );
}
