import type { Metadata } from 'next'
import { Award, Users, TrendingUp, MapPin, Phone, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us | 3S Real Estate',
  description: 'Learn about 3S Real Estate — Tricity\'s most trusted premium real estate brand. Smart, Secure, Sophisticated.',
}

const team = [
  { name: 'Simranjit Singh', role: 'Founder & CEO', exp: '18+ years', area: 'Mohali & Chandigarh' },
  { name: 'Rahul Sharma', role: 'Head of Sales', exp: '12+ years', area: 'Zirakpur & New Chandigarh' },
  { name: 'Priya Verma', role: 'NRI Investment Specialist', exp: '10+ years', area: 'NRI Desk' },
  { name: 'Amandeep Kaur', role: 'Commercial Properties', exp: '8+ years', area: 'Commercial Division' },
]

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-charcoal-950 py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold-400 text-sm uppercase tracking-widest mb-3">Our Story</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">About 3S Real Estate</h1>
          <div className="h-1 w-16 bg-gold-gradient rounded mx-auto mb-6" />
          <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
            Tricity's most trusted premium real estate platform, built on the pillars of Smart advisory,
            Secure transactions, and Sophisticated service.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gold-600 text-sm font-semibold uppercase tracking-widest mb-3">Our Journey</p>
              <h2 className="text-3xl font-heading font-bold text-charcoal-900 mb-4">15 Years of Excellence in Tricity Real Estate</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Founded in 2009, 3S Real Estate began as a small consultancy in Chandigarh Sector 17 with a simple mission: to make real estate buying transparent, trustworthy, and rewarding.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Today, we are Tricity's leading premium real estate platform with a portfolio of 500+ successfully transacted properties, 2,000+ happy clients, and a dedicated team of 25+ experts covering Mohali, Chandigarh, Zirakpur, Kharar, and New Chandigarh.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We specialize in residential, commercial, luxury, and NRI investment properties — providing end-to-end support from property search to registration.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Award, label: 'Years Experience', value: '15+' },
                { icon: Users, label: 'Happy Clients', value: '2000+' },
                { icon: TrendingUp, label: 'Properties Sold', value: '500+' },
                { icon: MapPin, label: 'Cities Covered', value: '6+' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-gray-50 rounded-xl p-5 text-center border border-gray-100">
                  <Icon className="w-7 h-7 text-gold-500 mx-auto mb-2" />
                  <p className="text-2xl font-heading font-bold text-charcoal-900">{value}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-charcoal-900 mb-3">Our Core Values</h2>
            <div className="h-1 w-16 bg-gold-gradient rounded mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { letter: 'S', title: 'Smart', desc: 'Data-driven advisory, market intelligence, and strategic investment guidance that helps you make the best real estate decisions.' },
              { letter: 'S', title: 'Secure', desc: 'Every transaction is legally vetted. From RERA verification to registration, we ensure your investment is 100% safe.' },
              { letter: 'S', title: 'Sophisticated', desc: 'Premium service, luxury properties, and a seamless experience that matches the high standards of our discerning clientele.' },
            ].map(({ letter, title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-8 text-center border border-gray-100 hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-gold-gradient rounded-xl flex items-center justify-center mx-auto mb-4 shadow-gold">
                  <span className="text-white font-heading font-bold text-2xl">{letter}</span>
                </div>
                <h3 className="font-heading font-bold text-xl text-charcoal-900 mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-charcoal-900 mb-3">Meet Our Team</h2>
            <div className="h-1 w-16 bg-gold-gradient rounded mx-auto mb-4" />
            <p className="text-gray-500">Experienced professionals dedicated to finding you the perfect property.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-xl p-6 text-center border border-gray-100 hover:shadow-lg hover:border-gold-200 transition-all group">
                <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-4 shadow-gold group-hover:scale-110 transition-transform">
                  <span className="text-white font-heading font-bold text-xl">{member.name.charAt(0)}</span>
                </div>
                <h3 className="font-heading font-semibold text-charcoal-900 mb-1">{member.name}</h3>
                <p className="text-gold-600 text-sm font-medium mb-1">{member.role}</p>
                <p className="text-gray-400 text-xs">{member.exp} · {member.area}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact info */}
      <section className="py-16 bg-charcoal-950">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-8">Get In Touch</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <a href="tel:+919876543210" className="flex items-center gap-3 text-white/70 hover:text-gold-400 transition-colors">
              <Phone className="w-5 h-5 text-gold-400" />
              <span>+91 98765 43210</span>
            </a>
            <a href="mailto:info@3srealestate.com" className="flex items-center gap-3 text-white/70 hover:text-gold-400 transition-colors">
              <Mail className="w-5 h-5 text-gold-400" />
              <span>info@3srealestate.com</span>
            </a>
            <div className="flex items-center gap-3 text-white/70">
              <MapPin className="w-5 h-5 text-gold-400" />
              <span>SCO 123, Sector 17-C, Chandigarh</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
