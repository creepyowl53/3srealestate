import { prisma } from '@/lib/prisma'
import { getLeadScoreColor, getLeadStatusColor, formatDateShort } from '@/lib/utils'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Leads | 3S Admin' }

interface PageProps { searchParams: { status?: string; score?: string; page?: string } }

async function getLeads(params: PageProps['searchParams']) {
  const page = parseInt(params.page || '1')
  const limit = 20
  const where: any = {}
  if (params.status) where.status = params.status
  if (params.score) where.score = params.score

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where, orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit, take: limit,
      include: { assignedTo: { select: { name: true } } },
    }),
    prisma.lead.count({ where }),
  ])
  return { leads, total, page, pages: Math.ceil(total / limit) }
}

const statuses = ['NEW', 'CONTACTED', 'INTERESTED', 'SITE_VISIT', 'NEGOTIATION', 'CLOSED', 'LOST']
const scores = ['HOT', 'WARM', 'COLD']

export default async function LeadsPage({ searchParams }: PageProps) {
  const { leads, total, page, pages } = await getLeads(searchParams)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">Leads</h1>
          <p className="text-white/40 text-sm mt-1">{total} total leads</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 bg-charcoal-900 border border-white/10 rounded-xl p-4">
        <div className="flex items-center gap-2">
          <span className="text-white/40 text-xs">Score:</span>
          {scores.map((s) => (
            <Link key={s} href={`/admin/leads?score=${s}${searchParams.status ? `&status=${searchParams.status}` : ''}`}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors border ${
                searchParams.score === s ? getLeadScoreColor(s) : 'border-white/10 text-white/40 hover:text-white'}`}>
              {s}
            </Link>
          ))}
          {searchParams.score && <Link href="/admin/leads" className="text-white/30 text-xs hover:text-white">Clear</Link>}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white/40 text-xs">Status:</span>
          <select
            defaultValue={searchParams.status || ''}
            className="bg-charcoal-800 border border-white/10 rounded-lg px-3 py-1 text-white text-xs focus:outline-none"
            onChange={(e) => { if (typeof window !== 'undefined') window.location.href = `/admin/leads?status=${e.target.value}` }}
          >
            <option value="">All Statuses</option>
            {statuses.map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-charcoal-900 border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                {['Name', 'Phone', 'Budget', 'Location', 'Type', 'Purpose', 'Timeline', 'Score', 'Status', 'Source', 'Date', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-white/40 text-xs font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-white font-medium">{lead.fullName}</p>
                    {lead.email && <p className="text-white/40 text-xs mt-0.5">{lead.email}</p>}
                  </td>
                  <td className="px-4 py-3 text-white/70">{lead.phone}</td>
                  <td className="px-4 py-3 text-white/70">{lead.budget || '—'}</td>
                  <td className="px-4 py-3 text-white/70">{lead.preferredLocation || '—'}</td>
                  <td className="px-4 py-3 text-white/70">{lead.propertyType || '—'}</td>
                  <td className="px-4 py-3 text-white/70">{lead.purpose || '—'}</td>
                  <td className="px-4 py-3 text-white/70">{lead.timeline || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${getLeadScoreColor(lead.score)}`}>
                      {lead.score}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getLeadStatusColor(lead.status)}`}>
                      {lead.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white/40 text-xs">{lead.source}</td>
                  <td className="px-4 py-3 text-white/40 text-xs">{formatDateShort(lead.createdAt)}</td>
                  <td className="px-4 py-3">
                    <a href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hi ${lead.fullName}, I'm calling from 3S Real Estate regarding your property inquiry.`}
                      target="_blank" rel="noopener noreferrer"
                      className="text-green-400 hover:text-green-300 text-xs font-medium">
                      WhatsApp
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex justify-center gap-2 p-4 border-t border-white/10">
            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
              <Link key={p} href={`/admin/leads?page=${p}${searchParams.score ? `&score=${searchParams.score}` : ''}`}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium transition-colors ${
                  p === page ? 'bg-gold-gradient text-white' : 'bg-white/5 text-white/50 hover:text-white'}`}>
                {p}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
