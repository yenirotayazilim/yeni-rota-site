import { client } from "@/lib/sanity"

export async function getAllInstructors() {
  return await client.fetch(
    `*[_type == "instructor"]{
      _id,
      name,
      slug,
      photo {
        asset -> {
          url
        }
      }
    }`,
    {},
    { cache: 'no-store' } // Buraya dikkat!
  )
}

export async function getInstructorBySlug(slug: string) {
  return await client.fetch(
    `*[_type == "instructor" && slug.current == $slug][0]{
      _id,
      name,
      bio,
      photo {
        asset -> {
          url
        }
      },
      cv {
        asset -> {
          url
        }
      }
    }`,
    { slug },
    { cache: 'no-store' } // Buraya da!
  )
}

// 🟢 YENİ: Anasayfaya eklenecek eğitmenleri getir
export async function getHomepageInstructors() {
  return await client.fetch(
    `*[_type == "instructor" && showOnHome == true]{
      _id,
      name,
      slug,
      photo {
        asset -> {
          url
        }
      }
    }`,
    {},
    { cache: 'no-store' }
  )
}
