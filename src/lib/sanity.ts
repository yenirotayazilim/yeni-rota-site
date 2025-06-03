import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: 'fbzfxq12',         // 👈 kendi project ID’ni yaz (sanity.json'da yazar)
  dataset: 'production',
  apiVersion: '2023-01-01',      // sabit kalabilir
  useCdn: true
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
