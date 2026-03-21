import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email, egitim } = await req.json()

    const res = await fetch('https://ch9qk2ou.rpcld.net/webhook/site-basvuru', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, email, egitim }),
    })

    if (!res.ok) throw new Error('Webhook isteği başarısız')

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Webhook gönderimi başarısız:', err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
