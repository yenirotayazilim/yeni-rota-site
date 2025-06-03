import { client } from '@/lib/sanity'

export async function getTestimonials() {
  return await client.fetch(
    `*[_type == "testimonial" && visible == true]{
      _id,
      isim,
      metin
    }`,
    {},
    { cache: 'no-store' } // 🚀 Buraya eklendi!
  )
}
