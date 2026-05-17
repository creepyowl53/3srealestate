import { prisma } from '@/lib/prisma'
import { formatDateShort } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Inquiries | 3S Admin' }

export default async function InquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: 'desc' },
    include: { property: { select: { title: true, slug: true } } },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-white">Inquiries</h1>
        <p className="text-white/40 text-sm mt-1">{inquiries.length} total · {inquiries.filter(i => !i.isRead).length} unread</p>
      </div>

      <div className="bg-charcoal-900 border border-white/10 rounded-xl overflow-hidden">
        <div className="divide-y divide-white/5">
          {inquiries.map((inq) => (
            <div key={inq.id} className={`p-5 hover:bg-white/5 transition-colors ${!inq.isRead ? 'border-l-2 border-gold-500' : ''}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-white font-semibold">{inq.name}</p>
                    {!inq.isRead && <span className="w-2 h-2 rounded-full bg-gold-500 shrink-0" />}
                  </div>
                  <div className="flex items-center gap-3 text-white/40 text-xs mb-2">
                    <a href={`tel:${inq.phone}`} className="hover:text-gold-400">{inq.phone}</a>
                    {inq.email && <a href={`mailto:${inq.email}`} className="hover:text-gold-400">{inq.email}</a>}
                  </div>
                  {inq.property && (
                    <p className="text-gold-400 text-xs mb-2">🏠 {inq.property.title}</p>
                  )}
                  {inq.message && <p className="text-white/60 text-sm">{inq.message}</p>}
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <p className="text-white/30 text-xs">{formatDateShort(inq.createdAt)}</p>
                  <div className="flex gap-2">
                    <a href={`tel:${inq.phone}`}
                      className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-xs rounded-lg transition-colors">
                      Call
                    </a>
                    <a href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=Hi ${inq.name}, thanks for your inquiry about ${inq.property?.title || 'our properties'}. How can we help?`}
                      target="_blank" rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-green-500/10 hover:bg-green-500/20 text-green-400 text-xs rounded-lg transition-colors">
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {inquiries.length === 0 && (
            <div className="py-16 text-center text-white/30">No inquiries yet</div>
          )}
        </div>
      </div>
    </div>
  )
}
