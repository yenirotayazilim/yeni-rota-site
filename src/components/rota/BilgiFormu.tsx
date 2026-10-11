'use client';

// "Bilgi istiyorum" formu — sitenin para kazandıran parçası.
// Gönderim: mevcut /api/basvuru (n8n site-basvuru webhook'u) + reklam Lead sinyalleri:
//   fbq('track','Lead') → Facebook reklam optimizasyonu
//   gtag('event','generate_lead') → Google Analytics / Ads
// Sinyaller webhook BAŞARILI olduktan sonra atılır — sahte lead sayılmaz.

import { FormEvent, useState } from 'react';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

const ALANLAR = ['Kişisel Gelişim', 'Psikoloji', 'Sağlık', 'Spor'];

export default function BilgiFormu() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('');
  const [kvkk, setKvkk] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [netErr, setNetErr] = useState(false);

  const nameOk = name.trim().length > 1;
  const phoneOk = phone.replace(/\D/g, '').length >= 10;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!nameOk || !phoneOk || !kvkk) {
      setShowErrors(true);
      return;
    }
    setBusy(true);
    setNetErr(false);
    try {
      const res = await fetch('/api/basvuru', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: '',
          egitim: area || 'Ana sayfa bilgi talebi',
        }),
      });
      if (!res.ok) throw new Error('basvuru-failed');
      window.fbq?.('track', 'Lead', { content_category: area || 'genel' });
      window.gtag?.('event', 'generate_lead', { form: 'ana-sayfa-bilgi', alan: area || 'genel' });
      setSent(true);
    } catch {
      setNetErr(true);
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div className="rt-form-card">
        <div className="rt-success">
          <div className="rt-success-badge">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <h3 style={{ fontFamily: 'var(--rt-font-display)', fontWeight: 500, fontSize: '1.75rem', margin: 0, lineHeight: 1.15 }}>
            Talebiniz alındı
          </h3>
          <div className="rt-divider-star" aria-hidden="true">
            <i />
            <svg width="9" height="9" viewBox="0 0 10 10">
              <path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" fill="var(--rt-fg-gold)" opacity="0.8" />
            </svg>
            <i />
          </div>
          <p style={{ margin: 0, maxWidth: 320, fontSize: '14.5px', lineHeight: 1.6, color: 'var(--rt-fg-muted)' }}>
            Eğitim danışmanınız en kısa sürede sizinle iletişime geçecek. İlginiz için teşekkür ederiz.
          </p>
          <button
            type="button"
            className="rt-ghost-btn"
            onClick={() => {
              setSent(false);
              setShowErrors(false);
              setName('');
              setPhone('');
              setArea('');
              setKvkk(false);
            }}
          >
            Yeni talep oluştur
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rt-form-card">
      <form onSubmit={onSubmit} noValidate>
        <div className="rt-eyebrow" style={{ fontSize: 11, letterSpacing: '0.22em', marginBottom: 8 }}>
          Bilgi istiyorum
        </div>
        <div className="rt-form-title">Formu doldurun, biz arayalım</div>

        <label className="rt-field">
          <span className="rt-field-label">Ad soyad</span>
          <input
            type="text"
            className="rt-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Adınız ve soyadınız"
            autoComplete="name"
          />
          <span className="rt-err">{showErrors && !nameOk ? 'Lütfen ad ve soyadınızı giriniz.' : ''}</span>
        </label>

        <label className="rt-field">
          <span className="rt-field-label">Telefon</span>
          <input
            type="tel"
            inputMode="tel"
            className="rt-input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0(5__) ___ __ __"
            autoComplete="tel"
          />
          <span className="rt-err">{showErrors && !phoneOk ? 'Geçerli bir telefon numarası giriniz.' : ''}</span>
        </label>

        <label className="rt-field" style={{ marginBottom: 22 }}>
          <span className="rt-field-label">
            İlgilendiğiniz alan <span style={{ color: 'var(--rt-fg-dim)' }}>(isteğe bağlı)</span>
          </span>
          <select className="rt-input" value={area} onChange={(e) => setArea(e.target.value)} style={{ cursor: 'pointer' }}>
            <option value="">Seçiniz</option>
            {ALANLAR.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </label>

        <label className="rt-kvkk">
          <input type="checkbox" checked={kvkk} onChange={(e) => setKvkk(e.target.checked)} />
          <span>
            Kişisel verilerimin, bilgi talebimin değerlendirilmesi amacıyla işlenmesine ilişkin{' '}
            <a href="/kvkk" target="_blank" rel="noopener">
              aydınlatma metnini
            </a>{' '}
            okudum ve onaylıyorum.
          </span>
        </label>
        <span className="rt-err" style={{ margin: '2px 0 20px 28px' }}>
          {showErrors && !kvkk ? 'Devam etmek için aydınlatma metnini onaylayınız.' : netErr ? 'Gönderim başarısız oldu, lütfen tekrar deneyiniz.' : ''}
        </span>

        <button type="submit" className="rt-submit" disabled={busy}>
          {busy ? 'Gönderiliyor…' : 'Bilgi talebimi gönder'}
        </button>
      </form>
    </div>
  );
}
