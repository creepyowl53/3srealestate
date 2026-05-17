import { Suspense } from 'react'
import { prisma } from '@/lib/prisma'
import { PropertyCard } from '@/components/property/property-card'
import { PropertyFilter } from '@/components/property/property-filter'
import { Skeleton } from '@/components/ui/forms'
import type { Metadata } from 'next'

interface PageProps {
  searchParams: {
    type?: string; purpose?: string; city?: string; minPrice?: string
    maxPrice?: string; bedrooms?: string; featured?: string; luxury?: string
    search?: string; sort?: string; page?: string
  }
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const city = searchParams.city || 'Tricity'
  const type = searchParams.type ? searchParams.type.charAt(0) + searchParams.type.slice(1).toLowerCase() : 'Properties'
  return {
    title: `${type} in ${city} | 3S Real Estate`,
    description: `Browse ${type.toLowerCase()} for sale and rent in ${city}. Find your dream property with 3S Real Estate — Tricity's most trusted platform.`,
  }
}

async function getProperties(params: PageProps['searchParams']) {
  const page = parseInt(params.page || '1')
  const limit = 12

  const where: any = {}
  if (params.type) where.type = params.type
  if (params.purpose) where.purpose = params.purpose
  if (params.city) where.city = { contains: params.city, mode: 'insensitive' }
  if (params.featured === 'true') where.isFeatured = true
  if (params.luxury === 'true') where.isLuxury = true
  if (params.bedrooms) where.bedrooms = parseInt(params.bedrooms)
  if (params.minPrice || params.maxPrice) {
    where.price = {}
    if (params.minPrice) where.price.gte = parseFloat(params.minPrice)
    if (params.maxPrice) where.price.lte = parseFloat(params.maxPrice)
  }
  if (params.search) {
    where.OR = [
      { title: { contains: params.search, mode: 'insensitive' } },
      { city: { contains: params.search, mode: 'insensitive' } },
      { locality: { contains: params.search, mode: 'insensitive' } },
    ]
  }

  const [sortField, sortOrder] = (params.sort || 'createdAt_desc').split('_')
  const [properties, total] = await Promise.all([
    prisma.property.findMany({
      where,
      orderBy: { [sortField]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
      include: { images: { take: 1 } },
    }),
    prisma.property.count({ where }),
  ])
  return { properties, total, page, pages: Math.ceil(total / limit) }
}

export default async function PropertiesPage({ searchParams }: PageProps) {
  const { properties, total, page, pages } = await getProperties(searchParams)

  const heading = searchParams.type
    ? `${searchParams.type.charAt(0) + searchParams.type.slice(1).toLowerCase()} Properties${searchParams.city ? ` in ${searchParams.city}` : ''}`
    : searchParams.city
    ? `Properties in ${searchParams.city}`
    : 'All Properties'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="bg-charcoal-950 pt-8 pb-12">
        <div className="container mx-auto px-4">
          <p className="text-gold-400 text-xs uppercase tracking-widest mb-2">Explore Properties</p>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-1">{heading}</h1>
          <p className="text-white/50 text-sm">{total} properties found</p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-6">
        {/* Filter bar */}
        <PropertyFilter currentParams={searchParams} />

        {/* Results */}
        <div className="mt-6">
          {properties.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-5xl mb-4">🏠</p>
              <h3 className="text-xl font-heading font-semibold text-charcoal-800 mb-2">No Properties Found</h3>
              <p className="text-gray-500">Try adjusting your filters or search term.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property, i) => (
                  <PropertyCard key={property.id} property={property} index={i} />
                ))}
              </div>

              {/* Pagination */}
              {pages > 1 && (
                <div className="flex justify-center gap-2 mt-10 pb-10">
                  {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                    <a
                      key={p}
                      href={`?${new URLSearchParams({ ...searchParams, page: String(p) })}`}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                        p === page
                          ? 'bg-gold-gradient text-white shadow-gold'
                          : 'bg-white border border-gray-200 text-charcoal-700 hover:border-gold-400'
                      }`}
                    >
                      {p}
                    </a>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
