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
      return
    }

    setYukleniyor(true)

    const oid = "ROTA-" + Date.now()
    const rnd = Date.now().toString()

    const baseUrl = window.location.origin
    const callbackUrl = `${baseUrl}/api/odeme/callback`

    try {
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
        const form = document.createElement("form")
        form.method = "POST"
        form.action = "https://sanalpos2.ziraatbank.com.tr/fim/est3dgate"

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

        Object.entries(fields).forEach(([key, value]) => {
          const input = document.createElement("input")
          input.type = "hidden"
          input.name = key
          input.value = value as string
          form.appendChild(input)
        })

        document.body.appendChild(form)
        form.submit()
      } else {
        alert("Hash hesaplama hatası: " + (data.error || "Bilinmeyen hata"))
        setYukleniyor(false)
      }
    } catch (error) {
      alert("Bağlantı hatası. Lütfen tekrar deneyin.")
      setYukleniyor(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans selection:bg-[#6A0572] selection:text-white">
      {/* Sol Panel */}
      <div className="lg:w-5/12 bg-[#1a0b2e] relative overflow-hidden flex flex-col justify-between p-8 lg:p-12 text-white">
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-tr from-[#6A0572] to-[#ff00cc] rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">R</span>
            </div>
            Rota Eğitim
          </Link>
        </div>
      </div>

      {/* Sağ Panel - Form */}
      <div className="lg:w-7/12 bg-white flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-lg">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <input
              type="text"
              name="adSoyad"
              value={formData.adSoyad}
              onChange={handleChange}
              placeholder="Ad Soyad"
              className="w-full px-4 py-4 border rounded-xl"
            />

            <input
              type="tel"
              name="telefon"
              value={formData.telefon}
              onChange={handleChange}
              placeholder="Telefon"
              className="w-full px-4 py-4 border rounded-xl"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="E-posta"
              className="w-full px-4 py-4 border rounded-xl"
            />

            <input
              type="number"
              name="tutar"
              value={formData.tutar}
              onChange={handleChange}
              placeholder="Tutar"
              className="w-full px-4 py-4 border rounded-xl"
            />

            <button
              type="submit"
              disabled={yukleniyor}
              className="w-full py-5 bg-gray-900 text-white rounded-xl"
            >
              {yukleniyor ? "Bankaya Bağlanıyor..." : "Ödemeyi Tamamla"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
