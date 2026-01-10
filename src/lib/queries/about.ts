import { client } from '@/lib/sanity'

export async function getAboutPage() {
  return await client.fetch(
    `*[_type == "about"][0]{
      shortIntro,
      "sliderMediaUrl": sliderMedia.asset->url,
      "sliderMediaType": sliderMedia.asset->mimeType,
      description,
      mission,
      vision
    }`,
    {},
    { cache: 'no-store' } // 🚀 Buraya eklendi!
  )
}
