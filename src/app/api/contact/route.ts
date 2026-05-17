import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { contactFormSchema } from '@/lib/validations'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = contactFormSchema.safeParse(body)
    if (!parsed.success) return NextResponse.json({ error: 'Invalid data' }, { status: 400 })

    const entry = await prisma.contactForm.create({ data: parsed.data })
    return NextResponse.json({ success: true, id: entry.id }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function GET() {
  const contacts = await prisma.contactForm.findMany({ orderBy: { createdAt: 'desc' }, take: 50 })
  return NextResponse.json({ contacts })
}
