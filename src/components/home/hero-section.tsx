'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Home, Building2, TrendingUp, ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'

const locations = ['Mohali', 'Chandigarh', 'Zirakpur', 'Kharar', 'New Chandigarh', 'Airport Road']
const propertyTypes = ['All Types', 'Flat', 'Villa', 'Plot', 'Commercial', 'Luxury', 'Rental']

export function HeroSection() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedType, setSelectedType] = useState('All Types')
  const [purpose, setPurpose] = useState<'buy' | 'rent' | 'invest'>('buy')

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchQuery) params.set('search', searchQuery)
    if (selectedLocation) params.set('city', selectedLocation)
    if (selectedType !== 'All Types') params.set('type', selectedType.toUpperCase())
    if (purpose === 'rent') params.set('purpose', 'RENT')
    if (purpose === 'invest') params.set('purpose', 'INVESTMENT')
    router.push(`/properties?${params.toString()}`)
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video/Image Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/80" />
        {/* Animated particles/luxury overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(212,150,10,0.4) 0%, transparent 50%),
                             radial-gradient(circle at 80% 20%, rgba(212,150,10,0.2) 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pt-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/30 rounded-full px-5 py-2 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-gold-300 text-sm font-medium">
              Tricity's #1 Premium Real Estate Platform
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight"
          >
            Find Your{' '}
            <span className="text-gold-gradient">Dream Property</span>
            <br />
            in Tricity
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-white/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto"
          >
            Smart • Secure • Sophisticated. Premium villas, flats, commercial spaces &
            investment properties in Mohali, Chandigarh, Zirakpur & beyond.
          </motion.p>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-luxury max-w-3xl mx-auto"
          >
            {/* Purpose tabs */}
            <div className="flex gap-1 mb-3 p-1 bg-black/20 rounded-xl">
              {(['buy', 'rent', 'invest'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPurpose(p)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    purpose === p
                      ? 'bg-gold-gradient text-white shadow-gold'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {p === 'buy' && <><Home className="w-4 h-4 inline mr-1.5" />Buy</>}
                  {p === 'rent' && <><Building2 className="w-4 h-4 inline mr-1.5" />Rent</>}
                  {p === 'invest' && <><TrendingUp className="w-4 h-4 inline mr-1.5" />Invest</>}
                </button>
              ))}
            </div>

            {/* Search inputs */}
            <div className="flex flex-col md:flex-row gap-2">
              {/* Search input */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                <input
                  type="text"
                  placeholder="Search by locality, project..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full bg-transparent border border-white/20 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-white/40 text-sm focus:outline-none focus:border-gold-400"
                />
              </div>

              {/* Location */}
              <div className="relative md:w-48">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full bg-charcoal-900/80 border border-white/20 rounded-xl pl-11 pr-8 py-3.5 text-white/80 text-sm focus:outline-none focus:border-gold-400 appearance-none cursor-pointer"
                >
                  <option value="">All Locations</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc} className="bg-charcoal-900">{loc}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
              </div>

              {/* Property Type */}
              <div className="relative md:w-44">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-charcoal-900/80 border border-white/20 rounded-xl px-4 py-3.5 text-white/80 text-sm focus:outline-none focus:border-gold-400 appearance-none cursor-pointer"
                >
                  {propertyTypes.map((t) => (
                    <option key={t} value={t} className="bg-charcoal-900">{t}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="btn-luxury px-6 py-3.5 rounded-xl whitespace-nowrap"
              >
                Search
              </button>
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <span className="text-white/40 text-sm">Popular:</span>
            {[
              'Flats in Mohali',
              'Villas in New Chandigarh',
              'Commercial in Zirakpur',
              'Plots in Kharar',
            ].map((tag) => (
              <button
                key={tag}
                onClick={() => router.push(`/properties?search=${tag}`)}
                className="px-4 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white/70 hover:text-white text-xs transition-all"
              >
                {tag}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="w-5 h-5 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  )
}
