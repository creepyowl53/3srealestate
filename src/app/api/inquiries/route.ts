// src/app/api/inquiries/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { inquirySchema } from '@/lib/validations'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = inquirySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        name: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email || null,
        message: parsed.data.message || null,
        propertyId: parsed.data.propertyId || null,
      },
    })

    // Also create a lead from inquiry
    await prisma.lead.upsert({
      where: { id: 'will-not-match' },
      update: {},
      create: {
        fullName: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email || null,
        source: 'property_inquiry',
        score: 'WARM',
      },
    }).catch(() => {}) // Ignore if duplicate

    return NextResponse.json({ success: true, inquiryId: inquiry.id }, { status: 201 })
  } catch (error) {
    console.error('Inquiry error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
