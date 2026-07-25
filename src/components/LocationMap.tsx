import { weddingInfo } from '../config/weddingInfo'
import { SectionHeading } from './SectionHeading'

const query = encodeURIComponent(weddingInfo.venueAddress)

// 정확한 위경도 없이도 안전하게 동작하는 "이름/주소 검색" 기반 링크만 사용한다.
// 좌표 기반 길찾기(카카오내비/티맵 turn-by-turn)는 잘못된 좌표를 쓰면 하객을 엉뚱한 곳으로
// 안내할 위험이 있어, 정확한 좌표를 확보하기 전까지는 검색 결과로 연결한다.
const MAP_LINKS = [
  { label: '네이버 지도', href: `https://map.naver.com/p/search/${query}` },
  { label: '카카오맵', href: `https://map.kakao.com/link/search/${query}` },
  { label: '카카오내비', href: `https://map.kakao.com/link/search/${query}` },
  { label: '티맵', href: `tmap://search?name=${query}` },
]

export function LocationMap() {
  return (
    <section className="px-6 py-16">
      <SectionHeading eyebrow="LOCATION" title="오시는 길" />
      <p className="text-center text-ink">{weddingInfo.venueName}</p>
      <p className="text-center text-sm text-ink/50">{weddingInfo.venueAddress}</p>

      <iframe
        title="예식장 위치"
        src={`https://maps.google.com/maps?q=${query}&output=embed`}
        loading="lazy"
        className="mt-4 h-56 w-full rounded-lg border-0"
      />

      <div className="mt-3 grid grid-cols-4 gap-2">
        {MAP_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-gold/40 px-2 py-2 text-center text-xs text-ink/70"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="mt-8 space-y-3 text-sm text-ink/70">
        <p>
          <span className="font-bold text-green">지하철</span> {weddingInfo.transitInfo.subway}
        </p>
        <p>
          <span className="font-bold text-green">버스</span> {weddingInfo.transitInfo.bus}
        </p>
        <div>
          <span className="font-bold text-green">주차 안내</span>
          <div className="mt-1 space-y-1">
            {weddingInfo.transitInfo.parking.map((line) => (
              <p key={line} className="text-ink/60">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
