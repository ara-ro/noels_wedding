import { SectionHeading } from './SectionHeading'

const CEREMONY_ORDER = [
  {
    title: '시작 예식',
    items: [{ label: '혼배 안내' }, { label: '입장식' }, { label: '인사' }, { label: '본기도' }],
  },
  {
    title: '말씀 전례',
    items: [{ label: '제1독서' }, { label: '화답송' }, { label: '복음' }, { label: '강론' }],
  },
  {
    title: '혼인 예식',
    items: [{ label: '혼인 서약' }, { label: '반지 교환' }, { label: '혼인 선언' }, { label: '신랑 신부를 위한 기도' }],
  },
  {
    title: '성찬 예식',
    items: [{ label: '예물 준비' }, { label: '감사 기도' }, { label: '주님의 기도' }, { label: '평화의 인사' }, { label: '영성체' }],
  },
  {
    title: '마침 예식',
    items: [{ label: '강복' }, { label: '파견' }],
  },
]

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
        {CEREMONY_ORDER.map((section, index) => {
          const isLast = index === CEREMONY_ORDER.length - 1
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
