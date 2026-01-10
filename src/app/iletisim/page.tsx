import { getContactInfo } from '@/lib/queries/contact'
import ContactSection from '@/components/ContactForm'

export default async function IletisimPage() {
  const data = await getContactInfo()

  return (
    <ContactSection
      offices={data?.offices || []}
      socialLinks={data?.socialLinks}
      formNote={data?.formNote}
    />
  )
}
