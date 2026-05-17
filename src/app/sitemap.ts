import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://3srealestate.com'

  const [properties, blogs] = await Promise.all([
    prisma.property.findMany({ select: { slug: true, updatedAt: true }, where: { status: { not: 'SOLD' } } }),
    prisma.blog.findMany({ select: { slug: true, updatedAt: true }, where: { isPublished: true } }),
  ])

  const staticPages = [
    '', '/properties', '/about', '/contact', '/blogs',
    '/services', '/investment', '/nri', '/calculator',
    '/privacy', '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const seoPages = [
    '/properties?type=FLAT&city=Mohali',
    '/properties?type=VILLA&city=Mohali',
    '/properties?type=COMMERCIAL&city=Chandigarh',
    '/properties?city=Zirakpur',
    '/properties?city=Kharar',
    '/properties?city=New+Chandigarh',
    '/properties?luxury=true',
    '/properties?purpose=INVESTMENT',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const propertyPages = properties.map((p) => ({
    url: `${baseUrl}/property/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  const blogPages = blogs.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: b.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...seoPages, ...propertyPages, ...blogPages]
}
