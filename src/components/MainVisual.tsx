import { weddingInfo } from '../config/weddingInfo'
import { useSenderProfile } from '../hooks/useSenderProfile'

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
      <div className="flex flex-col items-center justify-center gap-5 px-6 py-12 text-center">
        <p className="text-sm tracking-[0.4em] text-gold">청 첩 장</p>
        <h1 className="text-3xl font-bold tracking-wide text-green">
          {first.name} <span className="text-gold">·</span> {second.name}
        </h1>
        <p className="text-ink/60">{weddingInfo.weddingDateLabel}</p>
      </div>
    </section>
  )
}
