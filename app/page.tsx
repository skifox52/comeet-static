import HeroSection from "@/components/hero-section"
import RsvpSection from "@/components/rsvp-section"
import ProgramSection from "@/components/program-section"
import LocationsSection from "@/components/locations-section"
import InfoSection from "@/components/info-section"
import Footer from "@/components/footer"

export default function WeddingPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <HeroSection />
      <RsvpSection />
      <ProgramSection />
      <LocationsSection />
      <InfoSection />
      <Footer />
    </main>
  )
}
