import { useEffect, useState } from 'react'

const NOTICE_SECTIONS = [
  {
    title: '주차',
    lines: [
      '주차는 동성중·고등학교 운동장에서 가능하나, 최대 50대까지만 가능해 공간이 협소합니다. 대중교통(지하철) 이용을 권장드립니다.',
      '청첩장을 지참하시면 무료주차 2시간이 제공되며, 이후에는 주차요금이 부과됩니다.',
    ],
  },
  {
    title: '답례품',
    lines: ['식사가 어려우신 분들을 위해 가져가실 수 있는 답례품을 현장에 준비해 두었습니다.'],
  },
  {
    title: '식사 장소',
    lines: ['식사는 본당 옆 소화교육관에서 진행됩니다.'],
  },
  {
    title: '신부대기실',
    lines: ['신부대기실은 본당 건물 지하 1층에 위치해 있습니다.'],
  },
  {
    title: '미사 시간',
    lines: [
      '혼배미사는 약 1시간 정도 소요될 예정입니다.',
      '식사를 먼저 하셔도 괜찮으니, 편하신 순서로 참석해 주세요.',
    ],
  },
]

// 세션당 한 번만 자동으로 띄우고, 이후에는 플로팅 버튼으로만 다시 열람.
const AUTO_SHOWN_KEY = 'wedding-guest-notice-shown'

export function FloatingMenu() {
  const [open, setOpen] = useState(false)
  const [noticeOpen, setNoticeOpen] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(AUTO_SHOWN_KEY)) return
    sessionStorage.setItem(AUTO_SHOWN_KEY, '1')
    setNoticeOpen(true)
  }, [])

  const handleCopyLink = async () => {
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
            onClick={() => setNoticeOpen(true)}
            aria-label="예식 안내 다시 보기"
            className={`pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-green text-paper shadow-lg transition-all duration-200 ${
              open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <circle cx="12" cy="12" r="9" />
              <line x1="12" y1="10.5" x2="12" y2="16" strokeLinecap="round" />
              <circle cx="12" cy="7.5" r="1" fill="currentColor" stroke="none" />
            </svg>
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
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
              </svg>
            )}
          </button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? '닫기' : '더보기'}
            className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/30 backdrop-blur text-gray-700 shadow-lg transition-transform active:scale-95"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              className={`h-6 w-6 transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
      </div>

      {noticeOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50"
          onClick={() => setNoticeOpen(false)}
        >
          <div
            className="max-h-[85vh] w-full max-w-[460px] overflow-y-auto rounded-t-2xl bg-paper px-6 pb-8 pt-4 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-ink/15" />
            <div className="mb-5 flex items-center justify-between">
              <p className="font-serif text-base font-semibold text-green">예식 안내</p>
              <button
                type="button"
                onClick={() => setNoticeOpen(false)}
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
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
