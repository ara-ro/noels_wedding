import { weddingInfo } from '../config/weddingInfo'
import { useSenderProfile } from '../hooks/useSenderProfile'

export function Greeting() {
  const profile = useSenderProfile()

  return (
    <section className="bg-paper px-9 py-20 text-center">
      <p className="mb-5 text-[11px] font-medium tracking-[0.28em] text-teal">INVITATION</p>
      <div className="mx-auto mb-7 h-3 w-3 rotate-45 bg-gold" />
      <div className="font-serif text-[17px] leading-[2.05] text-ink" style={{ wordBreak: 'keep-all' }}>
        {weddingInfo.greeting.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      {profile.greetingLabel && <p className="mt-8 text-sm text-ink/50">{profile.greetingLabel}</p>}
      <div className="mt-9 flex items-center justify-center gap-3.5 font-serif text-lg font-semibold text-green">
        <span>{weddingInfo.groom.name}</span>
        <span className="text-sm font-normal text-gold">&amp;</span>
        <span>{weddingInfo.bride.name}</span>
      </div>
    </section>
  )
}
