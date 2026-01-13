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
    const newErrors = { adSoyad: "", telefon: "", email: "", tutar: "" }

    if (!formData.adSoyad.trim()) {
      newErrors.adSoyad = "Please enter your full name."
      isValid = false
    }
    if (!formData.telefon.trim() || formData.telefon.length < 10) {
      newErrors.telefon = "Please enter a valid phone number."
      isValid = false
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address."
      isValid = false
    }
    if (!formData.tutar || Number(formData.tutar) <= 0) {
      newErrors.tutar = "Please enter the amount."
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return;
    
    setYukleniyor(true)
    
    const oid = "ROTA-" + Date.now()
    const rnd = Date.now().toString()
    const baseUrl = window.location.origin
    const callbackUrl = `${baseUrl}/api/odeme/callback`
    const formattedAmount = parseFloat(formData.tutar).toFixed(2)

    try {
      const response = await fetch("/api/odeme/hash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oid,
          tutar: formattedAmount,
          rnd,
          okUrl: callbackUrl,
          failUrl: callbackUrl
        })
      })

      const data = await response.json()

      if (data.hash) {
        const form = document.createElement("form")
        form.method = "POST"
        form.action = "https://sanalpos2.ziraatbank.com.tr/fim/est3dgate"

        // BANKA MAİLİNDEKİ MADDELERE GÖRE PARAMETRELER
        const fields: Record<string, string> = {
          clientid: "192474689",
          storetype: "3d_pay_hosting",
          hash: data.hash,
          hashAlgorithm: "ver3", // Madde 3
          islemtipi: "Auth",
          amount: formattedAmount, // Madde 2
          currency: "949",
          oid: oid,
          okUrl: callbackUrl,
          failUrl: callbackUrl,
          lang: "en", // English interface
          rnd: rnd,
          encoding: "UTF-8", // Madde 5
          taksit: "", // Madde 6 (Empty string)
          Email: formData.email,
          tel: formData.telefon,
          Faturafirma: formData.adSoyad
        }

        Object.entries(fields).forEach(([key, value]) => {
          const input = document.createElement("input")
          input.type = "hidden"
          input.name = key
          input.value = value
          form.appendChild(input)
        })

        console.log("📋 Final Form Parameters (Check OID here):", fields)
        document.body.appendChild(form)
        form.submit()
      } else {
        throw new Error(data.error || "Hash failed")
      }
    } catch (error) {
      console.error("❌ Error:", error)
      alert("System Error. Please try again.")
      setYukleniyor(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans selection:bg-[#6A0572] selection:text-white">
      {/* Sol Panel - Visuals */}
      <div className="lg:w-5/12 bg-[#1a0b2e] relative overflow-hidden flex flex-col justify-between p-8 lg:p-12 text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <path d="M50,350 Q200,50 350,350" stroke="url(#grad1)" strokeWidth="2" fill="none" />
          </svg>
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: "#6A0572", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#ff00cc", stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </div>

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tighter">
            <div className="w-8 h-8 bg-gradient-to-tr from-[#6A0572] to-[#ff00cc] rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">R</span>
            </div>
            Rota Education
          </Link>
          <div className="mt-8">
            <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
              Invest in <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d946ef] to-[#ffffff]">Your Future.</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-sm">
              Use our secure payment infrastructure for your education journey.
            </p>
          </div>
        </div>
      </div>

      {/* Sağ Panel - Form */}
      <div className="lg:w-7/12 bg-white flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-lg">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900">Payment Details</h3>
            <p className="text-gray-500 text-sm">Please fill in your information.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className={`transition-all duration-300 ${aktifAlan === 'adSoyad' ? 'scale-[1.01]' : ''}`}>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
              <input
                type="text"
                name="adSoyad"
                onFocus={() => setAktifAlan('adSoyad')}
                onBlur={() => setAktifAlan('')}
                value={formData.adSoyad}
                onChange={handleChange}
                className={`w-full px-4 py-4 bg-gray-50 border-2 rounded-xl outline-none transition-colors ${errors.adSoyad ? 'border-red-500' : 'focus:border-[#6A0572]'}`}
                placeholder="John Doe"
              />
              {errors.adSoyad && <p className="mt-1 text-xs text-red-500">⚠️ {errors.adSoyad}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone</label>
                <input
                  type="tel"
                  name="telefon"
                  value={formData.telefon}
                  onChange={handleChange}
                  className={`w-full px-4 py-4 bg-gray-50 border-2 rounded-xl outline-none ${errors.telefon ? 'border-red-500' : 'focus:border-[#6A0572]'}`}
                  placeholder="05XXXXXXXXX"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">E-Mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-4 bg-gray-50 border-2 rounded-xl outline-none ${errors.email ? 'border-red-500' : 'focus:border-[#6A0572]'}`}
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="relative">
              <div className={`p-6 rounded-2xl text-white shadow-xl bg-gradient-to-r ${errors.tutar ? 'from-red-600 to-red-800' : 'from-[#6A0572] to-[#4a0350]'}`}>
                <p className="text-white/80 text-xs font-bold uppercase mb-1">Total Amount</p>
                <div className="flex items-center">
                  <span className="text-2xl font-medium mr-1">₺</span>
                  <input
                    type="number"
                    name="tutar"
                    value={formData.tutar}
                    onChange={handleChange}
                    className="bg-transparent text-4xl font-bold w-full outline-none placeholder-white/30"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={yukleniyor}
              className="w-full py-5 bg-gray-900 text-white text-lg font-bold rounded-xl disabled:opacity-70"
            >
              {yukleniyor ? "Connecting to Bank..." : "Complete Payment"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}