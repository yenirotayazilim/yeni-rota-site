// src/app/api/contact.ts
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json()

    const transporter = nodemailer.createTransport({
      host: 'mail.yenirotaegitim.com',
      port: 465,
      secure: true, // SSL
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Site İletişim" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // Başvuruların gideceği adres
      subject: 'Yeni İletişim Formu Mesajı',
      html: `
        <p><b>Ad Soyad:</b> ${name}</p>
        <p><b>E-posta:</b> ${email}</p>
        <p><b>Telefon:</b> ${phone}</p>
        <p><b>Mesaj:</b><br/>${message}</p>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    console.error(err)
    const message = err instanceof Error ? err.message : 'Bir hata oluştu.'
    return NextResponse.json({ ok: false, message }, { status: 500 })
  }
}
