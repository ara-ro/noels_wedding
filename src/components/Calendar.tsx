import { weddingInfo } from '../config/weddingInfo'

function getDDayLabel(dateStr: string): string {
  const target = new Date(dateStr)
  target.setHours(0, 0, 0, 0)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const diffDays = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  if (diffDays > 0) return `D-${diffDays}`
  if (diffDays === 0) return 'D-Day'
  return `D+${Math.abs(diffDays)}`
}

export function Calendar() {
  return (
    <section className="border-t border-gold/30 px-6 py-16 text-center">
      <p className="text-sm text-ink/50">{weddingInfo.weddingDateLabel}</p>
      <p className="mt-2 text-2xl font-bold text-green">{getDDayLabel(weddingInfo.weddingDate)}</p>
    </section>
  )
}
