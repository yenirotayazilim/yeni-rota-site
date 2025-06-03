'use client'

import React, { useState } from 'react'

interface Office {
  name: string
  address: string
  phone: string
  whatsapp?: string
  email?: string
  responsible?: string[]
  advisors?: string[]
}

interface SocialLinks {
  facebook?: string
  youtube?: string
  instagram?: string
  twitter?: string
}

interface ContactFormProps {
  offices: Office[]
  socialLinks?: SocialLinks
  formNote?: string
}

export default function ContactForm({ offices, socialLinks, formNote }: ContactFormProps) {
  const [activeTab, setActiveTab] = useState(offices.length > 0 ? offices[0].name.toLowerCase() : '')
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleTabClick = (name: string) => setActiveTab(name.toLowerCase())
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Gönderim başarısız oldu.')
      setSubmitted(true)
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message || 'Bir hata oluştu.' : 'Bir hata oluştu.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      className="mt-6 max-w-6xl mx-auto rounded-2xl px-2 sm:px-4 md:px-8 py-6"
      style={{
        background: "radial-gradient(ellipse at 40% 80%, #F8F9FA 0%, #fff 45%, #F8F9FA 100%)"
      }}
    >
      {/* BAŞLIK ve ALT BAŞLIK */}
      <div className="mb-8 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#6A0572] to-[#8C1A85] bg-clip-text text-transparent mb-2 tracking-tight drop-shadow-md">
          İletişim
        </h2>
        <p className="text-[#283346] text-base md:text-lg font-medium opacity-80">
          Bizimle iletişime geçmek için ofislerimizi inceleyin veya formu doldurun.
        </p>
        {formNote && (
          <p className="mt-3 text-[#6A0572] text-sm font-semibold">{formNote}</p>
        )}
      </div>
      {/* Responsive GRID */}
      <div className="flex flex-col md:flex-row gap-8 items-stretch w-full">
        {/* SOL TARAF */}
        <div className="md:w-1/2 w-full flex flex-col justify-between">
          <div>
            {/* SEKME BUTONLARI */}
            <div className="flex gap-2 border-b border-[#6A0572] mb-4 overflow-x-auto">
              {offices.map((office) => (
                <button
                  key={office.name}
                  onClick={() => handleTabClick(office.name)}
                  className={`px-3 py-2 font-semibold text-[#6A0572] border-b-4 border-transparent transition-colors duration-300 focus:outline-none
                  ${activeTab === office.name.toLowerCase()
                      ? 'text-[#6A0572] border-[#6A0572] bg-white/80 rounded-t-lg'
                      : 'hover:text-[#8C1A85]'}`}
                  type="button"
                >
                  {office.name}
                </button>
              ))}
            </div>

            {/* SEKME İÇERİKLERİ */}
            <div className="text-sm text-[#283346] space-y-6 min-h-[120px]">
              {offices.map((office) => (
                <div
                  key={office.name}
                  className={`${activeTab === office.name.toLowerCase() ? 'block' : 'hidden'}`}
                >
                  <p className="font-semibold text-[#6A0572]">{office.name} Genel Merkez</p>
                  <p>{office.address}</p>
                  <p>
                    <strong>TELEFON :</strong> {office.phone}
                  </p>
                  {office.whatsapp && (
                    <p>
                      <strong>WHATSAPP :</strong> {office.whatsapp}
                    </p>
                  )}
                  {office.email && (
                    <p>
                      <strong>E-POSTA :</strong> {office.email}
                    </p>
                  )}
                  {office.responsible?.length ? (
                    <>
                      <p className="text-[#8C1A85] font-semibold mt-4">SORUMLULAR</p>
                      <ul className="list-disc ml-5">
                        {office.responsible.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                  {office.advisors?.length ? (
                    <>
                      <p className="text-[#8C1A85] font-semibold mt-4">EĞİTİM DANIŞMANLARI</p>
                      <ul className="list-disc ml-5">
                        {office.advisors.map((a, i) => (
                          <li key={i}>{a}</li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                </div>
              ))}
            </div>

            {/* SOSYAL MEDYA */}
            {socialLinks && (
              <ul className="flex mt-8 space-x-4">
                {socialLinks.facebook && (
                  <li className="bg-[#6A0572] hover:bg-[#8C1A85] h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-200">
                    <a href={socialLinks.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                      <i className="fab fa-facebook-f text-white"></i>
                    </a>
                  </li>
                )}
                {socialLinks.youtube && (
                  <li className="bg-[#6A0572] hover:bg-[#8C1A85] h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-200">
                    <a href={socialLinks.youtube} target="_blank" rel="noreferrer" aria-label="YouTube">
                      <i className="fab fa-youtube text-white"></i>
                    </a>
                  </li>
                )}
                {socialLinks.instagram && (
                  <li className="bg-[#6A0572] hover:bg-[#8C1A85] h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-200">
                    <a href={socialLinks.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                      <i className="fab fa-instagram text-white"></i>
                    </a>
                  </li>
                )}
                {socialLinks.twitter && (
                  <li className="bg-[#6A0572] hover:bg-[#8C1A85] h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-200">
                    <a href={socialLinks.twitter} target="_blank" rel="noreferrer" aria-label="Twitter">
                      <i className="fab fa-twitter text-white"></i>
                    </a>
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>

        {/* SAĞ FORM ALANI */}
        <div
          className="border border-[#a8e1fa55] p-4 md:p-6 rounded-xl flex flex-col justify-between w-full md:w-1/2 max-w-md mx-auto md:mx-0 shadow"
          style={{ background: "#F8F9FA" }}
        >
          {submitted ? (
            <div className="p-6 bg-[#e0f6ff] rounded-lg text-[#2196f3] font-semibold text-center">
              Mesajınız başarıyla gönderildi. Teşekkürler!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col justify-between" noValidate>
              <input
                type="text"
                name="name"
                placeholder="Adınız"
                required
                disabled={loading}
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-lg py-3 px-4 text-[#283346] text-sm bg-white border border-[#6A0572] focus:ring-2 focus:ring-[#8C1A85]"
              />
              <input
                type="email"
                name="email"
                placeholder="E-posta"
                required
                disabled={loading}
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-lg py-3 px-4 text-[#283346] text-sm bg-white border border-[#6A0572] focus:ring-2 focus:ring-[#8C1A85]"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Telefon"
                required
                disabled={loading}
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-lg py-3 px-4 text-[#283346] text-sm bg-white border border-[#6A0572] focus:ring-2 focus:ring-[#8C1A85]"
              />
              <textarea
                name="message"
                placeholder="Mesajınız"
                rows={6}
                required
                disabled={loading}
                value={form.message}
                onChange={handleChange}
                className="w-full rounded-lg px-4 pt-3 text-[#283346] text-sm bg-white border border-[#6A0572] focus:ring-2 focus:ring-[#8C1A85]"
              />

              {error && <p className="text-red-600 text-center">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="mt-4 text-white bg-[#6A0572] hover:bg-[#8C1A85] rounded-lg text-sm font-medium px-4 py-3 flex items-center justify-center transition-all duration-300 disabled:opacity-60"
              >
                <i className="fa fa-paper-plane mr-2"></i> {loading ? 'Gönderiliyor...' : 'Gönder'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
