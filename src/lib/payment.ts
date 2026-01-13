import crypto from 'crypto';

interface ZiraatPaymentParams {
  amount: string;
  clientid: string;
  currency: string;
  failUrl: string;
  hashalgorithm: string;
  inst: string;      // Eklendi: Taksit alanı
  islemtipi: string;
  lang: string;
  oid: string;
  okUrl: string;
  rnd: string;       // Eklendi: Random değer
  storetype: string;
  [key: string]: string;
}

export function generateZiraatHash(params: ZiraatPaymentParams, storeKey: string): string {
  const hashString = 
    params.amount +          // 1. Amount
    params.clientid +        // c...
    params.currency +        // cu...
    params.failUrl +         // f...
    params.hashalgorithm +   // h...
    params.inst +            // i... (Boş string dahi olsa eklenmeli)
    params.islemtipi +       // is...
    params.lang +            // l...
    params.oid +             // o...
    params.okUrl +           // ok...
    params.rnd +             // r...
    params.storetype +       // s...
    storeKey;                // 3. StoreKey (Sonda)

  // Ziraat ver3 genellikle sha512 kullanır
  return crypto.createHash('sha512').update(hashString).digest('base64');
}