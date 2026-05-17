import Link from 'next/link'
import { Globe, FileText, Shield, TrendingUp, Phone, MessageCircle } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NRI Investment in Chandigarh Tricity | 3S Real Estate',
  description: 'Complete guide for NRIs to invest in real estate in Mohali, Chandigarh & Zirakpur. FEMA compliance, POA, repatriation guidance from expert NRI desk.',
}

const steps = [
  { step: '01', title: 'Initial Consultation', desc: 'Video call or WhatsApp consultation with our NRI specialist. Understand your goals, budget, and timeline.' },
  { step: '02', title: 'Property Shortlisting', desc: 'We shortlist verified properties matching your criteria and send detailed reports, photos, and videos.' },
  { step: '03', title: 'Legal Due Diligence', desc: 'Our legal team verifies title, RERA registration, encumbrances, and all property documents.' },
  { step: '04', title: 'Booking & POA', desc: 'Assist with Power of Attorney creation, booking payment via NRE/NRO account per FEMA guidelines.' },
  { step: '05', title: 'Loan Assistance', desc: 'Help arrange NRI home loan from leading banks at the best rates. All paperwork handled.' },
  { step: '06', title: 'Registration & Possession', desc: 'Coordinate registration, handover, and ongoing property management if required.' },
]

export default function NRIPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-charcoal-950 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/30 rounded-full px-4 py-1.5 mb-6">
            <Globe className="w-4 h-4 text-gold-400" />
            <span className="text-gold-300 text-sm">Dedicated NRI Desk</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">NRI Investment in Tricity</h1>
          <div className="h-1 w-16 bg-gold-gradient rounded mx-auto mb-6" />
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Invest confidently in Mohali, Chandigarh & Zirakpur from anywhere in the world.
            Full FEMA compliance, transparent transactions, trusted by 200+ NRI families.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a href="https://wa.me/919876543210?text=Hi! I am an NRI looking to invest in Tricity real estate."
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-600 transition-colors">
              <MessageCircle className="w-5 h-5" /> WhatsApp NRI Desk
            </a>
            <a href="tel:+919876543210" className="flex items-center gap-2 bg-white/10 border border-white/20 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/20 transition-colors">
              <Phone className="w-5 h-5" /> Schedule a Call
            </a>
          </div>
        </div>
      </section>

      {/* Why invest */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-center text-charcoal-900 mb-10">Why NRIs Prefer Tricity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: TrendingUp, title: '15–25% Annual Appreciation', desc: 'Tricity is one of India\'s fastest growing real estate markets.' },
              { icon: Shield, title: 'RERA Protected', desc: 'All projects RERA registered. Your investment is legally protected.' },
              { icon: Globe, title: 'Easy Repatriation', desc: 'Full repatriation of sale proceeds through NRE accounts under FEMA.' },
              { icon: FileText, title: 'Hassle-Free Documentation', desc: 'Our team handles all paperwork from POA to registration remotely.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all text-center">
                <div className="w-12 h-12 bg-gold-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-gold-600" />
                </div>
                <h3 className="font-heading font-semibold text-charcoal-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step by step */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-heading font-bold text-center text-charcoal-900 mb-10">How It Works</h2>
          <div className="space-y-4">
            {steps.map((step) => (
              <div key={step.step} className="flex gap-6 p-6 bg-white border border-gray-100 rounded-xl hover:border-gold-200 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-gold-gradient rounded-xl flex items-center justify-center shrink-0 shadow-gold">
                  <span className="text-white font-heading font-bold text-sm">{step.step}</span>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-charcoal-900 mb-1">{step.title}</h3>
                  <p className="text-gray-500 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEMA rules */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-heading font-bold text-center text-charcoal-900 mb-8">Key FEMA Guidelines for NRIs</h2>
          <div className="space-y-3">
            {[
              'NRIs can purchase residential and commercial properties in India (except agricultural land).',
              'Payment must be made through NRE, NRO, or FCNR accounts via banking channels.',
              'Home loans are available from Indian banks for NRIs up to 80% of property value.',
              'Sale proceeds can be repatriated abroad subject to RBI guidelines.',
              'TDS of 20% (+ surcharge) is applicable on property sales by NRIs.',
              'Power of Attorney (POA) is recommended for smooth transactions while abroad.',
            ].map((rule, i) => (
              <div key={i} className="flex gap-3 p-4 bg-white border border-gray-100 rounded-lg">
                <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
                <p className="text-gray-700 text-sm">{rule}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-xs text-center mt-4">
            * This is general information. Please consult a tax advisor for your specific situation.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gold-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">Start Your NRI Investment Journey</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">Trusted by 200+ NRI families from USA, Canada, UK, UAE, Australia, and Singapore.</p>
          <a href="https://wa.me/919876543210?text=Hi! I am an NRI and want to invest in Tricity property." target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-gold-700 font-bold px-8 py-4 rounded-lg hover:bg-white/90 transition-colors shadow-lg">
            <MessageCircle className="w-5 h-5" /> Contact NRI Desk Now
          </a>
        </div>
      </section>
    </div>
  )
}
