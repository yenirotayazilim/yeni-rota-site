"use client";

import { useEffect } from "react";

export default function RespondIoWidget() {
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.respondIO) {
        window.respondIO.open();
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return null; // Görünür bir UI yok, sadece widget’ı açıyor.
}
