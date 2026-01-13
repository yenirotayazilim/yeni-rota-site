import crypto from 'crypto';

interface ZiraatPaymentParams {
  amount: string;
  clientid: string;
  currency: string;
  failUrl: string;
  hashalgorithm: string;
  islemtipi: string;
  lang: string;
  oid: string;
  okUrl: string;
  storetype: string;
  [key: string]: string;
}

export function generateZiraatHash(params: ZiraatPaymentParams, storeKey: string): string {
  // Sıralama: Amount + Diğerleri (A-Z) + StoreKey
  const hashString = 
    params.amount +          // 1. Amount Başta
    params.clientid +        // 2. Alfabetik Sıra
    params.currency + 
    params.failUrl + 
    params.hashalgorithm + 
    params.islemtipi + 
    params.lang + 
    params.oid + 
    params.okUrl + 
    params.storetype + 
    storeKey;                // 3. StoreKey Sonda

  return crypto.createHash('sha512').update(hashString).digest('base64');
}