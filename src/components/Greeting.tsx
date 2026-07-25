import { weddingInfo } from '../config/weddingInfo'
import { useSenderProfile } from '../hooks/useSenderProfile'
import { SectionHeading } from './SectionHeading'

export function Greeting() {
  const profile = useSenderProfile()

  return (
    <section className="px-6 py-16 text-center">
      <SectionHeading eyebrow="INVITATION" title="초대합니다" />
      <div className="space-y-3 leading-loose text-ink/80">
        {weddingInfo.greeting.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      {profile.greetingLabel && <p className="mt-8 text-sm text-ink/50">{profile.greetingLabel}</p>}
    </section>
  )
}
