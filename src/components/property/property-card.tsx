'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Bed, Bath, Car, Square, Heart, Share2, Eye } from 'lucide-react'
import { formatPrice } from '@/lib/lead-scoring'
import { cn } from '@/lib/utils'
import { getWhatsAppLink } from '@/lib/site-config'

interface PropertyCardProps {
  property: {
    id: string
    title: string
    slug: string
    type: string
    purpose: string
    price: number
    priceLabel?: string | null
    area: number
    areaUnit: string
    bedrooms?: number | null
    bathrooms?: number | null
    parking?: number | null
    city: string
    locality: string
    coverImage: string
    isFeatured: boolean
    isLuxury: boolean
    status: string
    furnishing?: string | null
    possession?: string | null
    investmentReturn?: number | null
  }
  index?: number
  className?: string
}

const typeColors: Record<string, string> = {
  RESIDENTIAL: 'bg-blue-500/20 text-blue-300',
  COMMERCIAL: 'bg-purple-500/20 text-purple-300',
  VILLA: 'bg-amber-500/20 text-amber-300',
  FLAT: 'bg-green-500/20 text-green-300',
  PLOT: 'bg-orange-500/20 text-orange-300',
  LUXURY: 'bg-gold-500/20 text-gold-300',
  RENTAL: 'bg-teal-500/20 text-teal-300',
  AGRICULTURAL: 'bg-lime-500/20 text-lime-300',
}

export function PropertyCard({ property, index = 0, className }: PropertyCardProps) {
  const price = property.priceLabel || formatPrice(property.price, property.purpose === 'RENT' ? 'monthly' : 'total')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className={cn('property-card group', className)}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={property.coverImage}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {property.isFeatured && (
            <span className="badge-luxury text-[10px]">⭐ Featured</span>
          )}
          {property.isLuxury && (
            <span className="bg-amber-500 text-white text-[10px] font-semibold px-2 py-1 rounded-full">
              💎 Luxury
            </span>
          )}
          <span className={cn(
            'text-[10px] font-semibold px-2 py-1 rounded-full backdrop-blur-sm',
            typeColors[property.type] || 'bg-gray-500/20 text-gray-300'
          )}>
            {property.type.charAt(0) + property.type.slice(1).toLowerCase()}
          </span>
        </div>

        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white shadow-md">
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
          <button className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white shadow-md">
            <Share2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Status badge */}
        {property.status !== 'AVAILABLE' && (
          <div className="absolute bottom-3 left-3">
            <span className={cn(
              'text-xs font-semibold px-3 py-1 rounded-full',
              property.status === 'SOLD' ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'
            )}>
              {property.status === 'SOLD' ? 'Sold' : 'Under Negotiation'}
            </span>
          </div>
        )}

        {/* Price */}
        <div className="absolute bottom-3 right-3">
          <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1.5">
            <span className="text-gold-400 font-heading font-bold text-sm">{price}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3">
          <div className="flex items-start justify-between gap-2">
            <Link href={`/property/${property.slug}`}>
              <h3 className="font-heading font-semibold text-gray-900 text-base leading-snug hover:text-gold-600 transition-colors line-clamp-2">
                {property.title}
              </h3>
            </Link>
          </div>
          <div className="flex items-center gap-1.5 mt-1.5 text-gray-500">
            <MapPin className="w-3.5 h-3.5 text-gold-500 shrink-0" />
            <span className="text-xs">{property.locality}, {property.city}</span>
          </div>
        </div>

        {/* Specs */}
        <div className="flex items-center gap-4 py-3 border-t border-b border-gray-100 mb-3">
          {property.bedrooms && (
            <div className="flex items-center gap-1.5 text-gray-600">
              <Bed className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">{property.bedrooms} Bed</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center gap-1.5 text-gray-600">
              <Bath className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">{property.bathrooms} Bath</span>
            </div>
          )}
          {property.parking && (
            <div className="flex items-center gap-1.5 text-gray-600">
              <Car className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">{property.parking} Park</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-gray-600">
            <Square className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">{property.area} {property.areaUnit}</span>
          </div>
        </div>

        {/* Investment return */}
        {property.investmentReturn && (
          <div className="mb-3 flex items-center gap-2 bg-green-50 rounded-lg px-3 py-2">
            <span className="text-green-600 text-xs font-semibold">
              📈 {property.investmentReturn}% Expected Returns
            </span>
          </div>
        )}

        {/* CTA */}
        <div className="flex gap-2">
          <Link
            href={`/property/${property.slug}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-charcoal-900 text-white text-xs font-semibold rounded-lg hover:bg-charcoal-800 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            View Details
          </Link>
          <a
            href={getWhatsAppLink(`Hi, I'm interested in ${property.title}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-500 text-white text-xs font-semibold rounded-lg hover:bg-green-600 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  )
}
