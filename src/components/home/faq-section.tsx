'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'What areas does 3S Real Estate cover?',
    a: 'We cover the entire Tricity region including Mohali, Chandigarh, Zirakpur, Kharar, New Chandigarh, Airport Road, Mullanpur, and surrounding areas in Punjab and Haryana.',
  },
  {
    q: 'How do I schedule a site visit?',
    a: 'You can schedule a site visit by clicking "Book Visit" on any property page, calling us at +91-98765-43210, or messaging us on WhatsApp. We typically arrange visits within 24 hours.',
  },
  {
    q: 'Does 3S Real Estate help with home loans?',
    a: 'Yes! We have tie-ups with all major banks including HDFC, SBI, ICICI, and Axis Bank. Our team assists you with the entire loan process — from eligibility check to final disbursement.',
  },
  {
    q: 'Are all properties RERA registered?',
    a: 'All new residential projects listed on our platform are RERA registered. We display the RERA number on every applicable property listing for complete transparency.',
  },
  {
    q: 'Can NRIs purchase properties through 3S Real Estate?',
    a: 'Absolutely. We have a dedicated NRI desk that handles all aspects of NRI investment — FEMA compliance, Power of Attorney, banking, and documentation. Visit our NRI Investment page for more details.',
  },
  {
    q: 'What is the typical commission/brokerage charged?',
    a: 'Our brokerage is transparent and industry-standard. For buyers, we charge 1-2% of the transaction value. Many properties are available at zero brokerage from the builder. Contact us for exact details on specific properties.',
  },
  {
    q: 'How is lead information kept private?',
    a: 'We take privacy very seriously. Your contact details are only shared with our internal team and never sold to third parties. We are fully compliant with data protection regulations.',
  },
]

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-gold-600 text-sm font-semibold tracking-widest uppercase mb-2">FAQs</p>
          <h2 className="section-heading text-charcoal-900 mb-4">Frequently Asked Questions</h2>
          <div className="gold-divider mx-auto" />
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-100 rounded-xl overflow-hidden hover:border-gold-200 transition-colors">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
              >
                <span className="font-semibold text-charcoal-800 text-sm md:text-base">{faq.q}</span>
                <span className="shrink-0 w-7 h-7 rounded-full bg-gold-50 flex items-center justify-center">
                  {open === i
                    ? <Minus className="w-3.5 h-3.5 text-gold-600" />
                    : <Plus className="w-3.5 h-3.5 text-gold-600" />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
