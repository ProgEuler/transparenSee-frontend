import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Highlights } from '@/components/Highlights'
import { Footer } from '@/components/Footer'
import CardGrid from '@/components/Tender'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <CardGrid />
      <Highlights />
      <Footer />
    </main>
  )
}
