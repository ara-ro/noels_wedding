import { weddingInfo } from '../config/weddingInfo'
import { useSenderProfile } from '../hooks/useSenderProfile'

export function Greeting() {
  const profile = useSenderProfile()

  return (
    <section className="border-t border-gold/30 px-6 py-16 text-center">
      <h2 className="mb-6 text-lg font-bold tracking-widest text-green">초대합니다</h2>
      <div className="space-y-3 leading-loose text-ink/80">
        {weddingInfo.greeting.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <p className="mt-8 text-sm text-ink/50">{profile.greetingLabel}</p>
    </section>
  )
}
