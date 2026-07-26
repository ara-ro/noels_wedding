export function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-9 flex flex-col items-center gap-3 text-center">
      <p className="text-[11px] font-medium tracking-[0.28em] text-teal">{eyebrow}</p>
      <h2 className="font-serif text-2xl font-semibold text-green">{title}</h2>
    </div>
  )
}
