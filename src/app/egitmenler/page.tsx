import { getAllInstructors } from '@/lib/queries/instructor'
import EgitmenlerClient from '@/components/EgitmenlerClient'

export default async function EgitmenlerPage() {
  const egitmenler = await getAllInstructors()
  return <EgitmenlerClient egitmenler={egitmenler} />
}
