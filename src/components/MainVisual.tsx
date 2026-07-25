import { weddingInfo } from '../config/weddingInfo'
import { useSenderProfile } from '../hooks/useSenderProfile'

export function MainVisual() {
  const profile = useSenderProfile()
  const [first, second] = profile.nameOrder.map((key) => weddingInfo[key])

  return (
    <section className="flex flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <p className="text-sm tracking-widest text-neutral-400">WEDDING INVITATION</p>
      <h1 className="text-3xl font-medium text-neutral-800">
        {first.name} <span className="text-neutral-300">&amp;</span> {second.name}
      </h1>
      <p className="text-neutral-500">{weddingInfo.weddingDateLabel}</p>
    </section>
  )
}
