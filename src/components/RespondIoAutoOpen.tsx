"use client";

import { useEffect } from "react";

export default function RespondIoAutoOpen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && window.respondIO) {
        window.respondIO.open();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
