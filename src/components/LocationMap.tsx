import { useEffect } from 'react'
import { SectionHeading } from './SectionHeading'

declare global {
  interface Window {
    daum?: {
      roughmap: {
        Lander: new (options: { timestamp: string; key: string; mapWidth: string; mapHeight: string }) => {
          render: () => void
        }
      }
    }
  }
}

const ROUGHMAP_CONTAINER_ID = 'daumRoughmapContainer1785047954283'
const ROUGHMAP_TIMESTAMP = '1785047954283'
const ROUGHMAP_KEY = 'rhivzx9xqc5'

const VENUE_NAME = '혜화동성당'
const VENUE_ADDRESS = '서울 종로구 창경궁로 288 혜화동성당'
const TRANSIT_INFO = {
  subway: '[4호선] 혜화역 1번 출구 도보 5분',
  bus: '100, 102, 104, 107, 109, 140, 143, 150, 710, 272',
  parking: [
    '주차장: 동성중·고등학교 운동장(종로구 혜화동 90-7)',
    '성당 내 주차는 불가합니다. 주차장에 주차 후 성당으로 이동해 주세요.',
    '주차공간이 협소하니 가급적 대중교통 이용을 권장드립니다.',
    '청첩장 지참 시 무료주차 2시간이 제공되며, 이후에는 주차요금이 부과됩니다.',
  ],
}

const query = encodeURIComponent(VENUE_ADDRESS)

// 정확한 위경도 없이도 안전하게 동작하는 "이름/주소 검색" 기반 링크만 사용한다.
// 좌표 기반 길찾기(카카오내비/티맵 turn-by-turn)는 잘못된 좌표를 쓰면 하객을 엉뚱한 곳으로
// 안내할 위험이 있어, 정확한 좌표를 확보하기 전까지는 검색 결과로 연결한다.
const MAP_LINKS = [
  { label: '네이버 지도', href: `https://naver.me/FEUOxunQ` },
  { label: '카카오맵', href: `https://kko.to/JHSZ_7IQwP` },
  { label: '카카오내비', href: `https://map.kakao.com/link/search/${query}` },
  { label: '티맵', href: `tmap://search?name=${query}` },
]

export function LocationMap() {
  useEffect(() => {
    const renderMap = () => {
      new window.daum!.roughmap.Lander({
        timestamp: ROUGHMAP_TIMESTAMP,
        key: ROUGHMAP_KEY,
        mapWidth: '640',
        mapHeight: '360',
      }).render()
    }

    if (window.daum?.roughmap) {
      renderMap()
      return
    }

    const script = document.createElement('script')
    script.src = 'https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js'
    script.setAttribute('charset', 'UTF-8')
    script.className = 'daum_roughmap_loader_script'
    script.onload = renderMap
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <section className="bg-paper-dim px-9 py-20">
      <SectionHeading eyebrow="LOCATION" title="오시는 길" />
      <p className="text-center font-serif text-lg font-semibold text-green">{VENUE_NAME}</p>
      <p className="mt-1 text-center text-sm text-ink/50">{VENUE_ADDRESS}</p>

      <div className="mt-6 overflow-x-auto">
        <div id={ROUGHMAP_CONTAINER_ID} className="root_daum_roughmap root_daum_roughmap_landing" />
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2">
        {MAP_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-sm border border-green px-2 py-2.5 text-center text-[11px] text-green"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-5 text-left">
        <div>
          <p className="mb-1.5 text-[13px] font-semibold text-green">지하철</p>
          <p className="text-[13px] leading-relaxed text-ink/60">{TRANSIT_INFO.subway}</p>
        </div>
        <div>
          <p className="mb-1.5 text-[13px] font-semibold text-green">버스</p>
          <p className="text-[13px] leading-relaxed text-ink/60">{TRANSIT_INFO.bus}</p>
        </div>
        <div>
          <p className="mb-1.5 text-[13px] font-semibold text-green">주차 안내</p>
          <div className="space-y-1">
            {TRANSIT_INFO.parking.map((line) => (
              <p key={line} className="text-[13px] leading-relaxed text-ink/60">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
