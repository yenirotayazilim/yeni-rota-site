import { NextResponse } from 'next/server';
import { generateZiraatHash } from '@/lib/payment';

export async function POST(req: Request) {
  const body = await req.json();
  const storeKey = process.env.ZIRAAT_STORE_KEY; // .env.local'den al
  const rnd = Date.now().toString();

  const paymentParams = {
    amount: body.amount, 
    clientId: "123456", // Size verilen ID
    failUrl: "http://localhost:3000/api/odeme/callback",
    hashAlgorithm: "ver3",
    inst: "", // Taksit yoksa boş bırakılır
    okUrl: "http://localhost:3000/api/odeme/callback",
    oid: `SIP-${Date.now()}`,
    rnd: rnd,
    storetype: "3d_pay",
    trantype: "Auth",
  };

  const hash = generateZiraatHash(paymentParams, storeKey!);

  // Banka formuna eklenecek ama hash'e girmeyecek değerler
  return NextResponse.json({ 
    ...paymentParams, 
    hash,
    encoding: "UTF-8" // Hash'e dahil edilmez
  });
}