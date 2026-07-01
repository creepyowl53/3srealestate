import { Suspense } from 'react'
import { HeroSection } from '@/components/home/hero-section'
import { FeaturedProperties } from '@/components/home/featured-properties'
import { WhyChooseUs } from '@/components/home/why-choose-us'
import { TestimonialsSection } from '@/components/home/testimonials'
import { BlogsSection } from '@/components/home/blogs-section'
import { StatsSection } from '@/components/home/stats-section'
import { CTASection } from '@/components/home/cta-section'
import { FAQSection } from '@/components/home/faq-section'
import { InvestmentSection } from '@/components/home/investment-section'
import { LeadCapturePopup } from '@/components/lead/lead-capture-popup'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { FloatingActions } from '@/components/shared/floating-actions'
import { getLiveConfig } from '@/lib/site-config'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '3S Real Estate | Premium Properties in Mohali, Chandigarh & Zirakpur',
  description:
    'Find luxury villas, flats, commercial spaces & investment plots in Mohali, Chandigarh, Zirakpur & New Chandigarh. Smart • Secure • Sophisticated real estate solutions.',
  openGraph: {
    title: '3S Real Estate | Smart • Secure • Sophisticated',
    description: 'Premium properties in Tricity region. Luxury villas, flats, commercial spaces & investment plots.',
  },
}

export default async function HomePage() {
  const config = await getLiveConfig()

  return (
    <>
      <Navbar config={config} />
      <main>
        <HeroSection />
        <StatsSection />
        <Suspense fallback={<div className="h-96 bg-gray-50" />}>
          <FeaturedProperties />
        </Suspense>
        <WhyChooseUs />
        <InvestmentSection />
        <Suspense fallback={<div className="h-64 bg-white" />}>
          <TestimonialsSection />
        </Suspense>
        <Suspense fallback={<div className="h-64 bg-gray-50" />}>
          <BlogsSection />
        </Suspense>
        <FAQSection />
        <CTASection />
      </main>
      <Footer config={config} />
      <FloatingActions config={config} />
      <LeadCapturePopup />
    </>
  )
}