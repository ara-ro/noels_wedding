import { weddingInfo } from '../config/weddingInfo'
import { SectionHeading } from './SectionHeading'

export function CeremonyOrder() {
  return (
    <section className="px-6 py-16">
      <SectionHeading eyebrow="CEREMONY" title="예식 순서" />
      <p className="mb-8 text-center text-xs text-ink/40">세부 순서는 당일 사정에 따라 달라질 수 있습니다.</p>
      <div className="space-y-8">
        {weddingInfo.ceremonyOrder.map((section) => (
          <div key={section.title} className="text-center">
            <p className="mb-3 text-sm font-bold tracking-widest text-gold">{section.title}</p>
            <ul className="space-y-1.5">
              {section.items.map((item) => (
                <li key={item.label} className="text-sm text-ink/80">
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
