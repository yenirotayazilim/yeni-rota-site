import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Hem GET hem POST destekleyelim
export async function GET(request: NextRequest) {
  return NextResponse.redirect(
    new URL('/odeme/basarisiz?ErrMsg=InvalidMethod', request.url),
    303
  );
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    const isSuccess =
      data.mdStatus === '1' &&
      data.Response === 'Approved';

    // =============================
    // ✅ BAŞARILI ÖDEME → MAIL GÖNDER
    // =============================
    if (isSuccess) {
      try {
        const transporter = nodemailer.createTransport({
          host: 'mail.yenirotaegitim.com',
          port: 465,
          secure: true,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        const tutar = data.amount || "0";
        const adSoyad = data.Faturafirma || "Değerli Öğrencimiz";
        const email = String(data.Email || "");


        await transporter.sendMail({
          from: `"Yeni Rota Eğitim" <${process.env.SMTP_USER}>`,
          to: email,
          subject: "Ödemeniz Başarıyla Alındı",
          html: `
          <div style="font-family: Arial; max-width:600px; margin:auto">
            <h2>Ödemeniz Başarıyla Alındı 🎉</h2>

            <p>Sayın <b>${adSoyad}</b>,</p>

            <p>Yeni Rota Eğitim ödemeniz başarıyla tamamlanmıştır.</p>

            <table style="width:100%; border:1px solid #ddd; padding:10px">
              <tr>
                <td><b>İşlem No:</b></td>
                <td>${data.oid}</td>
              </tr>
              <tr>
                <td><b>Tutar:</b></td>
                <td>${tutar} ₺</td>
              </tr>
              <tr>
                <td><b>Tarih:</b></td>
                <td>${new Date().toLocaleString("tr-TR")}</td>
              </tr>
              <tr>
                <td><b>Provizyon:</b></td>
                <td>${data.AuthCode || "-"}</td>
              </tr>
            </table>

            <p>
              Bu mail dekont niteliğindedir.<br/>
              Eğitim ekibimiz en kısa sürede sizinle iletişime geçecektir.
            </p>

            <hr/>

            <small>
              🔒 Güvenli Ödeme<br/>
              • 256-bit SSL ile şifrelenmiş işlem<br/>
              • Ziraat Bankası 3D Secure altyapısı<br/>
              • Kart bilgileriniz sistemimizde saklanmaz<br/>
              • Ödeme bankanın güvenli sayfasında gerçekleşir
            </small>
          </div>
          `,
        });

      } catch (mailError) {
        console.log("📩 Mail gönderilemedi ama ödeme başarılı:", mailError);
      }

      return NextResponse.redirect(
        new URL('/odeme/basarili', request.url),
        303
      );
    }

    // =============================
    // ❌ BAŞARISIZ ÖDEME
    // =============================
    const hataMesaji =
      data.ErrMsg ||
      data.mdErrorMsg ||
      "Ödeme reddedildi";

    return NextResponse.redirect(
      new URL(
        `/odeme/basarisiz?ErrMsg=${encodeURIComponent(String(hataMesaji))}`,
        request.url
      ),
      303
    );

  } catch {
    console.error("Ödeme callback işleme hatası");

    return NextResponse.redirect(
      new URL('/odeme/basarisiz?ErrMsg=SistemselHata', request.url),
      303
    );
  }
}
