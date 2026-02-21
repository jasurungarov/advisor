import Hero from './_components/hero'
import Features from './_components/features'
import HowIt from './_components/how-it'
import Footer from './_components/footer'
import { auth } from '@/lib/auth'
import Header from './_components/header'

export default async function HomePage() {
  // SERVER-SIDE AUTH
  let session = null
  try {
    session = await auth()
  } catch {
    session = null
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-brand-50 via-white to-brand-100 dark:from-[#021f15] dark:via-[#021f15] dark:to-[#0b3d2e]">
      {/* Header (Client) */}
      <Header session={session} />

      {/* Page sections */}
      <Hero />
      <Features />
      <HowIt />
      <Footer />
    </div>
  )
}