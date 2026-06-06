"use client";

import { usePathname } from "next/navigation";

// /app-sohbet sayfası app içindeki WebView'de açılır: navbar, footer ve
// sitenin genel respond.io widget'ı orada görünmemeli (app'in kendi
// sohbet kanalı yüklenir, iki widget çakışmasın).
export default function HideOnAppChat({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/app-sohbet")) return null;
  return <>{children}</>;
}
