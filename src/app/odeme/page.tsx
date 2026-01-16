"use client"

import { useState } from "react"
import Link from "next/link"

export default function OdemeSayfasi() {
  const [formData, setFormData] = useState({
    adSoyad: "",
    telefon: "",
    email: "",
    tutar: ""
  })

  const [errors, setErrors] = useState({
    adSoyad: "",
    telefon: "",
    email: "",
    tutar: ""
  })

  const [yukleniyor, setYukleniyor] = useState(false)
  const [aktifAlan, setAktifAlan] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = {
      adSoyad: "",
      telefon: "",
      email: "",
      tutar: ""
    }

    if (!formData.adSoyad.trim()) {
      newErrors.adSoyad = "Lütfen adınızı ve soyadınızı giriniz."
      isValid = false
    }

    if (!formData.telefon.trim()) {
      newErrors.telefon = "Telefon numarası zorunludur."
      isValid = false
    } else if (formData.telefon.length < 10) {
      newErrors.telefon = "Geçerli bir numara giriniz."
      isValid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-posta adresi zorunludur."
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Geçerli bir e-posta adresi giriniz."
      isValid = false
    }

    if (!formData.tutar || Number(formData.tutar) <= 0) {
      newErrors.tutar = "Lütfen ödenecek tutarı giriniz."
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    

    if (!validateForm()) {
      
      return;
    }

    
    setYukleniyor(true)

    // Sipariş numarası ve random değer
    const oid = "ROTA-" + Date.now()
    const rnd = Date.now().toString()

    // Dinamik base URL - hem local hem production için çalışır
    const baseUrl = window.location.origin
    const callbackUrl = `${baseUrl}/api/odeme/callback`

   

    try {
      

      // Hash hesaplama endpoint'ini çağır
      const response = await fetch("/api/odeme/hash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oid,
          tutar: parseFloat(formData.tutar).toFixed(2),
          rnd,
          okUrl: callbackUrl,
          failUrl: callbackUrl,
          adSoyad: formData.adSoyad,
          email: formData.email,
          telefon: formData.telefon
        })
      })

      

      const data = await response.json()

      
      

      if (data.hash) {
        

        // Bankaya gönderilecek form
        
        const form = document.createElement("form")
        form.method = "POST"
        form.action = "https://sanalpos2.ziraatbank.com.tr/fim/est3dgate"

        // PDF'deki zorunlu parametreler - Sayfa 22-23
        const fields = {
          clientid: "192474689",
          storetype: "3d_pay_hosting",
          hash: data.hash,
          hashAlgorithm: "ver3",
          islemtipi: "Auth",
          amount: parseFloat(formData.tutar).toFixed(2),
          currency: "949",

          oid: oid,
          okUrl: callbackUrl,
          failUrl: callbackUrl,

          lang: "tr",
          rnd: rnd,

          Email: formData.email,
          tel: formData.telefon,
          Faturafirma: formData.adSoyad
        }

        // Formu oluştur ve gönder
        Object.entries(fields).forEach(([key, value]) => {
          const input = document.createElement("input")
          input.type = "hidden"
          input.name = key
          input.value = value as string
          form.appendChild(input)
        })

        // Debug: Form parametrelerini logla
       

        document.body.appendChild(form)
        

        // Form submit
        form.submit()

        
      } else {
        console.error("❌ Hash bulunamadı:", data);
        alert("Hash hesaplama hatası: " + (data.error || "Bilinmeyen hata"))
        setYukleniyor(false)
      }
    } catch (error) {
      console.error("❌ Hata:", error)
      alert("Bağlantı hatası. Lütfen tekrar deneyin.")
      setYukleniyor(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans selection:bg-[#6A0572] selection:text-white">
      {/* Sol Panel */}
      <div className="lg:w-5/12 bg-[#1a0b2e] relative overflow-hidden flex flex-col justify-between p-8 lg:p-12 text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <path d="M50,350 Q200,50 350,350" stroke="url(#grad1)" strokeWidth="2" fill="none" />
            <path d="M-50,200 Q200,-50 450,200" stroke="url(#grad1)" strokeWidth="2" fill="none" />
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: "#6A0572", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#ff00cc", stopOpacity: 1 }} />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-[#6A0572] rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute bottom-[-50px] right-[-50px] w-80 h-80 bg-[#8C1A85] rounded-full blur-[100px] opacity-30"></div>

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-tr from-[#6A0572] to-[#ff00cc] rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">R</span>
            </div>
            Rota Eğitim
          </Link>
          <div className="mt-8">
            <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
              Geleceğine <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d946ef] to-[#ffffff]">Yatırım Yap.</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-sm">
              Eğitim yolculuğunda bir sonraki adıma geçmek için güvenli ödeme altyapımızı kullanın.
            </p>
          </div>
        </div>

        <div className="relative z-10 mt-10 lg:mt-0">
          <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#1a0b2e] bg-gray-300 flex items-center justify-center text-xs text-black font-bold bg-cover" style={{ backgroundImage: `url(https://i.pravatar.cc/100?img=${i + 10})` }}></div>
              ))}
            </div>
            <div>
              <p className="text-sm font-bold text-white">1000+ Öğrenci</p>
              <p className="text-xs text-gray-400">Rota Eğitim&apos;i tercih etti.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sağ Panel - Form */}
      <div className="lg:w-7/12 bg-white flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-lg">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900">Ödeme Detayları</h3>
            <p className="text-gray-500 text-sm">Lütfen bilgilerinizi eksiksiz doldurun.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className={`transition-all duration-300 ${aktifAlan === 'adSoyad' ? 'scale-[1.01]' : ''}`}>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Kart Sahibi / Ad Soyad</label>
              <input
                type="text"
                name="adSoyad"
                
                value={formData.adSoyad}
                onChange={handleChange}
                className={`w-full px-4 py-4 bg-gray-50 border-2 rounded-xl outline-none transition-colors text-gray-900 font-medium placeholder-gray-400
                  ${errors.adSoyad
                    ? 'border-red-500 bg-red-50 focus:border-red-500'
                    : 'border-gray-100 focus:bg-white focus:border-[#6A0572]'}
                `}
                placeholder="Örn: Mehmet Yılmaz"
              />
              {errors.adSoyad && (
                <p className="mt-1 text-xs text-red-500 font-semibold animate-pulse">⚠️ {errors.adSoyad}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`transition-all duration-300 ${aktifAlan === 'telefon' ? 'scale-[1.01]' : ''}`}>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Telefon</label>
                <input
                  type="tel"
                  name="telefon"
                  onFocus={() => setAktifAlan('telefon')}
                  onBlur={() => setAktifAlan('')}
                  value={formData.telefon}
                  onChange={handleChange}
                  className={`w-full px-4 py-4 bg-gray-50 border-2 rounded-xl outline-none transition-colors text-gray-900 font-medium placeholder-gray-400
                    ${errors.telefon
                      ? 'border-red-500 bg-red-50 focus:border-red-500'
                      : 'border-gray-100 focus:bg-white focus:border-[#6A0572]'}
                  `}
                  placeholder="05XX XXX XX XX"
                />
                {errors.telefon && (
                  <p className="mt-1 text-xs text-red-500 font-semibold animate-pulse">⚠️ {errors.telefon}</p>
                )}
              </div>

              <div className={`transition-all duration-300 ${aktifAlan === 'email' ? 'scale-[1.01]' : ''}`}>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">E-Posta</label>
                <input
                  type="email"
                  name="email"
                  onFocus={() => setAktifAlan('email')}
                  onBlur={() => setAktifAlan('')}
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-4 bg-gray-50 border-2 rounded-xl outline-none transition-colors text-gray-900 font-medium placeholder-gray-400
                    ${errors.email
                      ? 'border-red-500 bg-red-50 focus:border-red-500'
                      : 'border-gray-100 focus:bg-white focus:border-[#6A0572]'}
                  `}
                  placeholder="isim@mail.com"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500 font-semibold animate-pulse">⚠️ {errors.email}</p>
                )}
              </div>
            </div>

            <div className="relative">
              <div className={`relative overflow-hidden bg-gradient-to-r p-6 rounded-2xl text-white shadow-xl transition-all duration-300 
                ${errors.tutar
                  ? 'from-red-600 to-red-800 ring-4 ring-red-200'
                  : 'from-[#6A0572] to-[#4a0350]'} 
                ${aktifAlan === 'tutar' && !errors.tutar ? 'scale-[1.02] ring-4 ring-[#6A0572]/20' : ''}`}>

                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>

                <div className="relative z-10 flex justify-between items-center">
                  <div className="w-full">
                    <p className="text-white/80 text-xs font-bold uppercase tracking-wider mb-1">Ödenecek Tutar</p>
                    <div className="flex items-center">
                      <span className="text-2xl font-medium mr-1">₺</span>
                      <input
                        type="number"
                        name="tutar"
                        min="1"
                        step="0.01"
                        onFocus={() => setAktifAlan('tutar')}
                        onBlur={() => setAktifAlan('')}
                        value={formData.tutar}
                        onChange={handleChange}
                        className="bg-transparent text-4xl font-bold w-full outline-none placeholder-white/30 text-white"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                    {errors.tutar ? (
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
              {errors.tutar && (
                <p className="mt-2 text-xs text-red-500 font-semibold text-center animate-pulse">⚠️ {errors.tutar}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={yukleniyor}
              
              className="w-full py-5 bg-gray-900 hover:bg-black text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {yukleniyor ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Bankaya Bağlanıyor...</span>
                </>
              ) : (
                <>
                  <span>Ödemeyi Tamamla</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}