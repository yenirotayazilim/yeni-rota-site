"use client";

export default function OdemePage() {
  const handlePay = async () => {
    const res = await fetch("/api/odeme", {
      method: "POST",
      body: JSON.stringify({ amount: "10.50" }), // Test tutarı
    });
    const data = await res.json();

    const form = document.createElement("form");
    form.method = "POST";
    
    /** * DNS HATASININ ÇÖZÜMÜ:
     * [host_name] yerine Ziraat/Nestpay'in gerçek adresi yazılmalı.
     * Test için: https://entegrasyon.asseco-see.com.tr/fim/est3Dgate
     * Canlı için: https://sanalpos2.ziraatbank.com.tr/fim/est3Dgate
     */
    form.action = "https://entegrasyon.asseco-see.com.tr/fim/est3Dgate";

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
    <div className="flex flex-col items-center p-10">
      <h1 className="text-xl font-bold mb-4">Ödeme İşlemi</h1>
      <button 
        onClick={handlePay} 
        className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        Güvenli Ödeme Sayfasına Git
      </button>
    </div>
  );
}