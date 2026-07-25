import { weddingInfo } from '../config/weddingInfo'

export function LoveQuote() {
  const { lines, source } = weddingInfo.loveQuote

  return (
    <section className="px-6 pb-16 pt-20 text-center">
      <div className="space-y-2 text-sm leading-loose text-ink/70">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <p className="mt-6 text-xs tracking-widest text-gold">- {source} -</p>
    </section>
  )
}
