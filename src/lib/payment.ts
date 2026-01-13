import crypto from 'crypto';

// 1. Tip tanımını yapıyoruz
interface ZiraatPaymentParams {
  amount: string;
  clientId: string;
  failUrl: string;
  hashAlgorithm: string;
  inst: string;
  okUrl: string;
  oid: string;
  rnd: string;
  storetype: string;
  trantype: string;
  [key: string]: string; // Diğer string anahtarlara izin ver
}

export function generateZiraatHash(params: ZiraatPaymentParams, storeKey: string): string {
  // Ziraat'in beklediği alfabetik ve özel sıralama:
  // 1. Kural: Amount en başta olmalı.
  // 2. Kural: Parametreler A'dan Z'ye sıralanmalı.
  // 3. Kural: Storekey her zaman en sonda yer almalı.

  const hashString = 
    params.amount +             // Amount en başta
    params.clientId +           // A'dan Z'ye sıralama devam ediyor
    params.failUrl + 
    params.hashAlgorithm +      // "ver3"
    params.inst +               // Taksit yoksa boş string
    params.okUrl + 
    params.oid + 
    params.rnd + 
    params.storetype + 
    params.trantype + 
    storeKey;                   // Storekey en sonda

  return crypto
    .createHash('sha512')
    .update(hashString)
    .digest('base64');
}