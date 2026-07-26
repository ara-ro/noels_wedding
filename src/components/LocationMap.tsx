import { useEffect, useRef } from 'react'
import { SectionHeading } from './SectionHeading'

declare global {
  interface Window {
    daum?: {
      roughmap: {
        phase: string
        cdn: string
        url_protocal: string
        Lander?: new (options: { timestamp: string; key: string; mapWidth: string; mapHeight: string }) => {
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


const MAP_LINKS = [
  { label: '네이버 지도', href: `https://naver.me/FEUOxunQ` },
  { label: '카카오맵', href: `https://kko.to/JHSZ_7IQwP` }
]

export function LocationMap() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    let lastWidth = 0
    let resizeTimer: ReturnType<typeof setTimeout>
    const scripts: HTMLScriptElement[] = []
    const appendScript = (src: string, onload: () => void) => {
      const script = document.createElement('script')
      script.src = src
      script.setAttribute('charset', 'UTF-8')
      script.onload = () => {
        if (!cancelled) onload()
      }
      document.body.appendChild(script)
      scripts.push(script)
    }

    // mapWidth/mapHeight only accept pixel values, so we measure the container's own
    // rendered width instead of hardcoding one — this is what makes the map fit its
    // parent (mobile card widths vary from ~320px to the 460px max) rather than a fixed size.
    const renderMap = () => {
      const container = containerRef.current
      if (!container) return
      const width = Math.round(container.clientWidth)
      if (!width || width === lastWidth) return
      lastWidth = width
      container.innerHTML = ''
      new window.daum!.roughmap.Lander!({
        timestamp: ROUGHMAP_TIMESTAMP,
        key: ROUGHMAP_KEY,
        mapWidth: String(width),
        mapHeight: String(Math.round((width * 360) / 640)),
      }).render()
    }

    // roughmapLoader.js normally injects roughmapLander.js via document.write, which is a
    // no-op for scripts inserted after the initial page load — so we load it ourselves
    // using the cdn/phase info the loader sets on window.daum.roughmap.
    const loadLander = () => {
      const { url_protocal, phase, cdn } = window.daum!.roughmap
      appendScript(`${url_protocal}//t1.kakaocdn.net/kakaomapweb/roughmap/place/${phase}/${cdn}/roughmapLander.js`, renderMap)
    }

    if (window.daum?.roughmap?.Lander) {
      renderMap()
    } else if (window.daum?.roughmap) {
      loadLander()
    } else {
      appendScript('https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js', loadLander)
    }

    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        if (window.daum?.roughmap?.Lander) renderMap()
      }, 200)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelled = true
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', handleResize)
      scripts.forEach((script) => script.remove())
    }
  }, [])

  return (
    <section className="bg-paper-dim px-9 py-20">
      <SectionHeading eyebrow="LOCATION" title="오시는 길" />
      <p className="text-center font-serif text-lg font-semibold text-green">{VENUE_NAME}</p>
      <p className="mt-1 text-center text-sm text-ink/50">{VENUE_ADDRESS}</p>

      <div
        ref={containerRef}
        id={ROUGHMAP_CONTAINER_ID}
        className="root_daum_roughmap root_daum_roughmap_landing mt-6 w-full overflow-hidden"
      />

      <div className="mt-3 grid grid-cols-2 gap-2">
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
          <ul className="space-y-1.5">
            {TRANSIT_INFO.parking.map((line) => (
              <li key={line} className="flex items-start gap-2 text-[13px] leading-relaxed text-ink/60">
                <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rotate-45 bg-gold" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
