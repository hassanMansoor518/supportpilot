import { Navbar } from "@/src/components/sections/Navbar"
import { Hero } from "@/src/components/sections/Hero"
import { TrustedBy } from "@/src/components/sections/TrustedBy"
import { FeaturesGrid } from "@/src/components/sections/FeaturesGrid"
import { PlatformFeatures } from "@/src/components/sections/PlatformFeatures"
import { HowItWorks } from "@/src/components/sections/HowItWorks"
import { Analytics } from "@/src/components/sections/Analytics"
import { Testimonials } from "@/src/components/sections/Testimonials"
import { Pricing } from "@/src/components/sections/Pricing"
import { CTA } from "@/src/components/sections/CTA"
import { Footer } from "@/src/components/sections/Footer"

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
