# 3S Real Estate Platform

**Smart • Secure • Sophisticated** — Tricity's premium real estate platform.

A production-ready, full-stack real estate platform built for Mohali, Chandigarh, Zirakpur & surrounding Punjab markets.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 App Router, React, TypeScript |
| Styling | Tailwind CSS, Framer Motion, ShadCN UI |
| Backend | Next.js API Routes, Server Actions |
| Database | PostgreSQL + Prisma ORM |
| Auth | NextAuth v5 (Auth.js) |
| Storage | Cloudinary |
| State | Zustand |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Deploy | Vercel |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (public)/          # Public website pages
│   │   ├── properties/    # Property listings
│   │   ├── property/[slug]/ # Property detail
│   │   ├── about/
│   │   ├── contact/
│   │   ├── blogs/
│   │   ├── blog/[slug]/
│   │   ├── services/
│   │   ├── investment/
│   │   ├── nri/
│   │   ├── calculator/
│   │   ├── privacy/
│   │   └── terms/
│   ├── (auth)/            # Auth pages
│   │   ├── login/
│   │   └── register/
│   ├── (admin)/           # Admin dashboard
│   │   └── admin/
│   │       ├── page.tsx   # Dashboard
│   │       ├── leads/
│   │       ├── crm/
│   │       ├── properties/
│   │       ├── blogs/
│   │       ├── appointments/
│   │       ├── inquiries/
│   │       ├── analytics/
│   │       └── settings/
│   ├── api/               # API routes
│   │   ├── leads/
│   │   ├── properties/
│   │   ├── inquiries/
│   │   ├── blogs/
│   │   ├── appointments/
│   │   ├── contact/
│   │   ├── upload/
│   │   ├── auth/
│   │   └── admin/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── home/              # Homepage sections
│   ├── property/          # Property components
│   ├── lead/              # Lead capture
│   ├── admin/             # Admin components
│   ├── layout/            # Navbar, Footer
│   ├── shared/            # Shared utilities
│   └── ui/                # UI primitives
├── lib/
│   ├── auth.ts            # NextAuth config
│   ├── prisma.ts          # Prisma client
│   ├── utils.ts           # Helpers
│   ├── validations.ts     # Zod schemas
│   └── lead-scoring.ts    # Lead scoring logic
├── store/                 # Zustand store
├── types/                 # TypeScript types
└── middleware.ts           # Auth middleware
```

---

## ⚡ Quick Start

### 1. Clone & Install

```bash
git clone <repo-url>
cd 3s-real-estate
npm install
```

### 2. Environment Variables

```bash
cp .env.example .env
```

Fill in your `.env`:

```env
# Required
DATABASE_URL="postgresql://user:password@localhost:5432/3s_real_estate"
NEXTAUTH_SECRET="your-secret-min-32-chars"
NEXTAUTH_URL="http://localhost:3000"

# Cloudinary (for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_WHATSAPP_NUMBER="+919876543210"
```

### 3. Database Setup

```bash
# Push schema to database
npm run db:push

# Seed with demo data
npm run db:seed
```

### 4. Run Development Server

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🔐 Default Credentials

| Role | Email | Password |
|---|---|---|
| Super Admin | admin@3srealestate.com | Admin@123 |
| Agent | agent@3srealestate.com | Admin@123 |

Admin Panel: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🌟 Key Features

### Lead Generation
- Smart popup with 3-step lead capture on website entry
- Intelligent lead scoring: HOT / WARM / COLD
- Duplicate detection (24-hour window)
- WhatsApp integration for instant follow-up

### CRM Pipeline
- Kanban board: New → Contacted → Interested → Site Visit → Negotiation → Closed
- Lead notes, follow-ups, and reminders
- Agent assignment

### Property Management
- Full CRUD with images, amenities, nearby facilities
- Featured & luxury property flags
- RERA number, builder details
- SEO metadata per property

### Admin Dashboard
- Analytics with Recharts (lead trend, funnel, type breakdown)
- Real-time inquiry management
- Appointment scheduling
- Blog CMS

### SEO
- Dynamic `sitemap.xml` and `robots.txt`
- Per-page metadata
- OpenGraph & Twitter cards
- Local SEO pages for each city

---

## 🚀 Deployment (Vercel)

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo>
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → Import repository
2. Add all environment variables from `.env`
3. Set build command: `prisma generate && next build`
4. Deploy!

### 3. Database (Neon / Supabase)

Use [Neon](https://neon.tech) or [Supabase](https://supabase.com) for managed PostgreSQL.

```bash
# After deploying, run migrations
npx prisma migrate deploy
npx prisma db seed
```

---

## 📦 Available Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run db:push      # Push Prisma schema
npm run db:migrate   # Create migration
npm run db:seed      # Seed database
npm run db:studio    # Open Prisma Studio
npm run lint         # ESLint
```

---

## 🎨 Brand Colors

| Color | Hex | Usage |
|---|---|---|
| Gold | `#d4960a` | Primary brand, CTAs |
| Charcoal | `#0f0f0f` | Dark backgrounds |
| White | `#ffffff` | Text, cards |

---

## 📞 Support

**3S Real Estate**
- Website: [3srealestate.com](https://3srealestate.com)
- Email: info@3srealestate.com
- Phone: +91-98765-43210
- WhatsApp: +91-98765-43210

---

*Built with ❤️ for Tricity's finest real estate experience.*
