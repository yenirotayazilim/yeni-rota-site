import { client } from '@/lib/sanity'

export async function getContactInfo() {
  return await client.fetch(
    `*[_type == "contact"][0]{
      offices[]{
        name,
        address,
        phone
      },
      formNote
    }`,
    {},
    { cache: 'no-store' } // 🚀 Buraya eklendi!
  )
}
