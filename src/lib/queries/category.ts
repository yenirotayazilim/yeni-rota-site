import { client } from '@/lib/sanity'

export const getAllCategoriesQuery = `
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current
  }
`

export async function getAllCategories() {
  return await client.fetch(
    getAllCategoriesQuery,
    {},
    { cache: 'no-store' } // 🚀 Bu satır eklendi!
  )
}
