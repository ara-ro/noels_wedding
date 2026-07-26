import { SectionHeading } from './SectionHeading'

const CEREMONY_NOTICE = ['화환은 쌀화환만 접수하며, 보내주신 쌀은 불우이웃돕기에 사용됩니다.']

export function CeremonyNotice() {
  return (
    <section className="bg-paper px-9 py-20 text-center">
      <SectionHeading eyebrow="INFORMATION" title="예식 안내" />
      <div className="space-y-2 text-sm leading-relaxed text-ink/60">
        {CEREMONY_NOTICE.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </section>
  )
}
