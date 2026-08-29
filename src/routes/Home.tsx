import { CategoryGrid } from '@/components/home/CategoryGrid'
import { About, Conditions, FinalCta } from '@/components/home/ClosingSections'
import { Hero } from '@/components/home/Hero'

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <About />
      <Conditions />
      <FinalCta />
    </>
  )
}
