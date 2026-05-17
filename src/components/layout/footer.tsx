'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin, Instagram, Youtube, Facebook, ArrowRight } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-charcoal-950 text-white">
      {/* Main footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gold-gradient rounded-sm flex items-center justify-center shadow-gold">
                <span className="text-white font-heading font-bold text-lg">3S</span>
              </div>
              <div>
                <div className="font-heading font-bold text-xl">3S Real Estate</div>
                <div className="text-gold-400 text-xs tracking-widest">SMART • SECURE • SOPHISTICATED</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Tricity's most trusted premium real estate platform. Helping thousands find their dream property in Mohali, Chandigarh & Zirakpur.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/3srealestate" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold-500/20 hover:text-gold-400 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://youtube.com/@3srealestate" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold-500/20 hover:text-gold-400 transition-all">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://facebook.com/3srealestate" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold-500/20 hover:text-gold-400 transition-all">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6 text-white">Properties</h3>
            <ul className="space-y-3">
              {[
                { label: 'Flats in Mohali', href: '/properties?type=FLAT&city=Mohali' },
                { label: 'Villas in Mohali', href: '/properties?type=VILLA&city=Mohali' },
                { label: 'Commercial in Chandigarh', href: '/properties?type=COMMERCIAL&city=Chandigarh' },
                { label: 'Property in Zirakpur', href: '/properties?city=Zirakpur' },
                { label: 'Investment Property', href: '/properties?purpose=INVESTMENT' },
                { label: 'Luxury Villas', href: '/properties?luxury=true' },
                { label: 'Rental Properties', href: '/properties?purpose=RENT' },
                { label: 'Plots for Sale', href: '/properties?type=PLOT' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-white/50 hover:text-gold-400 text-sm transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6 text-white">Services</h3>
            <ul className="space-y-3">
              {[
                { label: 'Investment Advisory', href: '/investment' },
                { label: 'NRI Investment Guide', href: '/nri' },
                { label: 'Property Management', href: '/services' },
                { label: 'EMI Calculator', href: '/calculator' },
                { label: 'Blog & Market Insights', href: '/blogs' },
                { label: 'About 3S Real Estate', href: '/about' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms & Conditions', href: '/terms' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-white/50 hover:text-gold-400 text-sm transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm">SCO 123, Sector 17-C,<br />Chandigarh - 160017</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <a href="tel:+919876543210" className="text-white/60 hover:text-gold-400 text-sm transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <a href="tel:+919876543211" className="text-white/60 hover:text-gold-400 text-sm transition-colors">
                  +91 98765 43211
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <a href="mailto:info@3srealestate.com" className="text-white/60 hover:text-gold-400 text-sm transition-colors">
                  info@3srealestate.com
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-white/40 text-xs mb-3">Office Hours</p>
              <p className="text-white/60 text-sm">Mon – Sat: 10:00 AM – 7:00 PM</p>
              <p className="text-white/60 text-sm">Sun: By Appointment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm text-center md:text-left">
            © {new Date().getFullYear()} 3S Real Estate. All rights reserved. | RERA Registered
          </p>
          <p className="text-white/30 text-xs">
            Designed with ♥ for Tricity's finest properties
          </p>
        </div>
      </div>
    </footer>
  )
}
