// Yeni footer — antetli kağıttaki gerçek iletişim + yasal satır,
// slogan: "Doğru bilgiye, doğru rotadan."
// Footer her temada koyu kalır (kurumsal mühür gibi), wordmark hep krem.

export default function SiteFooter() {
  return (
    <footer className="rt-footer">
      <div className="rt-container rt-footer-grid">
        <div>
          <img
            src="/marka/wordmark-light.png"
            srcSet="/marka/wordmark-light.png 1x, /marka/wordmark-light-2x.png 2x"
            alt="Yeni Rota Eğitim Kurumları"
            style={{ height: 84, width: 'auto', display: 'block', marginBottom: 22 }}
          />
          <p style={{ margin: 0, maxWidth: 320, fontSize: '13.5px', lineHeight: 1.7, color: '#b8a9c2', textWrap: 'pretty' }}>
            Yeni Rota Eğitim Kurumları — Millî Eğitim Bakanlığı ruhsatlı özel öğretim kurumu.
            Kişisel gelişim, sağlık ve psikoloji alanlarında sertifikalı programlar.
          </p>
        </div>

        <div>
          <div className="rt-footer-head">İletişim</div>
          <div className="rt-footer-col">
            <span>
              Ziya Gökalp Caddesi, Arıkoğlu İş Merkezi
              <br />
              No: 21/8 Çankaya / Ankara
            </span>
            <a href="tel:+903122857682">+90 312 285 76 82</a>
            <a href="mailto:info@yenirotaegitim.com">info@yenirotaegitim.com</a>
          </div>
        </div>

        <div>
          <div className="rt-footer-head">Kurumsal</div>
          <div className="rt-footer-col">
            <a href="/hakkimizda">Hakkımızda</a>
            <a href="/kvkk">KVKK aydınlatma metni</a>
            <a href="/gizlilik-politikasi">Gizlilik politikası</a>
            <a href="/iletisim">İletişim</a>
          </div>
        </div>

        <div>
          <div className="rt-footer-head">Sosyal medya</div>
          <div className="rt-social">
            <a href="https://www.instagram.com/rotaedu.tr/" aria-label="Instagram" rel="noopener" target="_blank">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
              </svg>
            </a>
            <a href="https://www.youtube.com/channel/UCT8uZhW9NDLPyy27zsm0UYQ" aria-label="YouTube" rel="noopener" target="_blank">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="rt-footer-bottom">
        <div className="rt-container rt-footer-bottom-inner">
          <span>© 2026 Yeni Rota Eğitim Kurumları. Tüm hakları saklıdır.</span>
          <span className="rt-motto">Doğru bilgiye, doğru rotadan.</span>
        </div>
        <div className="rt-container rt-legal">
          Rota Aile Sağlığı ve Danışmanlığı Eğitim Hizmetleri Test Uygulamaları Psikoteknik Ticaret Limited Şirketi
        </div>
      </div>
    </footer>
  );
}
