'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { TrendingUp, MapPin, BarChart3, ArrowRight } from 'lucide-react'

const opportunities = [
  {
    location: 'Mohali IT Park Area',
    type: 'Commercial',
    expectedReturn: '15-18%',
    priceRange: '50L – 2Cr',
    highlight: 'Near Infosys & Wipro campus',
    tag: '🔥 Hot Zone',
  },
  {
    location: 'New Chandigarh',
    type: 'Residential Villa',
    expectedReturn: '12-15%',
    priceRange: '1.5Cr – 5Cr',
    highlight: 'GMADA approved township',
    tag: '⭐ Premium',
  },
  {
    location: 'Zirakpur Airport Road',
    type: 'Commercial Shop',
    expectedReturn: '18-22%',
    priceRange: '30L – 1Cr',
    highlight: 'High footfall, highway frontage',
    tag: '💎 Best ROI',
  },
  {
    location: 'Kharar – Landran Road',
    type: 'Residential Plot',
    expectedReturn: '20-25%',
    priceRange: '15L – 60L',
    highlight: 'Upcoming metro corridor',
    tag: '📈 High Growth',
  },
]

export function InvestmentSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-gold-600 text-sm font-semibold tracking-widest uppercase mb-2">Smart Investments</p>
          <h2 className="section-heading text-charcoal-900 mb-4">Top Investment Hotspots</h2>
          <div className="gold-divider mx-auto mb-4" />
          <p className="section-subheading mx-auto text-center">
            Expertly curated investment zones in Tricity with the highest projected returns in 2024–2025.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {opportunities.map((opp, i) => (
            <motion.div
              key={opp.location}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative flex gap-4 p-6 border border-gray-100 rounded-xl hover:border-gold-300 hover:shadow-lg transition-all duration-300 group bg-white"
            >
              <div className="w-12 h-12 bg-gold-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-gold-100 transition-colors">
                <BarChart3 className="w-6 h-6 text-gold-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-heading font-semibold text-charcoal-900">{opp.location}</h3>
                  <span className="text-xs font-semibold bg-gold-50 text-gold-700 px-2 py-1 rounded-full whitespace-nowrap">{opp.tag}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{opp.type} · {opp.highlight}</span>
                </div>
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Price Range</p>
                    <p className="font-semibold text-charcoal-800 text-sm">₹{opp.priceRange}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Expected Returns</p>
                    <p className="font-semibold text-green-600 text-sm flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {opp.expectedReturn} p.a.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/investment" className="inline-flex items-center gap-2 btn-luxury px-8 py-4 rounded-lg">
            Explore All Investment Opportunities
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
