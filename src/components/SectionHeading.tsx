export function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-8 flex flex-col items-center gap-2 text-center">
      <span className="text-gold">✦</span>
      <p className="text-xs font-bold tracking-[0.35em] text-gold">{eyebrow}</p>
      <h2 className="text-lg font-bold text-green">{title}</h2>
    </div>
  )
}
