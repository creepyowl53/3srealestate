import Link from 'next/link'
import { TrendingUp, MapPin, BarChart3, ArrowRight, Phone } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Investment Advisory | Best ROI Properties | 3S Real Estate',
  description: 'Expert investment advisory for Mohali, Chandigarh & Zirakpur real estate. Highest ROI zones, market analysis, and wealth-building strategies.',
}

const hotZones = [
  { area: 'Mohali Sector 70-74 IT Zone', roi: '15–18%', type: 'Commercial/Residential', reason: 'IT hub expansion, metro planned', tag: '🔥 Ultra Hot' },
  { area: 'New Chandigarh (Mullanpur)', roi: '12–15%', type: 'Luxury Residential', reason: 'GMADA Smart City project', tag: '⭐ Premium' },
  { area: 'Zirakpur – Airport Road', roi: '18–22%', type: 'Commercial', reason: 'Highway frontage, high footfall', tag: '💎 Best ROI' },
  { area: 'Kharar – Landran Road', roi: '20–25%', type: 'Plot/Residential', reason: 'Metro corridor, upcoming development', tag: '📈 Growth' },
  { area: 'Aerocity Mohali', roi: '14–18%', type: 'Commercial/Office', reason: 'Airport proximity, IT/pharma belt', tag: '🚀 Rising' },
  { area: 'Chandigarh Sector 63-65', roi: '10–13%', type: 'Residential Flat', reason: 'Established IT hub, great connectivity', tag: '🏢 Stable' },
]

export default function InvestmentPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-charcoal-950 py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold-400 text-sm uppercase tracking-widest mb-2">Smart Investing</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Investment Advisory</h1>
          <div className="h-1 w-16 bg-gold-gradient rounded mx-auto mb-6" />
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Maximize your wealth with expert real estate investment guidance in Tricity's highest-ROI zones.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-center text-charcoal-900 mb-3">Top Investment Hotspots 2025</h2>
          <p className="text-center text-gray-500 mb-10">Expert-curated zones with highest projected appreciation</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotZones.map((zone) => (
              <div key={zone.area} className="bg-white border border-gray-100 rounded-xl p-6 hover:border-gold-300 hover:shadow-lg transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 bg-gold-50 rounded-xl flex items-center justify-center group-hover:bg-gold-100 transition-colors">
                    <BarChart3 className="w-5 h-5 text-gold-600" />
                  </div>
                  <span className="text-xs font-semibold bg-charcoal-950 text-white px-2.5 py-1 rounded-full">{zone.tag}</span>
                </div>
                <h3 className="font-heading font-semibold text-charcoal-900 mb-1">{zone.area}</h3>
                <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{zone.type}</span>
                </div>
                <p className="text-xs text-gray-500 mb-4 italic">"{zone.reason}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">Expected ROI p.a.</p>
                    <p className="text-xl font-heading font-bold text-green-600">{zone.roi}</p>
                  </div>
                  <Link href={`/properties?search=${encodeURIComponent(zone.area.split(' ')[0])}`}
                    className="flex items-center gap-1 text-gold-600 text-sm font-semibold hover:text-gold-700 group/link">
                    View <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market outlook */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-heading font-bold text-center text-charcoal-900 mb-10">Tricity Market Outlook 2025</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { metric: '18%', label: 'Average price appreciation in Mohali (2024)', trend: '+' },
              { metric: '₹8,500', label: 'Average price per sqft in premium zones', trend: '+' },
              { metric: '65%', label: 'Increase in luxury villa demand (YoY)', trend: '+' },
            ].map(({ metric, label, trend }) => (
              <div key={label} className="bg-white rounded-xl p-6 text-center border border-gray-100 shadow-sm">
                <p className="text-4xl font-heading font-bold text-gold-600 mb-2">{metric}</p>
                <p className="text-gray-500 text-sm">{label}</p>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl p-8 border border-gray-100">
            <h3 className="font-heading font-semibold text-xl text-charcoal-900 mb-4">Why Tricity is India's Hottest Real Estate Market</h3>
            <ul className="space-y-3 text-gray-600 text-sm">
              {[
                'Mohali IT hub — home to 500+ IT companies including Infosys, Wipro, and TCS.',
                'New Chandigarh (Mullanpur) GMADA Smart City project attracting massive investment.',
                'Planned Metro connectivity between Chandigarh, Mohali, and Zirakpur.',
                'Chandigarh International Airport expansion boosting Aerocity real estate.',
                'Punjab government\'s investor-friendly policies driving commercial growth.',
                'Limited land availability in Chandigarh pushing demand to surrounding areas.',
              ].map((point) => (
                <li key={point} className="flex gap-2"><span className="text-gold-500 font-bold mt-0.5">→</span>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-charcoal-950">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">Get a Free Investment Consultation</h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">Our investment advisors will analyze your goals and recommend the best-fit properties for maximum returns.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+919876543210" className="flex items-center gap-2 btn-luxury px-8 py-3.5 rounded-lg font-semibold">
              <Phone className="w-5 h-5" /> Call an Advisor
            </a>
            <Link href="/contact" className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-white/20 transition-colors">
              Send Inquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
