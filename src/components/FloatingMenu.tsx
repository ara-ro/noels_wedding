import { useEffect, useRef, useState } from 'react'
import { Check, Info, Link, Plus } from 'lucide-react'

const NOTICE_SECTIONS = [
  {
    title: '주차',
    lines: [
      '주차는 동성중·고등학교 운동장에서 가능하나, <b class="text-red-500">최대 50대까지만</b> 가능해 공간이 협소합니다. 대중교통(지하철) 이용을 권장드립니다.',
      '청첩장을 지참하시면 무료주차 2시간이 제공되며, 이후에는 주차요금이 부과됩니다.',
    ],
  },
  {
    title: '답례품',
    lines: ['식사가 어려우신 분들을 위해 가져가실 수 있는 답례품을 현장에 준비해 두었습니다.'],
  },
  {
    title: '식사 장소',
    lines: ['식사는 본당 옆 소화교육관 건물에서 진행됩니다.', '건물 1층과 2층에서 식사가 가능합니다.'],
  },
  {
    title: '신부대기실',
    lines: ['신부대기실은 본당 건물 지하 1층에 위치해 있습니다.'],
  },
  {
    title: '미사 시간',
    lines: [
      '혼배미사는 약 1시간 정도 소요될 예정입니다.',
      '식사를 먼저 하셔도 됩니다. 편하신 순서로 참석해 주세요.',
    ],
  },
]

// 세션당 한 번만 자동으로 띄우고, 이후에는 플로팅 버튼으로만 다시 열람.
const AUTO_SHOWN_KEY = 'wedding-guest-notice-shown'
// 처음 닫을 때만 다시 보기 버튼 위치를 애니메이션으로 알려줌.
const HINT_SHOWN_KEY = 'wedding-guest-notice-hint-shown'

const SHEET_EXIT_MS = 250
const FLIGHT_MS = 700
const HINT_VISIBLE_MS = 1000

type Point = { x: number; y: number }

const centerOf = (rect: DOMRect): Point => ({
  x: rect.left + rect.width / 2,
  y: rect.top + rect.height / 2,
})

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function FloatingMenu() {
  const [open, setOpen] = useState(false)
  const [noticeOpen, setNoticeOpen] = useState(false)
  const [noticeClosing, setNoticeClosing] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)
  const [flight, setFlight] = useState<{ from: Point; to: Point } | null>(null)
  const [hintActive, setHintActive] = useState(false)

  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const toggleButtonRef = useRef<HTMLButtonElement>(null)
  const flightRef = useRef<HTMLDivElement>(null)
  const closeTimerRef = useRef<number | undefined>(undefined)
  const hintTimerRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (localStorage.getItem(AUTO_SHOWN_KEY)) return
    localStorage.setItem(AUTO_SHOWN_KEY, '1')
    setNoticeOpen(true)
  }, [])

  useEffect(
    () => () => {
      window.clearTimeout(closeTimerRef.current)
      window.clearTimeout(hintTimerRef.current)
    },
    [],
  )

  // 메뉴를 잠깐 펼쳐 Info 버튼을 강조하고, 사용자가 조작하지 않으면 다시 접음.
  const revealInfoButton = () => {
    setOpen(true)
    setHintActive(true)
    window.clearTimeout(hintTimerRef.current)
    hintTimerRef.current = window.setTimeout(() => {
      setOpen(false)
      setHintActive(false)
    }, HINT_VISIBLE_MS)
  }

  const cancelHint = () => {
    window.clearTimeout(hintTimerRef.current)
    setHintActive(false)
  }

  useEffect(() => {
    const el = flightRef.current
    if (!flight || !el) return
    const dx = flight.to.x - flight.from.x
    const dy = flight.to.y - flight.from.y
    // 왼쪽으로 살짝 휘어지는 곡선을 그리며 + 버튼으로 날아감
    const animation = el.animate(
      [
        { transform: 'translate(0, 0) scale(0.6)', opacity: 0 },
        { transform: `translate(${dx * 0.3 - 70}px, ${dy * 0.35}px) scale(1.1)`, opacity: 1, offset: 0.35 },
        { transform: `translate(${dx}px, ${dy}px) scale(0.5)`, opacity: 0.9 },
      ],
      { duration: FLIGHT_MS, easing: 'cubic-bezier(0.45, 0, 0.3, 1)', fill: 'forwards' },
    )
    animation.onfinish = () => {
      setFlight(null)
      toggleButtonRef.current?.animate(
        [{ transform: 'scale(1)' }, { transform: 'scale(1.18)' }, { transform: 'scale(1)' }],
        { duration: 350, easing: 'ease-out' },
      )
      revealInfoButton()
    }
    return () => animation.cancel()
  }, [flight])

  const openNotice = () => {
    window.clearTimeout(closeTimerRef.current)
    setNoticeClosing(false)
    setNoticeOpen(true)
  }

  // x 버튼과 배경 클릭 모두 이 함수로 닫음.
  const closeNotice = () => {
    if (noticeClosing) return
    const reducedMotion = prefersReducedMotion()

    if (!localStorage.getItem(HINT_SHOWN_KEY)) {
      localStorage.setItem(HINT_SHOWN_KEY, '1')
      const from = closeButtonRef.current?.getBoundingClientRect()
      const to = toggleButtonRef.current?.getBoundingClientRect()
      if (!reducedMotion && from && to) {
        setFlight({ from: centerOf(from), to: centerOf(to) })
      } else {
        revealInfoButton()
      }
    }

    if (reducedMotion) {
      setNoticeOpen(false)
      return
    }
    setNoticeClosing(true)
    closeTimerRef.current = window.setTimeout(() => {
      setNoticeOpen(false)
      setNoticeClosing(false)
    }, SHEET_EXIT_MS)
  }

  const handleCopyLink = async () => {
    cancelHint()
    await navigator.clipboard.writeText(window.location.href)
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 1500)
  }

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40 mx-auto max-w-[460px]">
        <div className="flex flex-col items-end gap-3 pr-6">
          <button
            type="button"
            onClick={() => {
              cancelHint()
              openNotice()
            }}
            aria-label="예식 안내 다시 보기"
            className={`pointer-events-auto relative flex h-12 w-12 items-center justify-center rounded-full bg-green text-paper shadow-lg transition-all duration-200 ${
              open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
            }`}
          >
            {hintActive && (
              <span
                aria-hidden
                className="animate-hint-ping absolute inset-0 rounded-full ring-2 ring-gold"
              />
            )}
            <Info className="h-5 w-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={handleCopyLink}
            aria-label="링크 복사"
            className={`pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-green bg-paper text-green shadow-lg transition-all duration-200 ${
              open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
            }`}
          >
            {linkCopied ? (
              <Check className="h-5 w-5" strokeWidth={2.5} />
            ) : (
              <Link className="h-5 w-5" strokeWidth={2} />
            )}
          </button>
          <button
            type="button"
            ref={toggleButtonRef}
            onClick={() => {
              cancelHint()
              setOpen((value) => !value)
            }}
            aria-expanded={open}
            aria-label={open ? '닫기' : '더보기'}
            className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/30 backdrop-blur text-gray-700 shadow-lg transition-transform active:scale-95"
          >
            <Plus
              strokeWidth={2}
              className={`h-6 w-6 transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
            />
          </button>
        </div>
      </div>

      {noticeOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-end justify-center bg-ink/50 transition-opacity duration-250 ${
            noticeClosing ? 'opacity-0' : 'opacity-100'
          }`}
          onClick={closeNotice}
        >
          <div
            className={`max-h-[85vh] w-full max-w-[460px] overflow-y-auto rounded-t-2xl bg-paper px-6 pb-8 pt-4 shadow-xl transition-transform duration-250 ease-in ${
              noticeClosing ? 'translate-y-full' : 'translate-y-0'
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-ink/15" />
            <div className="mb-5 flex items-center justify-between">
              <p className="font-serif text-base font-semibold text-green">예식 안내</p>
              <button
                type="button"
                ref={closeButtonRef}
                onClick={closeNotice}
                aria-label="닫기"
                className="text-lg text-ink/40"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-5 text-left">
              {NOTICE_SECTIONS.map((section) => (
                <div key={section.title}>
                  <p className="mb-1.5 text-[13px] font-semibold text-green">{section.title}</p>
                  <ul className="space-y-1.5">
                    {section.lines.map((line) => (
                      <li key={line} className="flex items-start gap-2 text-[13px] leading-relaxed text-ink/60">
                        <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rotate-45 bg-gold" />
                        <span dangerouslySetInnerHTML={{ __html: line }} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {flight && (
        <div
          ref={flightRef}
          aria-hidden
          className="pointer-events-none fixed z-60 flex h-10 w-10 items-center justify-center rounded-full bg-green text-paper shadow-lg"
          style={{ left: flight.from.x - 20, top: flight.from.y - 20, opacity: 0 }}
        >
          <Info className="h-5 w-5" strokeWidth={2} />
        </div>
      )}
    </>
  )
}
