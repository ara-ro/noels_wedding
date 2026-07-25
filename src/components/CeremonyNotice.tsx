import { weddingInfo } from '../config/weddingInfo'
import { SectionHeading } from './SectionHeading'

export function CeremonyNotice() {
  return (
    <section className="px-6 py-16 text-center">
      <SectionHeading eyebrow="INFORMATION" title="예식 안내" />
      <div className="space-y-2 text-sm text-ink/70">
        {weddingInfo.ceremonyNotice.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </section>
  )
}
