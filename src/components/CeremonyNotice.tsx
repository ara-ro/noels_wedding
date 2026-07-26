import { weddingInfo } from '../config/weddingInfo'
import { SectionHeading } from './SectionHeading'

export function CeremonyNotice() {
  return (
    <section className="bg-paper px-9 py-20 text-center">
      <SectionHeading eyebrow="INFORMATION" title="예식 안내" />
      <div className="space-y-2 text-sm leading-relaxed text-ink/60">
        {weddingInfo.ceremonyNotice.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </section>
  )
}
