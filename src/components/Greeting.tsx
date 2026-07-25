import { weddingInfo } from '../config/weddingInfo'
import { useSenderProfile } from '../hooks/useSenderProfile'

export function Greeting() {
  const profile = useSenderProfile()

  return (
    <section className="border-t border-neutral-100 px-6 py-16 text-center">
      <h2 className="mb-6 text-lg font-medium text-neutral-800">초대합니다</h2>
      <div className="space-y-3 text-neutral-600">
        {weddingInfo.greeting.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <p className="mt-8 text-sm text-neutral-400">{profile.greetingLabel}</p>
    </section>
  )
}
