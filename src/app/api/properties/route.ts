// src/app/api/properties/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '12')
  const type = searchParams.get('type')
  const purpose = searchParams.get('purpose')
  const city = searchParams.get('city')
  const minPrice = searchParams.get('minPrice')
  const maxPrice = searchParams.get('maxPrice')
  const bedrooms = searchParams.get('bedrooms')
  const featured = searchParams.get('featured')
  const luxury = searchParams.get('luxury')
  const search = searchParams.get('search')
  const sort = searchParams.get('sort') || 'createdAt_desc'

  const where: any = { status: { not: 'SOLD' } }

  if (type) where.type = type
  if (purpose) where.purpose = purpose
  if (city) where.city = { contains: city, mode: 'insensitive' }
  if (featured === 'true') where.isFeatured = true
  if (luxury === 'true') where.isLuxury = true
  if (bedrooms) where.bedrooms = parseInt(bedrooms)
  if (minPrice || maxPrice) {
    where.price = {}
    if (minPrice) where.price.gte = parseFloat(minPrice)
    if (maxPrice) where.price.lte = parseFloat(maxPrice)
  }
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { city: { contains: search, mode: 'insensitive' } },
      { locality: { contains: search, mode: 'insensitive' } },
      { address: { contains: search, mode: 'insensitive' } },
    ]
  }

  const [sortField, sortOrder] = sort.split('_')
  const orderBy: any = { [sortField]: sortOrder }

  const [properties, total] = await Promise.all([
    prisma.property.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        images: { take: 3, orderBy: { order: 'asc' } },
        amenities: { take: 5 },
        _count: { select: { inquiries: true, savedBy: true } },
      },
    }),
    prisma.property.count({ where }),
  ])

  return NextResponse.json({
    properties,
    total,
    page,
    limit,
    pages: Math.ceil(total / limit),
  })
}
