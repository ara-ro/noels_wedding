import { weddingInfo } from '../config/weddingInfo'
import { SectionHeading } from './SectionHeading'

export function LocationMap() {
  return (
    <section className="px-6 py-16">
      <SectionHeading eyebrow="LOCATION" title="오시는 길" />
      <p className="text-center text-ink">{weddingInfo.venueName}</p>
      <p className="text-center text-sm text-ink/50">{weddingInfo.venueAddress}</p>
      {/* TODO: 카카오맵/네이버지도 SDK 연동 (PLAN.md 2장 지도 항목, 10.2 API 키 필요) */}
      <div className="mt-4 flex h-56 items-center justify-center rounded-lg bg-paper-dim text-sm text-ink/40">
        지도 연동 예정
      </div>
    </section>
  )
}
