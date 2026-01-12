"use client"
import { useState } from "react"

export default function OdemeSayfasi() {
  const [formData, setFormData] = useState({ adSoyad: "", telefon: "", email: "", tutar: "" })
  const [yukleniyor, setYukleniyor] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.tutar) return alert("Tutar giriniz");
    
    setYukleniyor(true);
    
    // Benzersiz sipariş numarası ve rastgele değer üretimi
    const oid = "ROTA-" + Date.now(); 
    const rnd = Math.random().toString(36).substring(2, 10);
    const baseUrl = window.location.origin;
    const callbackUrl = `${baseUrl}/api/odeme/callback`;
    const formatTutar = parseFloat(formData.tutar).toFixed(2); // Kuruş hanesi zorunluluğu

    try {
      const response = await fetch("/api/odeme/hash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oid, tutar: formatTutar, rnd, okUrl: callbackUrl, failUrl: callbackUrl })
      });

      const data = await response.json();

      if (data.hash) {
        const form = document.createElement("form");
        form.method = "POST";
        form.action = "https://sanalpos2.ziraatbank.com.tr/fim/est3dgate";

        // Tip güvenliği sağlandı (any hatası giderildi)
        const fields: Record<string, string> = {
          clientid: "192474689",
          storetype: "3d_pay_hosting",
          hash: data.hash,
          hashAlgorithm: "ver3",
          islemtipi: "Auth", //
          amount: formatTutar,
          currency: "949", // TL kodu
          oid: oid,
          okUrl: callbackUrl,
          failUrl: callbackUrl,
          lang: "tr",
          rnd: rnd,
          encoding: "utf-8",
          Email: formData.email,
          tel: formData.telefon,
          Faturafirma: formData.adSoyad
        };

        Object.entries(fields).forEach(([key, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = value;
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      }
    } catch (err) {
      console.error("Ödeme başlatma hatası:", err); // error değişkeni kullanıldı
      alert("Hata oluştu. Lütfen tekrar deneyin.");
      setYukleniyor(false);
    }
  };

  return (
    <div className="p-10 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-5">Rota Eğitim Ödeme Paneli</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full border p-3 rounded" placeholder="Ad Soyad" onChange={e => setFormData({...formData, adSoyad: e.target.value})} />
        <input className="w-full border p-3 rounded" placeholder="Telefon" onChange={e => setFormData({...formData, telefon: e.target.value})} />
        <input className="w-full border p-3 rounded" placeholder="E-Posta" onChange={e => setFormData({...formData, email: e.target.value})} />
        <input className="w-full border p-3 rounded" type="number" placeholder="Tutar" onChange={e => setFormData({...formData, tutar: e.target.value})} />
        <button type="submit" disabled={yukleniyor} className="w-full bg-black text-white p-4 rounded font-bold">
          {yukleniyor ? "Yönlendiriliyor..." : "Ödemeyi Tamamla"}
        </button>
      </form>
    </div>
  )
}