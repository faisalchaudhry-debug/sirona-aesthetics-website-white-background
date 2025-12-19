import HeroSection from '@/components/homepage/HeroSection'
import TrustIndicators from '@/components/homepage/TrustIndicators'
import ProductShowcase from '@/components/homepage/ProductShowcase'
import ScientificFoundation from '@/components/homepage/ScientificFoundation'
import TrainingAcademy from '@/components/homepage/TrainingAcademy'
import ContactSection from '@/components/homepage/ContactSection'
import LatestBlogs from '@/components/LatestBlogs'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans selection:bg-accent selection:text-white overflow-x-hidden bg-[#2D2654]">

      <HeroSection />

      <TrustIndicators />

      <ProductShowcase />

      <ScientificFoundation />

      <TrainingAcademy />

      <LatestBlogs />

      <ContactSection />

    </div>
  )
}
