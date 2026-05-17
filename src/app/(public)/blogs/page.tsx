import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { formatDateShort } from '@/lib/utils'
import { Clock, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Real Estate Blog | Market Insights | 3S Real Estate',
  description: 'Latest real estate news, investment guides, NRI corner, and market trends for Mohali, Chandigarh & Zirakpur.',
}

async function getBlogs(category?: string) {
  return prisma.blog.findMany({
    where: { isPublished: true, ...(category ? { category: { slug: category } } : {}) },
    orderBy: { publishedAt: 'desc' },
    include: { category: true },
  })
}

async function getCategories() {
  return prisma.blogCategory.findMany()
}

export default async function BlogsPage({ searchParams }: { searchParams: { category?: string } }) {
  const [blogs, categories] = await Promise.all([getBlogs(searchParams.category), getCategories()])

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-charcoal-950 py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold-400 text-sm uppercase tracking-widest mb-2">Knowledge Hub</p>
          <h1 className="text-4xl font-heading font-bold text-white mb-2">Real Estate Insights</h1>
          <div className="h-1 w-16 bg-gold-gradient rounded mx-auto" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link href="/blogs" className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!searchParams.category ? 'bg-gold-gradient text-white shadow-gold' : 'bg-white border border-gray-200 text-gray-600 hover:border-gold-400'}`}>
            All
          </Link>
          {categories.map((cat) => (
            <Link key={cat.id} href={`/blogs?category=${cat.slug}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${searchParams.category === cat.slug ? 'bg-gold-gradient text-white shadow-gold' : 'bg-white border border-gray-200 text-gray-600 hover:border-gold-400'}`}>
              {cat.name}
            </Link>
          ))}
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No articles yet. Check back soon!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <article key={blog.id} className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                <div className="relative h-52 bg-gradient-to-br from-charcoal-800 to-charcoal-900 overflow-hidden">
                  {blog.coverImage
                    ? <Image src={blog.coverImage} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    : <div className="absolute inset-0 flex items-center justify-center text-4xl">📝</div>
                  }
                  {blog.category && (
                    <span className="absolute top-3 left-3 bg-gold-gradient text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {blog.category.name}
                    </span>
                  )}
                  {blog.isFeatured && (
                    <span className="absolute top-3 right-3 bg-white/90 text-charcoal-800 text-xs font-semibold px-3 py-1 rounded-full">
                      ⭐ Featured
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{blog.publishedAt ? formatDateShort(blog.publishedAt) : ''}</span>
                    {blog.viewCount > 0 && <><span>·</span><span>{blog.viewCount} views</span></>}
                  </div>
                  <Link href={`/blog/${blog.slug}`}>
                    <h2 className="font-heading font-semibold text-charcoal-900 text-base leading-snug hover:text-gold-600 transition-colors line-clamp-2 mb-2">
                      {blog.title}
                    </h2>
                  </Link>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">{blog.excerpt}</p>
                  {blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {blog.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">#{tag}</span>
                      ))}
                    </div>
                  )}
                  <Link href={`/blog/${blog.slug}`} className="text-gold-600 text-sm font-semibold hover:text-gold-700 flex items-center gap-1 group/link">
                    Read Article <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
