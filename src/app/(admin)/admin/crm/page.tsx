import { prisma } from '@/lib/prisma'
import { getLeadScoreColor } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'CRM Pipeline | 3S Admin' }

const stages = [
  { key: 'NEW', label: 'New', color: 'border-blue-500/30 bg-blue-500/5' },
  { key: 'CONTACTED', label: 'Contacted', color: 'border-yellow-500/30 bg-yellow-500/5' },
  { key: 'INTERESTED', label: 'Interested', color: 'border-purple-500/30 bg-purple-500/5' },
  { key: 'SITE_VISIT', label: 'Site Visit', color: 'border-orange-500/30 bg-orange-500/5' },
  { key: 'NEGOTIATION', label: 'Negotiation', color: 'border-amber-500/30 bg-amber-500/5' },
  { key: 'CLOSED', label: 'Closed', color: 'border-green-500/30 bg-green-500/5' },
]

export default async function CRMPage() {
  const leads = await prisma.lead.findMany({
    where: { status: { not: 'LOST' } },
    orderBy: { createdAt: 'desc' },
    include: { assignedTo: { select: { name: true } } },
  })

  const grouped = stages.map((stage) => ({
    ...stage,
    leads: leads.filter((l) => l.status === stage.key),
  }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-white">CRM Pipeline</h1>
        <p className="text-white/40 text-sm mt-1">Drag-and-drop kanban view of your lead pipeline</p>
      </div>

      {/* Pipeline summary */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {grouped.map((stage) => (
          <div key={stage.key} className="flex items-center gap-2 bg-charcoal-900 border border-white/10 rounded-lg px-4 py-2 whitespace-nowrap">
            <span className="text-white/60 text-xs">{stage.label}</span>
            <span className="bg-white/10 text-white text-xs font-bold px-2 py-0.5 rounded-full">{stage.leads.length}</span>
          </div>
        ))}
      </div>

      {/* Kanban board */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto">
        {grouped.map((stage) => (
          <div key={stage.key} className={`min-w-[200px] border rounded-xl p-3 ${stage.color}`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white/80 text-xs font-semibold uppercase tracking-wide">{stage.label}</h3>
              <span className="bg-white/10 text-white/60 text-xs px-1.5 py-0.5 rounded-full">{stage.leads.length}</span>
            </div>
            <div className="space-y-2">
              {stage.leads.map((lead) => (
                <div key={lead.id} className="bg-charcoal-900 border border-white/10 rounded-lg p-3 hover:border-white/20 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-white text-xs font-semibold truncate">{lead.fullName}</p>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${getLeadScoreColor(lead.score)}`}>
                      {lead.score.charAt(0)}
                    </span>
                  </div>
                  <p className="text-white/40 text-[10px]">{lead.phone}</p>
                  {lead.preferredLocation && <p className="text-white/30 text-[10px] mt-0.5">📍 {lead.preferredLocation}</p>}
                  {lead.budget && <p className="text-gold-400 text-[10px] mt-0.5">💰 {lead.budget}</p>}
                  {lead.timeline && <p className="text-white/30 text-[10px] mt-0.5">⏱️ {lead.timeline}</p>}
                  <div className="mt-2 flex gap-1">
                    <a href={`tel:${lead.phone}`} className="flex-1 text-center py-1 bg-white/5 text-white/50 text-[10px] rounded hover:bg-white/10 transition-colors">Call</a>
                    <a href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer"
                      className="flex-1 text-center py-1 bg-green-500/10 text-green-400 text-[10px] rounded hover:bg-green-500/20 transition-colors">WA</a>
                  </div>
                </div>
              ))}
              {stage.leads.length === 0 && (
                <div className="text-center py-6 text-white/20 text-xs">No leads</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
