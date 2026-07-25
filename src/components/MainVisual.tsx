import { weddingInfo } from '../config/weddingInfo'
import { useSenderProfile } from '../hooks/useSenderProfile'

function formatDateNumerals(iso: string): string {
  const date = new Date(iso)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year} · ${month} · ${day}`
}

function formatWeekdayEn(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()
}

export function MainVisual() {
  const profile = useSenderProfile()
  const [first, second] = profile.nameOrder.map((key) => weddingInfo[key])

  return (
    <section className="flex flex-col items-center">
      <img
        src={weddingInfo.heroPhoto}
        alt={`${weddingInfo.groom.name}, ${weddingInfo.bride.name}`}
        className="aspect-[4/5] w-full object-cover"
      />
      <div className="flex flex-col items-center gap-6 px-6 py-14 text-center">
        <p className="text-xs tracking-[0.4em] text-gold">WEDDING INVITATION</p>
        <div>
          <p className="text-3xl font-bold tracking-widest text-ink">{formatDateNumerals(weddingInfo.weddingDateTime)}</p>
          <p className="mt-1 text-xs tracking-[0.3em] text-ink/40">{formatWeekdayEn(weddingInfo.weddingDateTime)}</p>
        </div>
        <h1 className="text-2xl font-bold text-green">
          {first.name} <span className="mx-1 text-gold">♥</span> {second.name}
        </h1>
        <p className="text-sm text-ink/50">{weddingInfo.weddingDateLabel}</p>
      </div>
    </section>
  )
}
