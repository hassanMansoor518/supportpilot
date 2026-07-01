import { Navbar } from "@/components/sections/Navbar"
import { Hero } from "@/components/sections/Hero"
import { TrustedBy } from "@/components/sections/TrustedBy"
import { FeaturesGrid } from "@/components/sections/FeaturesGrid"
import { PlatformFeatures } from "@/components/sections/PlatformFeatures"
import { HowItWorks } from "@/components/sections/HowItWorks"
import { Analytics } from "@/components/sections/Analytics"
import { Testimonials } from "@/components/sections/Testimonials"
import { Pricing } from "@/components/sections/Pricing"
import { CTA } from "@/components/sections/CTA"
import { Footer } from "@/components/sections/Footer"

export default function Home() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-10 xl:px-12 min-h-screen bg-background font-sans dark text-foreground">
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <FeaturesGrid />
        <PlatformFeatures />
        <HowItWorks />
        <Analytics />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
