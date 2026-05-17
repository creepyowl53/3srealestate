import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { formatDateShort } from '@/lib/utils'

async function getLatestBlogs() {
  return prisma.blog.findMany({
    where: { isPublished: true },
    take: 3,
    orderBy: { publishedAt: 'desc' },
    include: { category: true },
  })
}

export async function BlogsSection() {
  const blogs = await getLatestBlogs()

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-gold-600 text-sm font-semibold tracking-widest uppercase mb-2">Market Insights</p>
            <h2 className="section-heading text-charcoal-900">Latest From Our Blog</h2>
            <div className="gold-divider mt-4" />
          </div>
          <Link href="/blogs" className="flex items-center gap-2 text-charcoal-700 hover:text-gold-600 font-medium transition-colors group">
            View All Articles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog, i) => (
            <article key={blog.id} className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 group">
              <div className="relative h-48 bg-gradient-to-br from-charcoal-800 to-charcoal-900 overflow-hidden">
                {blog.coverImage ? (
                  <Image src={blog.coverImage} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl">📰</span>
                  </div>
                )}
                {blog.category && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-gold-gradient text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {blog.category.name}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{blog.publishedAt ? formatDateShort(blog.publishedAt) : 'Draft'}</span>
                </div>
                <Link href={`/blog/${blog.slug}`}>
                  <h3 className="font-heading font-semibold text-charcoal-900 text-base leading-snug hover:text-gold-600 transition-colors line-clamp-2 mb-2">
                    {blog.title}
                  </h3>
                </Link>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4">{blog.excerpt}</p>
                <Link href={`/blog/${blog.slug}`} className="text-gold-600 text-sm font-semibold hover:text-gold-700 flex items-center gap-1 group/link">
                  Read More
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
