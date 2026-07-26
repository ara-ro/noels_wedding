import heroPhoto from '../assets/photos/hero.jpg'
import { useSenderProfile } from '../hooks/useSenderProfile'

const NAMES = {
  groom: { name: '이율재' },
  bride: { name: '김정은' },
}

export function MainVisual() {
  const profile = useSenderProfile()
  const [first, second] = profile.nameOrder.map((key) => NAMES[key])

  return (
    <section id="hero" className="relative h-[calc(100svh-3rem)] min-h-[560px] w-full overflow-hidden">
      <img
        src={heroPhoto}
        alt={`${NAMES.groom.name}, ${NAMES.bride.name}`}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/15 via-ink/5 to-ink/75" />
      <div className="absolute inset-0 flex flex-col items-center justify-end gap-4 px-8 pb-14 text-center text-paper">
        <p className="font-serif text-[13px] tracking-[0.32em] text-paper/85">THE WEDDING OF</p>
        <h1 className="font-serif text-[32px] font-semibold leading-snug">
          {first.name} <span className="mx-1">·</span> {second.name}
        </h1>
        <div className="h-px w-7 bg-paper/55" />
        <p className="text-[15px] font-light leading-relaxed">
          2026년 11월 7일 토요일 오후 12시
          <br />
          혜화동성당
        </p>
      </div>
    </section>
  )
}
