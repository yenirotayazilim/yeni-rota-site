export const revalidate = 0
import { getAllEducations } from '@/lib/queries/education'
import EgitimlerClient from '@/components/EgitimlerClient'
import { getAllCategories } from '@/lib/queries/category'

export default async function EgitimlerPage() {
  const egitimler = await getAllEducations()
  const kategoriler = await getAllCategories()

  return <EgitimlerClient egitimler={egitimler} kategoriler={kategoriler} />
}
