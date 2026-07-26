import { SectionHeading } from './SectionHeading'

const CEREMONY_NOTICE = [
  '화환은 쌀화환만 접수하며, 보내주신 쌀은 불우이웃돕기에 사용됩니다.',
  '혼인 미사 중에는 원활한 예식 진행을 위해 자리 이동 및 통로에서의 사진 촬영을 삼가 부탁드립니다.'
]

export function CeremonyNotice() {
  return (
    <section className="bg-paper px-9 py-20">
      <SectionHeading eyebrow="INFORMATION" title="예식 안내" />
      <ul className="space-y-1.5 text-sm leading-relaxed text-ink/60">
        {CEREMONY_NOTICE.map((line) => (
          <li key={line} className="flex items-start gap-2 text-[13px] leading-relaxed text-ink/60">
            <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rotate-45 bg-gold" />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
