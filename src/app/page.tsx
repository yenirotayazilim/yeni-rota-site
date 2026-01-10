export const dynamic = "force-dynamic"
import { getHomepageEducations } from '@/lib/queries/education'
import { getHomepageInstructors } from '@/lib/queries/instructor'
import { getAboutPage } from '@/lib/queries/about'
import { getTestimonials } from '@/lib/queries/testimonial'
import HeroSlider from '@/components/HeroSlider'
import HomeClient from '@/components/HomeClient'

export default async function HomePage() {
  // 🔴 Anasayfada gösterilecek verileri çek
  const egitimler = await getHomepageEducations()
  const egitmenler = await getHomepageInstructors()
  const yorumlar = await getTestimonials()
  const about = await getAboutPage()

  // HeroSlider about datasını props ile alacak
  return (
    <>
      <HeroSlider about={about} />
      <HomeClient
        egitimler={egitimler}
        egitmenler={egitmenler}
        yorumlar={yorumlar}
      />
    </>
  )
}
