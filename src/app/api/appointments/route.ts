import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { appointmentSchema } from '@/lib/validations'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = appointmentSchema.safeParse(body)
    if (!parsed.success) return NextResponse.json({ error: 'Invalid data' }, { status: 400 })

    const appt = await prisma.appointment.create({
      data: {
        name: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email || null,
        date: new Date(parsed.data.date),
        message: parsed.data.message || null,
        propertyId: parsed.data.propertyId || null,
      },
    })
    return NextResponse.json({ success: true, id: appt.id }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const where: any = {}
  if (status) where.status = status

  const appointments = await prisma.appointment.findMany({
    where,
    orderBy: { date: 'asc' },
    include: { property: { select: { title: true, slug: true } } },
  })
  return NextResponse.json({ appointments })
}
