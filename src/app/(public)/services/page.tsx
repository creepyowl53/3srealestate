import Link from 'next/link'
import { Home, Building2, Globe, Calculator, FileText, Handshake, Camera, BarChart3 } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Real Estate Services | 3S Real Estate',
  description: 'Comprehensive real estate services — buy, sell, rent, invest, NRI advisory, home loans, property management and more in Tricity.',
}

const services = [
  { icon: Home, title: 'Residential Properties', desc: 'Find your dream home — flats, villas, independent houses, and builder floors across Tricity.', href: '/properties?type=RESIDENTIAL', cta: 'Browse Homes' },
  { icon: Building2, title: 'Commercial Properties', desc: 'Prime office spaces, shops, showrooms, and warehouses in Mohali, Chandigarh & Zirakpur.', href: '/properties?type=COMMERCIAL', cta: 'View Commercial' },
  { icon: Globe, title: 'NRI Investment Services', desc: 'Dedicated NRI desk — FEMA compliance, POA assistance, remote property management.', href: '/nri', cta: 'NRI Corner' },
  { icon: BarChart3, title: 'Investment Advisory', desc: 'Expert guidance on highest-ROI zones, market timing, and portfolio building.', href: '/investment', cta: 'Get Advisory' },
  { icon: Calculator, title: 'Home Loan Assistance', desc: 'Tie-ups with all major banks. Best rate guarantee, fast processing, minimal documentation.', href: '/calculator', cta: 'Check EMI' },
  { icon: FileText, title: 'Legal & Documentation', desc: 'Title verification, RERA check, registration, and full legal assistance for every transaction.', href: '/contact', cta: 'Get Help' },
  { icon: Camera, title: 'Property Valuation', desc: 'Accurate market valuation reports by certified valuers. Know the real worth of your property.', href: '/contact', cta: 'Get Valuation' },
  { icon: Handshake, title: 'Property Management', desc: 'End-to-end rental management for NRIs and investors. Tenant screening, rent collection, maintenance.', href: '/contact', cta: 'Learn More' },
]

export default function ServicesPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-charcoal-950 py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold-400 text-sm uppercase tracking-widest mb-2">What We Offer</p>
          <h1 className="text-4xl font-heading font-bold text-white mb-2">Our Services</h1>
          <div className="h-1 w-16 bg-gold-gradient rounded mx-auto mb-4" />
          <p className="text-white/60 max-w-xl mx-auto">End-to-end real estate services under one roof. From search to registration — we handle it all.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(({ icon: Icon, title, desc, href, cta }) => (
            <div key={title} className="bg-white rounded-xl p-6 border border-gray-100 hover:border-gold-200 hover:shadow-lg transition-all group flex flex-col">
              <div className="w-12 h-12 bg-gold-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gold-100 transition-colors">
                <Icon className="w-6 h-6 text-gold-600" />
              </div>
              <h3 className="font-heading font-semibold text-charcoal-900 mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">{desc}</p>
              <Link href={href} className="text-gold-600 text-sm font-semibold hover:text-gold-700 transition-colors">
                {cta} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
