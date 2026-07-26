import { useSenderProfile } from '../hooks/useSenderProfile'

const GREETING_LINES = ['축복의 자리에 귀한 걸음 하시어', '저희의 새로운 시작을 함께해 주세요.']

export function Greeting() {
  const profile = useSenderProfile()

  return (
    <section className="bg-white px-9 py-16 text-center">
      <p className="mb-5 text-[11px] font-medium tracking-[0.28em] text-teal">INVITATION</p>
      <div className="mx-auto mb-7 h-3 w-3 rotate-45 bg-gold" />
      <div className="font-serif text-[17px] leading-[2.05] text-ink" style={{ wordBreak: 'keep-all' }}>
        {GREETING_LINES.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      {profile.greetingLabel && <p className="mt-8 text-sm text-ink/50">{profile.greetingLabel}</p>}
      <div className="mt-9 flex items-center justify-center gap-3.5 font-serif text-lg font-semibold text-green">
        <span>이율재</span>
        <span className="text-sm font-normal text-gold">&amp;</span>
        <span>김정은</span>
      </div>
    </section>
  )
}
