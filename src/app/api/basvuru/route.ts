import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email, egitim } = await req.json()

    const transporter = nodemailer.createTransport({
      host: 'mail.yenirotaegitim.com',
      port: 465,
      secure: true, // SSL
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },

    })

    const mailHTML = `
      <h2>Yeni Eğitim Başvurusu</h2>
      <p><strong>Ad Soyad:</strong> ${name}</p>
      <p><strong>Telefon:</strong> ${phone}</p>
      <p><strong>E-Posta:</strong> ${email || '(belirtilmedi)'}</p>
      <p><strong>Başvurulan Eğitim:</strong> ${egitim || '(belirtilmedi)'}</p>
    `

    await transporter.sendMail({
      from: `"Yeni Rota Başvuru" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // Başvuru e-postası nereye gidecekse burayı değiştir
      subject: 'Yeni Eğitim Başvurusu',
      html: mailHTML,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Mail gönderimi başarısız:', err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
