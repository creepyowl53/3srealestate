import { prisma } from '@/lib/prisma'
import { Star, Quote } from 'lucide-react'

async function getTestimonials() {
  return prisma.testimonial.findMany({
    where: { isActive: true },
    take: 6,
    orderBy: { createdAt: 'desc' },
  })
}

export async function TestimonialsSection() {
  const testimonials = await getTestimonials()

  return (
    <section className="py-20 bg-charcoal-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-2">Client Stories</p>
          <h2 className="section-heading text-white mb-4">What Our Clients Say</h2>
          <div className="gold-divider mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/8 hover:border-gold-500/30 transition-all duration-300"
            >
              <Quote className="w-8 h-8 text-gold-500/40 mb-4" />
              <p className="text-white/70 text-sm leading-relaxed mb-6 italic">"{t.content}"</p>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center text-white font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-white/40 text-xs">{t.role}{t.company ? ` · ${t.company}` : ''}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google rating */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-6 py-3">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
              ))}
            </div>
            <span className="text-white font-semibold">4.9/5</span>
            <span className="text-white/40 text-sm">from 200+ Google Reviews</span>
          </div>
        </div>
      </div>
    </section>
  )
}
