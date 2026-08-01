import type { ReactNode } from 'react'

export function SectionHeading({ eyebrow, title }: { eyebrow: ReactNode; title: string }) {
  return (
    <div className="mb-6 flex flex-col items-center gap-3 text-center">
      {typeof eyebrow === 'string' ? (
        <p className="text-[11px] font-medium tracking-[0.28em] text-teal">{eyebrow}</p>
      ) : (
        eyebrow
      )}
      <h2 className="font-serif text-2xl font-semibold text-green">{title}</h2>
    </div>
  )
}
