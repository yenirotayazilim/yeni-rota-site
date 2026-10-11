'use client';

// Eğitim detay sayfasının bilgi formu — dönüşüm noktası.
// Ana sayfa formundan farkı: eğitim adı OTOMATIK gelir (seçim yok) ve Lead
// sinyalleri eğitim kırılımıyla atılır — reklam hangi eğitimin lead getirdiğini görür.
// Sinyaller webhook BAŞARILI olduktan sonra atılır — sahte lead sayılmaz.

import { FormEvent, useState } from 'react';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export default function EgitimDetayForm({ egitimAd, kategori }: { egitimAd: string; kategori: string | null }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
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
          egitim: egitimAd,
        }),
      });
      if (!res.ok) throw new Error('basvuru-failed');
      window.fbq?.('track', 'Lead', { content_name: egitimAd, content_category: kategori || 'genel' });
      window.gtag?.('event', 'generate_lead', { form: 'egitim-detay', egitim: egitimAd });
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
          <p style={{ margin: 0, maxWidth: 340, fontSize: '14.5px', lineHeight: 1.6, color: 'var(--rt-fg-muted)' }}>
            “{egitimAd}” hakkındaki talebiniz alındı. Eğitim danışmanınız en kısa sürede sizinle
            iletişime geçecek. İlginiz için teşekkür ederiz.
          </p>
          <button
            type="button"
            className="rt-ghost-btn"
            onClick={() => {
              setSent(false);
              setShowErrors(false);
              setName('');
              setPhone('');
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

        {/* Eğitim adı otomatik — seçim yok, sayfadaki eğitim forma düşer */}
        <div className="rt-det-form-egitim">
          <span className="rt-det-form-egitim-ikon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.59 13.41 13.42 20.6a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
              <circle cx="7" cy="7" r="1.2" fill="currentColor" stroke="none" />
            </svg>
          </span>
          <div style={{ minWidth: 0 }}>
            <div className="rt-det-form-egitim-ust">İlgilendiğiniz eğitim</div>
            <div className="rt-det-form-egitim-ad">{egitimAd}</div>
          </div>
        </div>

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

        <label className="rt-field" style={{ marginBottom: 22 }}>
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
