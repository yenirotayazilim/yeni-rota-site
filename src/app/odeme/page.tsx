"use client";
import { useState } from "react";

export default function OdemePage() {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    // 1. Kendi API'mizden hashli verileri al
    const res = await fetch("/api/odeme", {
      method: "POST",
      body: JSON.stringify({ amount: "100.00" }),
    });
    const data = await res.json();

    // 2. Gizli bir form oluşturup bankaya POST et
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://entegrasyon.ziraatbank.com.tr/fim/est3Dgate"; // Test URL

    Object.keys(data).forEach((key) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = data[key];
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold">Ödeme Sayfası</h1>
      <button 
        onClick={handlePay}
        className="bg-red-600 text-white p-3 rounded"
        disabled={loading}
      >
        {loading ? "Yönlendiriliyor..." : "Ziraat ile Öde"}
      </button>
    </div>
  );
}