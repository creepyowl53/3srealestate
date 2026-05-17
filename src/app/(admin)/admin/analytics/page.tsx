import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'
import { AnalyticsCharts } from '@/components/admin/analytics-charts'

export const metadata: Metadata = { title: 'Analytics | 3S Admin' }

async function getAnalyticsData() {
  const [leadsByScore, leadsByStatus, propertiesByType, leadsByMonth] = await Promise.all([
    prisma.lead.groupBy({ by: ['score'], _count: { score: true } }),
    prisma.lead.groupBy({ by: ['status'], _count: { status: true } }),
    prisma.property.groupBy({ by: ['type'], _count: { type: true } }),
    prisma.lead.findMany({
      select: { createdAt: true, score: true },
      orderBy: { createdAt: 'asc' },
    }),
  ])

  // Build monthly trend
  const monthMap: Record<string, { month: string; hot: number; warm: number; cold: number; total: number }> = {}
  leadsByMonth.forEach((lead) => {
    const key = new Date(lead.createdAt).toLocaleDateString('en-IN', { month: 'short', year: '2-digit' })
    if (!monthMap[key]) monthMap[key] = { month: key, hot: 0, warm: 0, cold: 0, total: 0 }
    monthMap[key].total++
    if (lead.score === 'HOT') monthMap[key].hot++
    else if (lead.score === 'WARM') monthMap[key].warm++
    else monthMap[key].cold++
  })

  return {
    leadsByScore: leadsByScore.map((l) => ({ name: l.score, value: l._count.score })),
    leadsByStatus: leadsByStatus.map((l) => ({ name: l.status.replace('_', ' '), value: l._count.status })),
    propertiesByType: propertiesByType.map((p) => ({ name: p.type, value: p._count.type })),
    monthlyTrend: Object.values(monthMap).slice(-6),
  }
}

export default async function AnalyticsPage() {
  const data = await getAnalyticsData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-white">Analytics</h1>
        <p className="text-white/40 text-sm mt-1">Platform performance overview</p>
      </div>
      <AnalyticsCharts data={data} />
    </div>
  )
}
