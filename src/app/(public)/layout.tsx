import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { FloatingActions } from '@/components/shared/floating-actions'
import { getLiveConfig } from '@/lib/site-config'

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const config = await getLiveConfig()

  return (
    <>
      <Navbar config={config} />
      <main className="min-h-screen pt-20">{children}</main>
      <Footer config={config} />
      <FloatingActions config={config} />
    </>
  )
}