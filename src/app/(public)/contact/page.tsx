'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema, ContactFormInput } from '@/lib/validations'
import { Phone, Mail, MapPin, Clock, MessageCircle, CheckCircle2, Loader2 } from 'lucide-react'

export default function ContactPage() {
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormInput) => {
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) { setSuccess(true); reset() }
    } finally { setLoading(false) }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-charcoal-950 py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold-400 text-sm uppercase tracking-widest mb-2">Reach Out</p>
          <h1 className="text-4xl font-heading font-bold text-white mb-2">Contact Us</h1>
          <div className="h-1 w-16 bg-gold-gradient rounded mx-auto" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact info */}
          <div className="space-y-4">
            {[
              { icon: Phone, title: 'Call Us', lines: ['+91 8872520002', '+91 8872110222'], href: 'tel:+918872520002' },
              { icon: Mail, title: 'Email Us', lines: ['info@3srealestate.com', 'sales@3srealestate.com'], href: 'mailto:info@3srealestate.com' },
              { icon: MapPin, title: 'Visit Us', lines: ['SCO 90-91, sector-86, Preet City, near-HDFC bank, First Floor'], href: '#' },
              { icon: Clock, title: 'Office Hours', lines: ['Mon–Sat: 10 AM – 7 PM', 'Sun: By Appointment'], href: '#' },
            ].map(({ icon: Icon, title, lines, href }) => (
              <a key={title} href={href} className="flex gap-4 p-5 bg-white rounded-xl border border-gray-100 hover:border-gold-200 hover:shadow-md transition-all group">
                <div className="w-11 h-11 bg-gold-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-gold-100 transition-colors">
                  <Icon className="w-5 h-5 text-gold-600" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal-800 text-sm mb-0.5">{title}</p>
                  {lines.map((l) => <p key={l} className="text-gray-500 text-sm">{l}</p>)}
                </div>
              </a>
            ))}

            {/* WhatsApp button */}
            <a
              href="https://wa.me/+918872520002?text=Hi! I want to inquire about properties."
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-green-500 text-white font-semibold py-4 rounded-xl hover:bg-green-600 transition-colors shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
            {success ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-heading font-bold text-charcoal-800 mb-2">Message Received!</h3>
                <p className="text-gray-500">Our team will get back to you within 2 hours.</p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-heading font-bold text-charcoal-900 mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                      <input {...register('name')} placeholder="Rahul Sharma"
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-200" />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
                      <input {...register('phone')} placeholder="+91 98765 43210"
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-200" />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                    <input {...register('email')} type="email" placeholder="your@email.com"
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-200" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                    <select {...register('subject')}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold-400 bg-white">
                      <option value="">Select subject</option>
                      <option>Property Inquiry</option>
                      <option>Investment Advisory</option>
                      <option>NRI Investment</option>
                      <option>Site Visit Request</option>
                      <option>General Query</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                    <textarea {...register('message')} rows={5} placeholder="Tell us what you're looking for..."
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-200 resize-none" />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full btn-luxury py-3.5 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-60">
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
