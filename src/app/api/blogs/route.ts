import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { slugify } from '@/lib/utils'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const category = searchParams.get('category')
  const published = searchParams.get('published')

  const where: any = {}
  if (category) where.category = { slug: category }
  if (published === 'true') where.isPublished = true
  if (published === 'false') where.isPublished = false

  const [blogs, total] = await Promise.all([
    prisma.blog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      include: { category: true },
    }),
    prisma.blog.count({ where }),
  ])
  return NextResponse.json({ blogs, total, page, pages: Math.ceil(total / limit) })
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session || !['ADMIN', 'SUPER_ADMIN'].includes(session.user.role as string)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const body = await req.json()
    const slug = slugify(body.title)
    const blog = await prisma.blog.create({
      data: {
        ...body,
        slug,
        publishedAt: body.isPublished ? new Date() : null,
      },
    })
    return NextResponse.json({ success: true, blog }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
