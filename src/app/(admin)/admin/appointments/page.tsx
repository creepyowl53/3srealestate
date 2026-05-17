import { prisma } from '@/lib/prisma'
import { formatDate, formatDateShort } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Appointments | 3S Admin' }

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
  CONFIRMED: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  COMPLETED: 'bg-green-500/10 text-green-400 border border-green-500/20',
  CANCELLED: 'bg-red-500/10 text-red-400 border border-red-500/20',
}

export default async function AppointmentsPage() {
  const appointments = await prisma.appointment.findMany({
    orderBy: { date: 'asc' },
    include: { property: { select: { title: true, slug: true } } },
  })

  const pending = appointments.filter((a) => a.status === 'PENDING')
  const others = appointments.filter((a) => a.status !== 'PENDING')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-white">Appointments</h1>
        <p className="text-white/40 text-sm mt-1">{pending.length} pending · {appointments.length} total</p>
      </div>

      {/* Pending */}
      {pending.length > 0 && (
        <div>
          <h2 className="text-white/60 text-xs uppercase tracking-widest mb-3">Pending Site Visits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pending.map((appt) => (
              <div key={appt.id} className="bg-charcoal-900 border border-yellow-500/20 rounded-xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-white font-semibold">{appt.name}</p>
                    <p className="text-white/40 text-xs">{appt.phone}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[appt.status]}`}>
                    {appt.status}
                  </span>
                </div>
                <div className="bg-white/5 rounded-lg p-3 mb-3">
                  <p className="text-gold-400 font-semibold text-sm">{formatDate(appt.date)}</p>
                  <p className="text-white/40 text-xs mt-0.5">
                    {new Date(appt.date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {appt.property && (
                  <p className="text-white/50 text-xs line-clamp-1 mb-3">📍 {appt.property.title}</p>
                )}
                {appt.message && <p className="text-white/40 text-xs italic line-clamp-2 mb-3">"{appt.message}"</p>}
                <div className="flex gap-2">
                  <a href={`tel:${appt.phone}`}
                    className="flex-1 text-center py-2 bg-blue-500/10 text-blue-400 text-xs rounded-lg hover:bg-blue-500/20 transition-colors">
                    Call
                  </a>
                  <a href={`https://wa.me/${appt.phone.replace(/[^0-9]/g, '')}?text=Hi ${appt.name}, confirming your site visit appointment.`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex-1 text-center py-2 bg-green-500/10 text-green-400 text-xs rounded-lg hover:bg-green-500/20 transition-colors">
                    WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All appointments table */}
      <div>
        <h2 className="text-white/60 text-xs uppercase tracking-widest mb-3">All Appointments</h2>
        <div className="bg-charcoal-900 border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                {['Client', 'Phone', 'Date & Time', 'Property', 'Status', 'Booked On'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-white/40 text-xs font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {appointments.map((appt) => (
                <tr key={appt.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-5 py-3">
                    <p className="text-white font-medium">{appt.name}</p>
                    {appt.email && <p className="text-white/30 text-xs">{appt.email}</p>}
                  </td>
                  <td className="px-5 py-3 text-white/60">{appt.phone}</td>
                  <td className="px-5 py-3">
                    <p className="text-white/80 text-sm">{formatDateShort(appt.date)}</p>
                    <p className="text-white/40 text-xs">{new Date(appt.date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</p>
                  </td>
                  <td className="px-5 py-3 text-white/60 text-xs max-w-[160px] truncate">
                    {appt.property?.title || '—'}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColors[appt.status]}`}>
                      {appt.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-white/40 text-xs">{formatDateShort(appt.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
