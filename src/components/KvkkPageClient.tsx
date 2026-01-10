"use client";

import { useEffect } from "react";

export default function KvkkPageClient() {
  useEffect(() => {
    const revealElements = document.querySelectorAll(".scroll-reveal");

    function revealOnScroll() {
      const triggerBottom = window.innerHeight * 0.9;
      revealElements.forEach((el) => {
        const boxTop = el.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
          el.classList.add("visible");
        }
      });
    }

    window.addEventListener("scroll", revealOnScroll);
    window.addEventListener("load", revealOnScroll);

    return () => {
      window.removeEventListener("scroll", revealOnScroll);
      window.removeEventListener("load", revealOnScroll);
    };
  }, []);

  return (
    <section
      className="min-h-screen px-4 py-20 font-sans"
      style={{
        background: "radial-gradient(ellipse at 40% 80%, #e0f6ff 0%, #fff 45%, #a0e3ff 100%)",
      }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Başlık */}
        <div className="text-center mb-12 scroll-reveal">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#38bdf8] to-[#4cc7ff] bg-clip-text text-transparent mb-3 tracking-tight">
            KVKK & Kullanım Şartları
          </h1>
          <p className="text-[#283346] text-md md:text-lg">
            Gizliliğiniz bizim için önemli. Lütfen yasal metinleri dikkatle okuyunuz.
          </p>
        </div>

        {/* KVKK Kart */}
        <div className="relative bg-white/80 rounded-2xl border border-[#a8e1fa55] p-6 shadow-lg hover:shadow-[#38bdf8]/20 transition-all duration-300 mb-12 scroll-reveal">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#38bdf8] to-[#4cc7ff] rounded-t-xl"></div>
          <div className="flex items-center gap-3 mb-4">
            <i className="fas fa-user-shield text-[#38bdf8] text-xl"></i>
            <h2 className="text-xl font-semibold text-[#38bdf8]">KVKK Aydınlatma Metni</h2>
          </div>
          <div className="text-sm text-[#283346] leading-relaxed space-y-3 prose prose-p:text-[#283346] prose-li:text-[#283346]">
            {/* Buraya KVKK metnini statik olarak koyabilirsin */}
            <p>
              6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) kapsamında, kişisel verileriniz; şirketimiz tarafından,
              mevzuata uygun olarak toplanmakta, saklanmakta ve işlenmektedir. Kişisel verilerinizin korunması ve gizliliğiniz
              bizim için önemlidir.
            </p>
            <ul>
              <li>
                Kişisel verileriniz yasal zorunluluklar ve hizmetlerimizi sunmak amacıyla kullanılmaktadır.
              </li>
              <li>
                KVKK kapsamındaki haklarınız için bizimle her zaman iletişime geçebilirsiniz.
              </li>
            </ul>
          </div>
        </div>

        {/* Kullanım Koşulları Kart */}
        <div className="relative bg-white/80 rounded-2xl border border-[#a8e1fa55] p-6 shadow-lg hover:shadow-[#38bdf8]/20 transition-all duration-300 scroll-reveal">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#38bdf8] to-[#4cc7ff] rounded-t-xl"></div>
          <div className="flex items-center gap-3 mb-4">
            <i className="fas fa-file-contract text-[#38bdf8] text-xl"></i>
            <h2 className="text-xl font-semibold text-[#38bdf8]">Kullanım Koşulları</h2>
          </div>
          <div className="text-sm text-[#283346] leading-relaxed space-y-3 prose prose-p:text-[#283346] prose-li:text-[#283346]">
            {/* Buraya Kullanım Koşulları metnini statik olarak koyabilirsin */}
            <p>
              Sitemizi kullanarak aşağıdaki şartları kabul etmiş olursunuz. Tüm içerik ve hizmetler üzerinde değişiklik yapma
              hakkı saklıdır.
            </p>
            <ul>
              <li>
                Web sitemizin tüm hakları saklıdır ve izinsiz kullanımı yasaktır.
              </li>
              <li>
                Kullanıcılar, içeriklerin doğruluğunu kontrol etmekle yükümlüdür.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
