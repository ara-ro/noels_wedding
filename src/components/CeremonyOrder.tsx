import { weddingInfo } from '../config/weddingInfo'
import { SectionHeading } from './SectionHeading'

export function CeremonyOrder() {
  return (
    <section className="bg-paper px-9 py-20 text-center">
      <SectionHeading eyebrow="ORDER OF MASS" title="혼배미사 순서" />
      <p className="mb-10 text-[13px] leading-relaxed text-ink/50">
        세부 순서는 당일 사정에 따라
        <br />
        달라질 수 있습니다.
      </p>
      <ol className="pl-1 text-left">
        {weddingInfo.ceremonyOrder.map((section, index) => {
          const isLast = index === weddingInfo.ceremonyOrder.length - 1
          return (
            <li key={section.title} className="flex gap-4 pb-8">
              <div className="flex flex-shrink-0 flex-col items-center">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green font-serif text-sm font-semibold text-paper">
                  {index + 1}
                </div>
                {!isLast && <div className="mt-1 w-px flex-1 bg-gold/40" />}
              </div>
              <div className="pb-1">
                <p className="mb-1.5 text-[15px] font-semibold text-ink">{section.title}</p>
                <p className="text-[13px] leading-relaxed text-ink/50">
                  {section.items.map((item) => item.label).join(' · ')}
                </p>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
