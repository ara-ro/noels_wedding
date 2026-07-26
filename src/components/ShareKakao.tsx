import { useState } from 'react'

// TODO: Kakao Developers에서 발급받은 JavaScript 키를 VITE_KAKAO_JS_KEY로 주입하고
// Kakao.Share.sendDefault 연동 (PLAN.md 2장 공유 항목, 10.2 카카오 키 필요)
export function ShareKakao() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const handleShare = () => {
    if (navigator.share) {
      void navigator.share({
        title: '이율재 ♥ 김정은 결혼식에 초대합니다',
        url: window.location.href,
      })
      return
    }
    void handleCopyLink()
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-20 mx-auto max-w-[460px]">
      <div className="flex flex-col items-end gap-3 pr-6">
        <button
          type="button"
          onClick={handleShare}
          aria-label="공유하기"
          className={`pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#fee500] text-xs font-semibold text-ink shadow-lg transition-all duration-200 ${
            open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
          }`}
        >
          공유
        </button>
        <button
          type="button"
          onClick={handleCopyLink}
          aria-label="링크 복사"
          className={`pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-green bg-paper text-xs font-medium text-green shadow-lg transition-all duration-200 ${
            open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
          }`}
        >
          {copied ? '복사됨' : '복사'}
        </button>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? '닫기' : '더보기'}
          className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-green text-xs font-semibold text-paper shadow-lg transition-transform active:scale-95"
        >
          {open ? '닫기' : '더보기'}
        </button>
      </div>
    </div>
  )
}
