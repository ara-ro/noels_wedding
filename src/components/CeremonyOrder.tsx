import { weddingInfo } from '../config/weddingInfo'

export function CeremonyOrder() {
  return (
    <section className="border-t border-gold/30 px-6 py-16">
      <h2 className="mb-2 text-center text-lg font-bold text-green">예식 순서</h2>
      <p className="mb-6 text-center text-xs text-ink/40">세부 순서는 당일 사정에 따라 달라질 수 있습니다.</p>
      <div className="space-y-6">
        {weddingInfo.ceremonyOrder.map((section) => (
          <div key={section.title}>
            <p className="mb-2 text-sm font-bold tracking-widest text-gold">{section.title}</p>
            <ul className="space-y-1">
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
