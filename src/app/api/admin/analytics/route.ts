// src/app/api/admin/analytics/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session || !['ADMIN', 'SUPER_ADMIN'].includes(session.user.role as string)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  const [
    totalLeads,
    hotLeads,
    warmLeads,
    coldLeads,
    newLeadsThisWeek,
    totalProperties,
    availableProperties,
    featuredProperties,
    totalUsers,
    totalInquiries,
    unreadInquiries,
    pendingAppointments,
    recentLeads,
    leadsByStatus,
    propertiesByType,
  ] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { score: 'HOT' } }),
    prisma.lead.count({ where: { score: 'WARM' } }),
    prisma.lead.count({ where: { score: 'COLD' } }),
    prisma.lead.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    prisma.property.count(),
    prisma.property.count({ where: { status: 'AVAILABLE' } }),
    prisma.property.count({ where: { isFeatured: true } }),
    prisma.user.count(),
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: { isRead: false } }),
    prisma.appointment.count({ where: { status: 'PENDING' } }),
    prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: { assignedTo: { select: { name: true } } },
    }),
    prisma.lead.groupBy({
      by: ['status'],
      _count: { status: true },
    }),
    prisma.property.groupBy({
      by: ['type'],
      _count: { type: true },
    }),
  ])

  // Monthly lead trend (last 6 months)
  const leadTrend = await prisma.$queryRaw`
    SELECT 
      DATE_TRUNC('month', "createdAt") as month,
      COUNT(*) as count,
      SUM(CASE WHEN score = 'HOT' THEN 1 ELSE 0 END) as hot,
      SUM(CASE WHEN score = 'WARM' THEN 1 ELSE 0 END) as warm,
      SUM(CASE WHEN score = 'COLD' THEN 1 ELSE 0 END) as cold
    FROM leads
    WHERE "createdAt" >= NOW() - INTERVAL '6 months'
    GROUP BY DATE_TRUNC('month', "createdAt")
    ORDER BY month ASC
  `

  return NextResponse.json({
    overview: {
      totalLeads,
      hotLeads,
      warmLeads,
      coldLeads,
      newLeadsThisWeek,
      totalProperties,
      availableProperties,
      featuredProperties,
      totalUsers,
      totalInquiries,
      unreadInquiries,
      pendingAppointments,
      conversionRate: totalLeads > 0 ? ((hotLeads / totalLeads) * 100).toFixed(1) : '0',
    },
    recentLeads,
    leadsByStatus,
    propertiesByType,
    leadTrend,
  })
}
