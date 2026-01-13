import crypto from 'crypto';

export function generateZiraatHash(params: any, storeKey: string) {
  // 1. Kural: Amount en başta olmalı.
  // 2. Kural: Parametreler A'dan Z'ye sıralanmalı.
  // 3. Kural: Storekey en sonda olmalı.

  // Alfabetik sıraya göre dizilmiş değerler dizisi
  const hashString = 
    params.amount +          // Amount başta (Örn: 10.50)
    params.clientId +        // Alfabetik devam ediyor
    params.failUrl + 
    params.hashAlgorithm +   // Değer: "ver3"
    params.inst +            // Taksit yoksa boş string
    params.okUrl + 
    params.oid + 
    params.rnd + 
    params.storetype + 
    params.trantype + 
    storeKey;                // Storekey sonda

  return crypto
    .createHash('sha512')
    .update(hashString)
    .digest('base64');
}