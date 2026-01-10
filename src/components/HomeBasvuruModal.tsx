'use client'
import { Dispatch, SetStateAction, useState } from 'react'

export default function HomeBasvuruModal({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}) {
  const [form, setForm] = useState({ name: '', phone: '', email: '' })
  const [errors, setErrors] = useState({ name: '', phone: '' })
  const [successMessage, setSuccessMessage] = useState('')
  const [sending, setSending] = useState(false)

  const validate = () => {
    const newErrors = { name: '', phone: '' }
    if (!form.name.trim()) newErrors.name = 'Bu alan zorunludur.'
    if (!form.phone.trim()) newErrors.phone = 'Bu alan zorunludur.'
    setErrors(newErrors)
    return !newErrors.name && !newErrors.phone
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setSending(true)
    try {
      const res = await fetch('/api/basvuru', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, egitim: 'Genel Başvuru' }),
      })

      if (!res.ok) throw new Error()

      setSuccessMessage('Mesajınız başarıyla gönderildi ✅')
      setTimeout(() => {
        setSuccessMessage('')
        setOpen(false)
        setForm({ name: '', phone: '', email: '' })
      }, 3000)
    } catch {
      setSuccessMessage('Gönderim sırasında bir hata oluştu ❌')
    } finally {
      setSending(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-[#F8F9FA] rounded-2xl px-8 py-10 shadow-2xl w-[90%] max-w-md space-y-6 relative border border-[#d9d9d9]"
      >
        {/* Kapat */}
        <button
          onClick={() => setOpen(false)}
          type="button"
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-extrabold text-[#6A0572] text-center mb-4">🎓 Hemen Başla Formu</h2>
        <p className="text-center text-sm text-gray-600 mb-4">Mail yollayın, biz size ulaşalım!</p>

        {/* Ad Soyad */}
        <div>
          <label className="block text-sm font-semibold text-[#6A0572] mb-1">Ad Soyad</label>
          <input
            required
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full border border-gray-300 focus:border-[#6A0572] focus:ring-[#6A0572] px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-1 transition text-black"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Telefon */}
        <div>
          <label className="block text-sm font-semibold text-[#6A0572] mb-1">Telefon</label>
          <input
            required
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            className="w-full border border-gray-300 focus:border-[#6A0572] focus:ring-[#6A0572] px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-1 transition text-black"
          />
          {errors.phone && (
            <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* E-Posta */}
        <div>
          <label className="block text-sm font-semibold text-[#6A0572] mb-1">E-Posta (Opsiyonel)</label>
          <input
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full border border-gray-300 focus:border-[#6A0572] focus:ring-[#6A0572] px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-1 transition text-black"
          />
        </div>

        <button
          type="submit"
          disabled={sending}
          className="w-full mt-4 bg-[#6A0572] hover:bg-[#8C1A85] text-white font-bold py-3 rounded-lg shadow-md transition-all hover:-translate-y-[2px] disabled:opacity-60"
        >
          {sending ? 'Gönderiliyor...' : 'Gönder'}
        </button>

        {successMessage && (
          <div className="text-center mt-3 text-green-700 font-semibold">
            {successMessage}
          </div>
        )}
      </form>
    </div>
  )
}
