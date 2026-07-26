import { weddingInfo } from '../config/weddingInfo'

export function LoveQuote() {
  const { lines, source } = weddingInfo.loveQuote

  return (
    <section className="bg-paper px-9 pb-4 pt-20 text-center">
      <div className="space-y-2 font-serif text-[15px] leading-loose text-ink/70">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <p className="mt-6 text-xs tracking-widest text-teal">- {source} -</p>
    </section>
  )
}
