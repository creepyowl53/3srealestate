'use client'

import { motion } from 'framer-motion'
import { Shield, TrendingUp, Users, Award, Clock, HeadphonesIcon } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Verified Properties',
    description: 'Every property is personally verified by our experts. Zero fraud, 100% transparency in every transaction.',
    color: 'text-blue-500',
    bg: 'bg-blue-50',
  },
  {
    icon: TrendingUp,
    title: 'Best Investment Returns',
    description: 'Our properties consistently deliver 10-20% annual appreciation. We help you maximize your investment.',
    color: 'text-green-500',
    bg: 'bg-green-50',
  },
  {
    icon: Users,
    title: 'Expert Consultants',
    description: 'Our team of seasoned real estate professionals with 15+ years of Tricity market expertise.',
    color: 'text-purple-500',
    bg: 'bg-purple-50',
  },
  {
    icon: Award,
    title: 'Award Winning Service',
    description: 'Recognized as Tricity\'s top real estate platform for 3 consecutive years by industry bodies.',
    color: 'text-amber-500',
    bg: 'bg-amber-50',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round the clock support via WhatsApp, call, and email. We are always available for you.',
    color: 'text-red-500',
    bg: 'bg-red-50',
  },
  {
    icon: HeadphonesIcon,
    title: 'End-to-End Assistance',
    description: 'From property search to registration, loan assistance, and possession — we handle everything.',
    color: 'text-teal-500',
    bg: 'bg-teal-50',
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-gold-600 text-sm font-semibold tracking-widest uppercase mb-2">Our Advantage</p>
          <h2 className="section-heading text-charcoal-900 mb-4">Why Choose 3S Real Estate?</h2>
          <div className="gold-divider mx-auto mb-4" />
          <p className="section-subheading mx-auto text-center">
            Tricity's most trusted real estate brand. Smart, Secure, and Sophisticated — in every deal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-6 rounded-xl border border-gray-100 hover:border-gold-200 hover:shadow-lg transition-all duration-300 bg-white"
            >
              <div className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="font-heading font-semibold text-lg text-charcoal-900 mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Trust badges row */}
        <div className="mt-16 pt-12 border-t border-gray-100">
          <p className="text-center text-gray-400 text-sm mb-8 uppercase tracking-widest">Trusted by leading builders & institutions</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-40 grayscale">
            {['DLF', 'Emaar', 'Godrej', 'Sobha', 'HDFC', 'SBI', 'ICICI', 'Axis Bank'].map((brand) => (
              <span key={brand} className="text-charcoal-700 font-heading font-bold text-xl">{brand}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
