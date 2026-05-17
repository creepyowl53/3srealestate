import { prisma } from '@/lib/prisma'
import { formatDateShort } from '@/lib/utils'
import Link from 'next/link'
import { Plus, Eye, Edit } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Blogs | 3S Admin' }

export default async function AdminBlogsPage() {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: 'desc' },
    include: { category: true },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">Blogs</h1>
          <p className="text-white/40 text-sm mt-1">{blogs.length} articles</p>
        </div>
        <Link href="/admin/blogs/new"
          className="flex items-center gap-2 bg-gold-gradient text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-gold">
          <Plus className="w-4 h-4" /> New Article
        </Link>
      </div>

      <div className="bg-charcoal-900 border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              {['Title', 'Category', 'Status', 'Views', 'Published', 'Actions'].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-white/40 text-xs font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {blogs.map((blog) => (
              <tr key={blog.id} className="hover:bg-white/5 transition-colors">
                <td className="px-5 py-3">
                  <p className="text-white font-medium line-clamp-1 max-w-xs">{blog.title}</p>
                  <p className="text-white/30 text-xs mt-0.5">/{blog.slug}</p>
                </td>
                <td className="px-5 py-3">
                  {blog.category
                    ? <span className="bg-gold-500/10 text-gold-400 text-xs px-2 py-0.5 rounded-full">{blog.category.name}</span>
                    : <span className="text-white/30 text-xs">—</span>}
                </td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${blog.isPublished ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                    {blog.isPublished ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-5 py-3 text-white/50">{blog.viewCount}</td>
                <td className="px-5 py-3 text-white/50 text-xs">
                  {blog.publishedAt ? formatDateShort(blog.publishedAt) : '—'}
                </td>
                <td className="px-5 py-3">
                  <div className="flex gap-2">
                    {blog.isPublished && (
                      <Link href={`/blog/${blog.slug}`} target="_blank"
                        className="text-white/40 hover:text-white transition-colors">
                        <Eye className="w-4 h-4" />
                      </Link>
                    )}
                    <Link href={`/admin/blogs/${blog.id}/edit`}
                      className="text-gold-400 hover:text-gold-300 transition-colors">
                      <Edit className="w-4 h-4" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
