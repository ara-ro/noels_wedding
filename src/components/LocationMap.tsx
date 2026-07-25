import { weddingInfo } from '../config/weddingInfo'

export function LocationMap() {
  return (
    <section className="border-t border-neutral-100 px-6 py-16">
      <h2 className="mb-4 text-center text-lg font-medium text-neutral-800">오시는 길</h2>
      <p className="text-center text-neutral-600">{weddingInfo.venueName}</p>
      <p className="text-center text-sm text-neutral-400">{weddingInfo.venueAddress}</p>
      {/* TODO: 카카오맵/네이버지도 SDK 연동 (PLAN.md 2장 지도 항목, 10.2 API 키 필요) */}
      <div className="mt-4 flex h-56 items-center justify-center rounded-lg bg-neutral-100 text-sm text-neutral-400">
        지도 연동 예정
      </div>
    </section>
  )
}
