import { prisma } from '@/lib/prisma'
import { formatPriceINR, getLeadScoreColor, getLeadStatusColor, formatDateShort } from '@/lib/utils'
import { Users, Building2, TrendingUp, MessageSquare, Calendar, Eye, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Dashboard | 3S Real Estate Admin' }

async function getDashboardData() {
  const [
    totalLeads, hotLeads, warmLeads, coldLeads,
    totalProperties, totalInquiries, unreadInquiries, pendingAppointments,
    recentLeads, recentInquiries,
  ] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { score: 'HOT' } }),
    prisma.lead.count({ where: { score: 'WARM' } }),
    prisma.lead.count({ where: { score: 'COLD' } }),
    prisma.property.count(),
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: { isRead: false } }),
    prisma.appointment.count({ where: { status: 'PENDING' } }),
    prisma.lead.findMany({ orderBy: { createdAt: 'desc' }, take: 8, include: { assignedTo: { select: { name: true } } } }),
    prisma.inquiry.findMany({ orderBy: { createdAt: 'desc' }, take: 5, include: { property: { select: { title: true } } } }),
  ])
  return { totalLeads, hotLeads, warmLeads, coldLeads, totalProperties, totalInquiries, unreadInquiries, pendingAppointments, recentLeads, recentInquiries }
}

export default async function AdminDashboard() {
  const data = await getDashboardData()
  const conversionRate = data.totalLeads > 0 ? ((data.hotLeads / data.totalLeads) * 100).toFixed(1) : '0'

  const statCards = [
    { label: 'Total Leads', value: data.totalLeads, sub: `${data.hotLeads} Hot`, icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Properties', value: data.totalProperties, sub: 'Active listings', icon: Building2, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'Conversion Rate', value: `${conversionRate}%`, sub: 'Hot lead ratio', icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'Inquiries', value: data.totalInquiries, sub: `${data.unreadInquiries} unread`, icon: MessageSquare, color: 'text-amber-400', bg: 'bg-amber-400/10' },
    { label: 'Appointments', value: data.pendingAppointments, sub: 'Pending visits', icon: Calendar, color: 'text-rose-400', bg: 'bg-rose-400/10' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-white">Dashboard</h1>
        <p className="text-white/40 text-sm mt-1">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.map(({ label, value, sub, icon: Icon, color, bg }) => (
          <div key={label} className="bg-charcoal-900 border border-white/10 rounded-xl p-5">
            <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center mb-3`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <p className="text-2xl font-heading font-bold text-white">{value}</p>
            <p className="text-white/60 text-xs mt-0.5">{label}</p>
            <p className="text-white/30 text-xs mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      {/* Lead score breakdown */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: '🔥 Hot Leads', value: data.hotLeads, color: 'border-red-500/30 bg-red-500/5', text: 'text-red-400' },
          { label: '🌡️ Warm Leads', value: data.warmLeads, color: 'border-orange-500/30 bg-orange-500/5', text: 'text-orange-400' },
          { label: '❄️ Cold Leads', value: data.coldLeads, color: 'border-blue-500/30 bg-blue-500/5', text: 'text-blue-400' },
        ].map(({ label, value, color, text }) => (
          <div key={label} className={`border rounded-xl p-5 text-center ${color}`}>
            <p className={`text-3xl font-heading font-bold ${text}`}>{value}</p>
            <p className="text-white/60 text-sm mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent leads */}
        <div className="bg-charcoal-900 border border-white/10 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-white/10">
            <h2 className="text-white font-semibold">Recent Leads</h2>
            <Link href="/admin/leads" className="text-gold-400 text-xs hover:text-gold-300 flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {data.recentLeads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gold-500/20 rounded-full flex items-center justify-center text-gold-400 text-xs font-bold shrink-0">
                    {lead.fullName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium leading-none">{lead.fullName}</p>
                    <p className="text-white/40 text-xs mt-0.5">{lead.phone} · {lead.preferredLocation || 'Any'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${getLeadScoreColor(lead.score)}`}>
                    {lead.score}
                  </span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getLeadStatusColor(lead.status)}`}>
                    {lead.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent inquiries */}
        <div className="bg-charcoal-900 border border-white/10 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-white/10">
            <h2 className="text-white font-semibold">Recent Inquiries</h2>
            <Link href="/admin/inquiries" className="text-gold-400 text-xs hover:text-gold-300 flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {data.recentInquiries.map((inq) => (
              <div key={inq.id} className="p-4 hover:bg-white/5 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-white text-sm font-medium">{inq.name}</p>
                    <p className="text-white/40 text-xs mt-0.5">{inq.phone}</p>
                    {inq.property && <p className="text-gold-400 text-xs mt-1 truncate max-w-[200px]">{inq.property.title}</p>}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {!inq.isRead && <span className="w-2 h-2 rounded-full bg-gold-500" />}
                    <p className="text-white/30 text-xs">{formatDateShort(inq.createdAt)}</p>
                  </div>
                </div>
                {inq.message && <p className="text-white/40 text-xs mt-2 line-clamp-1">{inq.message}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
