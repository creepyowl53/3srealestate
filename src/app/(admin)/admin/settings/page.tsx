import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'
import { AdminSettingsForm } from '@/components/admin/settings-form'

export const metadata: Metadata = { title: 'Settings | 3S Admin' }

export default async function SettingsPage() {
  const settings = await prisma.siteSettings.findMany()
  const settingsMap = Object.fromEntries(settings.map((s) => [s.key, s.value]))

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-heading font-bold text-white">Site Settings</h1>
        <p className="text-white/40 text-sm mt-1">Manage contact info, social links, and site configuration</p>
      </div>
      <AdminSettingsForm initialSettings={settingsMap} />
    </div>
  )
}
