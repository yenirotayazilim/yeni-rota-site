import { client } from "@/lib/sanity";

// Tüm eğitimleri getir
export async function getAllEducations() {
  return await client.fetch(
    `*[_type == "education"]{
      _id,
      title,
      description,
      duration,
      slug,
      instructor->{ name },
      category->{ title, "slug": slug.current },
      thumbnail { asset -> { url } }
    }`,
    {},
    { cache: 'no-store' } // 🚀 Bu satır eklendi!
  );
}

// Slug’a göre eğitim getir
export async function getEducationBySlug(slug: string) {
  return await client.fetch(
    `*[_type == "education" && slug.current == $slug][0]{
      _id,
      title,
      description,
      duration,
      slug,
      content,
      instructor->{ name },
      category->{ title, "slug": slug.current },
      thumbnail { asset -> { url } }
    }`,
    { slug },
    { cache: 'no-store' } // 🚀 Buraya da!
  );
}

// Kategoriye göre eğitim getir
export async function getEducationsByCategorySlug(categorySlug: string) {
  return await client.fetch(
    `*[_type == "education" && category->slug.current == $slug]{
      _id,
      title,
      description,
      duration,
      slug,
      instructor->{ name },
      category->{ title, "slug": slug.current },
      thumbnail { asset -> { url } }
    }`,
    { slug: categorySlug },
    { cache: 'no-store' } // 🚀 Buraya da!
  );
}

// Sadece anasayfa için işaretli eğitimleri getir
export async function getHomepageEducations() {
  return await client.fetch(
    `*[_type == "education" && showOnHome == true]{
      _id,
      title,
      description,
      duration,
      slug,
      instructor->{ name },
      category->{ title, "slug": slug.current },
      thumbnail { asset -> { url } }
    }`,
    {},
    { cache: 'no-store' } // 🚀 Buraya da!
  );
}