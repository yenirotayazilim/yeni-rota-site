'use client'
import { useEffect } from 'react'

declare global {
  interface Window {
    $crisp: unknown[]  // Dizi olduğu biliniyor ama içeriği belirsiz
    CRISP_WEBSITE_ID: string
  }
}

export default function CrispScript() {
  useEffect(() => {
    const crispId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID
    if (!crispId) return

    // Türler artık tanımlı: string ve array
    window.$crisp = []
    window.CRISP_WEBSITE_ID = crispId

    const script = document.createElement('script')
    script.src = 'https://client.crisp.chat/l.js'
    script.async = true
    document.head.appendChild(script)
  }, [])

  return null
}
